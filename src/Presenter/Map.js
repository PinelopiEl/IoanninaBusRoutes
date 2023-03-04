
/* React */
import React, { useState, useEffect, useRef } from 'react';

/* Mapbox */
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

/* Css */
import './Map.css';

/* Connected Components */
import { printInformation,getFileType,getDiffColor } from './ControlSlider';
import { printSchedule } from './Timetable';
import { connectWithCharts, sendRouteChart, addlinesDelays,addRoutesDelays} from '../Charts/OpenChart.js';

/* File Processing Library */
import Papa from 'papaparse';


/* DATABASE IMPORT */

import stops from '../files/Original_Files/stops.json';
import startEndFile from '../files/JS/start_end_routes';
import waypointsFile from '../files/JS/Waypoints.js';
import vehicleFile from '../files/JS/VehicleCodes';
import colorLine from '../files/JS/Colorlines.js';
import stopCoordinates from '../files/JS/StopCoords.js';

import weekdayData from '../files/CSV/Final Files Schedule/ScheduleWeekday.csv';
import weekendData from '../files/CSV/Final Files Schedule/ScheduleWeekend.csv';
import holidayData from '../files/CSV/Final Files Schedule/ScheduleHolidays.csv';

import weekdayStop from '../files/JS/Schedule/CodeToStop_Weekday';//Scheduled Time
import weekendStop from '../files/JS/Schedule/CodeToStop_Weekend';
import holidayStop from '../files/JS/Schedule/CodeToStop_Holidays';

/************************************************************************************/
/**********************************INIT GLOBAL VARS**********************************/
/************************************************************************************/

var display_all_flag; /* flag :1->Display all routes , 0->Display only one route */


/* ANIMATION OF BUS VARS */
var start, finish; /* starting ,ending point of the route */
var counterAnim; /* animation counterAnim */

/* Currently not used */
var newstops;
var routeStops;
var wayComma;
var waypoints;
var stopID;
var newID; /* append number of line to id of layer of route */


/********** Route Display Vars     *************/
var radiuses; /* contains radius of each waypoint given in query */
var route;

/* Departure and arrival times : real or scheduled */
var startingHour;
var schedStartTime, schedFinishTime;


/*** Arrays with access im Slider ***/
var hour;
var minutes;
var dayKind;
var timetable;

/* BUS params */
var point; /* points map symbol on map */
var fileFlag = 0;
var stopCoords = [];
var stopCode;
var stopName;
var vehicleCode;
var eraseBus;
var lineName;
var codeRoute;
/**** For editing colors in case of Delays in Routes ****/
var delayFlag; //0:green, 1:red, 2:yellow
var delayColor;


/*** Callers ***/
var createRouteLayers; /* calls getRoute */
var sliderCall;
var busCall;

/**
 **********************
 * INIT GLOBAL ARRAYS
 **********************
 */
 const style = {
  width: '61%',
  height: '600px',
  borderRadius: '10px',
  border: '2px #f34c19',
  left: "280px",
  top: '105px',
  position: 'absolute'

};

/******************Arrays for routeCodes and lineCodes respectively******************/
var routeNumbers = [105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];
var lineNumbers = [1732, 1730, 1722, 1726, 1729, 1728, 1737, 1734, 1727, 1724, 1731, 1736, 1723, 1733, 1725, 1735];



//__________________________________________________SIDEMENU CONNECTION _______________________________________________________________________
export async function setWay(code, lname,lineCode) {
  //inisialize global variables
  codeRoute = code;
  lineName = lname;
  sendRouteChart(lname,code);
  //display only one chosen route
  if (routeNumbers.includes(codeRoute)) {
    eraseBus();
    display_all_flag = 0;
    getRoute(codeRoute);
  }
};

//__________________________________________________DISPLAY ROUTE_______________________________________
export async function getRoute(code) {
  
  const waypoints = waypointsFile[code];
  const waypointsArr = waypoints.split(';');
  for (var i = 0; i < waypointsArr.length; i++) {
    waypointsArr[i] = waypointsArr[i] + ';';
  }
  const radius = waypointsArr.map(() => 40);
  radiuses = radius.join(';');

  //________________________________________________________________________________________________________________CREATE A QUERY TO THE API 
  const query = await fetch(
    'https://api.mapbox.com/matching/v5/mapbox/driving/' + waypoints + '?geometries=geojson&&radiuses=' + radiuses + '&steps=true&access_token=pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg', { method: 'GET' });


  const json = await query.json();
  const data = json.matchings[0];

  route = data.geometry;

  //reset to 0 for the animation in the new route
  counterAnim = 0;

  codeRoute = code;

  createRouteLayers(route, codeRoute);
}

