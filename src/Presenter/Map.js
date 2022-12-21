//import ReactDOM from 'react-dom';
//import {Layer, NavigationControl,Marker} from 'react-map-gl';
//import ReactMapGL, {Image} from 'react-map-gl';
//import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
//import {lineString as makeLineString} from '@turf/helpers';
//import stopsCsv from '../files/stop.csv';
//import sideMenu from '../Menu/SideMenu.js';
//import { stack as Menu } from 'react-burger-menu';
//import linesCsv from '../files/lines.csv';

import React, {useState,useEffect,useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import stops from '../files/stops.json';
import * as turf from '@turf/turf';
import './Map.css';
import routeCsv from '../files/route.csv';
import Papa from 'papaparse';

//____________________________________________________________________________________________________________________INITIALIZATION OF VARIABLES

//call function inside const map for getRoute
var call;
//var connectSliderWithMap;
//for id of bus-line
//var stopID;
var codeLine;
//array with all codes of each stop in the selected route
var newstops;
//array with all coords of each stop in the selected route
var routeStops;
//input string for fetch with all coords of each stop in the selected route
var wayComma;
var waypoints;
//inpute radius for the waypoints
var radiuses;
// starting point of the route
var start;
//steps for the animation/movement of the bus icon
var steps = 400;
//counter for the animation
var counter ;
var point;
var route;

const style = {
  width: '60%',
  height:'600px',
  borderRadius:'10px', 
  border :'2px #f34c19',
  left:"280px",
  top:'105px',
  position:'absolute'
  
};


//___________________________________________________________________________________________________________________FLAG FOR SETTING CHOSEN BUS
export const choosenBus ={
  choosenB : '0',

  get getChoosenB(){
    return this.choosenB;
  },

  set setChoosenB(newchoosenBus) {
    this.choosenB = newchoosenBus;
}

}

export async function setWay(code){
//parsing lines.csv and use the code from the button clicked (e.g. button 16 clicked , code=16) 
 //loop through lines.csv ,find the row and retrieve the id of the route in this row  
  codeLine=code;
  getStops(setStops);

};
//_____________________________________________________________________________________________PARSE ROUTE.CSV-->CREATE ARRAY OF STOP CODES
//_____________________________________________________________________________________________FITLER STOPS.JSON AND GET COORDS FOR EACH STOP
//____________________________________________________________________________________________________________________________CALLS GETROUTE

function setStops(recordRoute){
  newstops=[];
  //var stopIDs;
  for(var i=0; i < recordRoute.length;i++){
    if(codeLine=== recordRoute[i][2]){
      newstops=recordRoute[i][6];
      break;
    }
   }
   //console.log(newstops+"setstops")
   
   /*for(var i=0;i<stopIDs.length-1;i=i+4){
    routeStops.push(stopIDs[i] +stopIDs[i+1] +stopIDs[i+2] );
  }*/
  routeStops=[];
  waypoints=[];
  var way = [];
  console.log(newstops)
  routeStops=newstops.split(',');
  for(var j=0; j < routeStops.length;j++){
    const result = Object.values(stops).filter(item => item.code === routeStops[j].toString());
  
    const lat=Object.entries(result)[0][1].latitude;
    const lon=Object.entries(result)[0][1].longitude;
    way.push(lon + "," + lat + ";");
    console.log("lat"+lat)
    
  }
  const radius =way.map(() => 40);
  radiuses = radius.join(';');
  //console.log(radiuses+"radd")
  //join all elems of array to represent a string
  wayComma =way.join('');
  waypoints=wayComma.slice(0, -1);
  // waypoints=wayComma.slice(0, -1);
  getRoute(codeLine);
 
}
function getStops(callBack){

  Papa.parse(routeCsv, {
    download: true,
    dynamicTyping: true,
    complete: function (input) {
        callBack(input.data);
  
    }
  });
  
};

//________________________________________________________________________________________________________________________________DISPLAY ROUTE
export async function getRoute(code){
    

    console.log(waypoints)
    
    //________________________________________________________________________________________________________________CREATE A QUERY TO THE API 
     //waypoints.slice(0,-1) REMOVE LAST CHARACTER FROM WAYPOINTS STRING which is ';' in our case
    const query = await fetch(
      'https://api.mapbox.com/matching/v5/mapbox/driving/'+waypoints+ '?geometries=geojson&radiuses='+radiuses+'&steps=true&access_token=pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg', { method: 'GET' });
    
    
    const json = await query.json();
    const data = json.matchings[0];
    route = data.geometry;
    counter=0;
    call(route);
}



//Gia na exoume prosbasi sto map 
export const exportMap ={
  exmap: null ,

  get getMap(){
    console.log("Get gia na parw sto map to map apo ControlSlider")
    return this.exmap;
  },

  set setMap(newMap) {
    this.exmap = newMap;
    console.log("mesas sto settt")
}

}


//_________________________________________________________________________________________________________________________________CONST MAPP


export const  Mapp = () => {
 
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  //___________________________________________________________________________________________________________SETUP OUR MAP
  useEffect(() => {
    mapboxgl.accessToken ='pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg'

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/danaitou/clb8mwlwk001c14n0yzw21m6t", // stylesheet location
        center: [20.853746, 39.665028],
        zoom: 12
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      //  ZOOM IN ,ZOOM OUT
      map.addControl(new mapboxgl.NavigationControl());

      //  MARKERS FOR BUS STATIONS
      map.on('load', () => {



        stops.forEach(function(marker){
            const el = document.createElement('div');
            el.className= 'marker';
            new mapboxgl.Marker(el).setLngLat([marker.longitude,marker.latitude]).setPopup(new mapboxgl.Popup({offset: 30}).setHTML('<h4>'+ marker.description.el+"<br>"+marker.lineNames + '</h4>')).addTo(map);
        })
      });

    };
    

    if (!map) initializeMap({ setMap, mapContainer });

   
  }, [map]);

  exportMap.setMap = map;
  // //______________________________________________________________________________________________________HELPER FOR LAYER OF ROUTE ON MAP
  call  = function(route){
    //console.log(Object.entries(route) +"rout")
    // if the route already exists on the map, we'll reset it using setData
   if (map.getSource('route')) {
    map.getSource('route').setData({
      type: 'Feature',
      properties: {},
      geometry: route
    });
   }
    // otherwise, we'll make a new request
    else {
    //               gia Line tou route
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }

  if(start!==route.coordinates[0] || start===undefined){

    if (map.getLayer("point")) {
      map.removeLayer("point");
    }
  
    if (map.getSource("point")) {
      map.removeSource("point");
    }
    
    start= route.coordinates[0];
    point = {
      type: 'FeatureCollection',
      features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        'type': 'Point',
        'coordinates': route.coordinates[0]
      }
      }]
    };
  //___________________________________________________________________________________________________________ADD BUS ON THE MAP
  
     map.addSource('point', {
      type: 'geojson',
      data: point
     });
  
    map.addLayer({
      id: 'point',
      source: 'point', // reference the data source
      type: 'symbol',
      
      layout: {
          'icon-image': 'bus', // reference the image
          'icon-size': 1.7,
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });
       
    
    }
    //animate(point,route);
  }
  
  //___________________________________________________________________________________________________________ANIMATION OF BUS ICON
  function animate(){ 
    console.log("ANIMATE");
    console.log(route+"STO ANIMATE")
    console.log(Object.entries(route)[0][1])
    const start = Object.entries(route)[0][1][counter >= steps ? counter - 1 : counter];
    const end = Object.entries(route)[0][1][counter >= steps ? counter : counter + 1 ];

    if (!start || !end) return;
         Object.entries(point)[1][1][0].geometry.coordinates = route.coordinates[counter];
         
         Object.entries(point)[1][1][0].properties.bearing = turf.bearing(
            turf.point(start),
            turf.point(end)
        );
         
        map.getSource('point').setData(point);
        
        if (counter < steps) {
          //setInterval(function(){
            requestAnimationFrame(animate);
          //}, 5000);    
        }
      
        counter = counter + 1;  
      

  }  
    return( 
    <div> 
      
      <div ref={el => (mapContainer.current = el)} style={style} />
      <div/>

      
    </div>
    );
};


export default Mapp;