//******************************************************************************************************************************************** */
//___________________________________________________ CONTROL WHEN SLIDER IS CHANGED ___________________________________________________________
//******************************************************************************************************************************************** */

export async function callMoveBus(myhour, mymin, mydaykind) {
  //initialize global vars from slider
  hour = myhour;
  minutes = mymin;
  dayKind = mydaykind;

  if (lineName != undefined) {
    //information for the choosen route
    if (vehicleFile[codeRoute] != undefined) {
      vehicleCode = vehicleFile[codeRoute];
    } else { // DEN yparxoyn gia ola ta route kodikoi leof sto LIVE.csv
      var number = Math.floor(Math.random() * 101)
      vehicleCode = '20230111_' + codeRoute.toString() + '_0010000_18_' + number.toString();
    }

    //reset variables
    stopCoords = [];
    stopCode = "";
    stopName = "";

    //get Stop Code for this choices
    stopCode = getStopCode();

    if (stopCode != undefined) {

      var coords = stopCoordinates[stopCode];
      var coordsSplit = coords.split(",");
      stopCoords.push(coordsSplit[0]);
      stopCoords.push(coordsSplit[1]);

      //var realTime = getRealTime();

      printInformation(stopCode, codeRoute);

      const result = Object.values(stops).filter(item => item.code === stopCode.toString());
      stopName = Object.entries(result)[0][1].description.el;

      var pos = stopCoords;
      busCall(pos);
      
      //Change Color of line based on diff in real and scheduled route completion time
      var diff = getDiffColor();
      if (parseInt(diff) > 1) {
        delayFlag = 1;
        sliderCall();
      } else if (parseInt(diff) < 0) {
        delayFlag = 2;
        sliderCall();
      } else if (parseInt(diff) ===0) {
        delayFlag = 0;
        sliderCall();
      }

      //gia chart
      var fileTypeChart = getFileType();
      connectWithCharts(hour,fileTypeChart,mydaykind);
    } else {
      alert("This route is not executed in this time or day kind!");
    }
  }else{
    alert("Choose a route first!");
  }

}

/*                       Access functions                            */
function getStopCode() {
  var stop;
  if (dayKind === "weekday") {
    stop = weekdayStop[codeRoute + "_" + hour + "_" + minutes];
    return stop;
  } else if (dayKind === "weekend") {
    stop = weekendStop[[codeRoute + "_" + hour + "_" + minutes]];
    return stop;
  } else if (dayKind === "holidays") {
    stop = holidayStop[[codeRoute + "_" + hour + "_" + minutes]];
    return stop;
  }
}

//__________________________________________________  STATISTICS _______________________________________________________________________________
function diffTime(myhour, mymin, myhour1, mymin1) {

  var date1 = new Date(2000, 0, 1, myhour, mymin);
  var date2 = new Date(2000, 0, 1, myhour1, mymin1);
  var diff = date2 - date1;
  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var time = [hh, mm];
  return time;

}



/************************************************************************************************************************/
/***************************************************_CONST MAPP_*********************************************************/
/************************************************************************************************************************/
export const Mapp = () => {

  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  addlinesDelays();
  addRoutesDelays();
  /***************************************************_SETUP OUR MAP_************************************************/
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg'

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

      map.addControl(new mapboxgl.NavigationControl()); /* ZOOM IN ,ZOOM OUT */

      /* MARKERS WITH CLICK ON LABELS FOR BUS STATIONS */
      map.on('load', () => {
        stops.forEach(function (marker) {
          const el = document.createElement('div');
          el.className = 'marker';
          new mapboxgl.Marker(el).setLngLat([marker.longitude, marker.latitude]).setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML('<h4>' + marker.description.el + "<br>" + marker.lineNames + '</h4>')).addTo(map);
        })
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
    display_all_flag = 1;
    if (display_all_flag === 1) {
      for (var i = 0; i < routeNumbers.length; i++) {
        let codeRoute = routeNumbers[i];
        getRoute(codeRoute);
      }
    }
  }, [map]);


  var oldRoute;
  var first=1;// to empty map when one route is choosen
  /***************************************************_HELPER FOR LAYER OF ROUTE ON MAP_***************************************************/
  createRouteLayers = function (route,routecode) {


    /***************************************ONE ROUTE **********************************************************/
    if (display_all_flag === 0) {

      if (first === 1) {
        oldRoute = routecode;
        for (var i = 0; i < routeNumbers.length; i++) {
          map.removeLayer('route'.concat(routeNumbers[i]));
          map.removeSource('route'.concat(routeNumbers[i]));
        }
        if (map.getLayer('route')) {
          map.removeLayer('route');
        }

        if (map.getSource('route')) {
          map.removeSource('route');
        }
        /**************Line route *******************/
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
            'line-color': colorLine[routecode],
            'line-width': 5,
            'line-opacity': 0.5
          }
        });
        first = 0;

      }else {
        if (oldRoute === routecode) { /* If the route already exists on the map, we'll reset it using setData */
          map.getSource('route').setData({
            type: 'Feature',
            properties: {},
            geometry: route
          });

        } else {      // otherwise, we'll make a new request
          
          oldRoute = routecode;
          if(map.getLayer("lines")){
            if (map.getLayer("lines")) {
              map.removeLayer("lines");
            }
        
            if (map.getSource("lines")) {
              map.removeSource("lines");
            }
          }
         
          if (map.getLayer('route')) {
            map.removeLayer('route');
          }

          if (map.getSource('route')) {
            map.removeSource('route');
          }
          /**************Line route *******************/
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
              'line-color': colorLine[routecode],
              'line-width': 5,
              'line-opacity': 0.5
            }
          });
        }
      }
      /*****************Add starting point and ending point ***************/
      var start = route.coordinates[0];
      var mylength = route.coordinates.length - 1;
      var end = route.coordinates[mylength];

      const startingPoint = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      };

      if (map.getLayer('start')) {
        map.getSource('start').setData(startingPoint);
      } else {
        map.addLayer({
          id: 'start',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: start
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }

      const endPoint = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: end
          }
        }]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(endPoint);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: end
                }
              }]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      printSchedule(codeRoute);
      /***************************************ALL ROUTES**********************************************************/
    } else if (display_all_flag === 1) {
      let newID = 'route'.concat(routecode);
      if (map.getLayer(newID)) {
        map.removeLayer(newID);
      }
  
      if (map.getSource(newID)) {
        map.removeSource(newID);
      }

      if (map.getSource(newID)) {
        map.getSource(newID).setData({
          type: 'Feature',
          properties: {},
          geometry: route
        });
      } else {


        map.addLayer({
          id: newID,
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
            'line-color': colorLine[routecode],
            'line-width': 2,
            'line-opacity': 0.5
          }
        });
      }
    }
  }



  /************************* CALLERS ***************************/
  sliderCall = function () {
    addLayerTraffic();
  }
  busCall = function (position) {
    moveBus(position);
  }

  /********************* ADD LAYER FOR DELAY ********************/
  function addLayerTraffic() {
      
    //Check if there is a delay and choose color
    if (delayFlag === 1) {
      delayColor = '#F7455D';
    } else if (delayFlag === 0) {
      delayColor = '#003333';
    } else if (delayFlag === 2) {
      delayColor = '#FFFF00';
    } else {
      return;
    }

    if (map.getLayer("lines")) {
      map.removeLayer("lines");
    }

    if (map.getSource("lines")) {
      map.removeSource("lines");
    }

    if (map.getSource('lines')) {
      if (map.getSource('lines')) {
        map.getSource('lines').setData({
          type: 'Feature',
          properties: {},
          geometry: route
        });
      }
    }
    else {
      map.addLayer({
        id: 'lines',
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
          'line-color': delayColor,
          'line-width': 6,
          'line-opacity': 0.5
        }
      });
    }
  }
  /*************************** BUS MOVEMENT *************************/
  function moveBus(position) {

    if (map.getLayer("point")) {
      map.removeLayer("point");
    }

    if (map.getSource("point")) {
      map.removeSource("point");
    }

    point = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          'description': '<strong>Bus for line ' + lineName + ' and route </strong>' + codeRoute + '<br><strong>INFORMATIONS</strong><br>Current Stop Code: ' + stopCode + "<br>Current Stop Name: " + stopName + '<br>Bus code: ' + vehicleCode + '</p>'
        },
        geometry: {
          'type': 'Point',
          'coordinates': position
        },

      }]
    };

    map.addSource('point', {
      type: 'geojson',
      data: point,

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
    // Display pop-up
    map.on('click', 'point', (e) => {
      /*Copy coordinates array.*/
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      /**  Ensure that if the map is zoomed out such that multiple
     * copies of the feature are visible, the popup appears
     * over the copy being pointed to.
     **/
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

  }
  eraseBus = function (route) {
    if (map.getLayer("point")) {
      map.removeLayer("point");
    }

    if (map.getSource("point")) {
      map.removeSource("point");
    }
  }

  return (
    <div>
      <div ref={el => (mapContainer.current = el)} style={style} />
      <div />
    </div>
  );
};


export default Mapp;

