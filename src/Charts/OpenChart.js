import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

import React, { useState,useEffect,useRef } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './chart.css';
import {showMax} from './MaxValues';

import week_1 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_week_1';
import week_2 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_week_2';
import week_3 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_week_3';
import week_4 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_week_4';
import weekend_1_2 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_wknd_1_2';
import weekend_3_4 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_wknd_3_4';
import hol_1_2 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_hol_1_2';
import hol_3_4 from '../files/JS/AvgDelayRoutes/avg_slots/avg_delay_hol_3_4';

import mweek_1 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_week_1';
import mweek_2 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_week_2';
import mweek_3 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_week_3';
import mweek_4 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_week_4';
import mweekend_1_2 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_weekend_1_2';
import mweekend_3_4 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_weekend_3_4';
import mhol_1_2 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_hol_1_2';
import mhol_3_4 from '../files/JS/AvgDelayRoutes/AvgDelayRoute_hol_3_4';


//SCHEDULE COMPLETION TIMES
import completionWeekday from '../files/JS/Schedule/completion_time_week';
import completionWeekend from '../files/JS/Schedule/completion_time_weekend';
import completionHol from '../files/JS/Schedule/completion_time_holidays';

import real_week_1 from '../files/JS/real_completion/real_completion_week_1';
import real_week_2 from '../files/JS/real_completion/real_completion_week_2';
import real_week_3 from '../files/JS/real_completion/real_completion_week_3';
import real_week_4 from '../files/JS/real_completion/real_completion_week_4';
import real_wkn_1_2 from '../files/JS/real_completion/real_completion_weekend_1_2';
import real_wkn_3_4 from '../files/JS/real_completion/real_completion_weekend_3_4';
import real_hol_1_2 from '../files/JS/real_completion/real_completion_hol_1_2';
import real_hol_3_4 from '../files/JS/real_completion/real_completion_hol_3_4';

//Next stop time
import schedWeek from '../files/JS/StopToStop/stopToStopWeek';
import schedWnd from '../files/JS/StopToStop/stopToStopWnd';
import schedHol from '../files/JS/StopToStop/stopToStopHol';
//---real
import realWeek1 from '../files/JS/StopToStop/Real/nextReal_week1';
import realWeek2 from '../files/JS/StopToStop/Real/nextRealWeek2';
import realWeek3 from '../files/JS/StopToStop/Real/nextRealWeek3';
import realWeek4 from '../files/JS/StopToStop/Real/nextRealWeek4';
import realWkn12 from '../files/JS/StopToStop/Real/nextRealWkn12';
import realWkn34 from '../files/JS/StopToStop/Real/nextRealWkn34';
import realHol12 from '../files/JS/StopToStop/Real/nextRealHol12';
import realHol34 from '../files/JS/StopToStop/Real/nextRealHol34';

//--------------------------------------------------------------
import lineRoutes from '../files/JS/LinesRoutes.js';
import linesDelays from '../files/JS/LinesDelay.js';
import routeDelays from '../files/JS/FinalAllRoutesDelay.js';
//--------------------------------------------------------------
import routeName from '../files/JS/RouteNames';
import routeStops from '../files/JS/RoutesStops';
import lineCode from  '../files/JS/LineCodes';

import MaxCounter from './MaxValues';
const routeNumbers = [105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];
const lineNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 21];
var lineNumbers = [1732, 1723, 1730, 1726, 1729, 1728 ,1722 , 1737, 1734, 1727 , 1733, 1735, 1731, 1725,1724, 1736];

//GLOBAL
var globalLine;
var globalRoute;
var globalHour;
var fileType;
var globalDayKind;
var show = false;//??
//Update when we choose new route and statistics
var globalAllStops=[];//stops of choosen route
var delays=[];
var passengers=[];

//HELPER FUNCTIONS
var updateLines;
var updateRoutes;
var updateRoute;
var updateStops;
var updaterealSced;
var updatePassengers;
var updatePie;
var updateTime;
//ARRAYS
var mylinesDelays=[];
var allRoutesNums=[];
var myroutesDelays=[];

var routesCodes=[];
var delayrouteOfLine=[];
var delayOfStops=[];
var pieArr=[];
var schComplTime=[];
var realComplTime=[];

var timeToNext_scd=[];
var timeToNext_real=[];


//************************************************ Connection with Map *************************** */
export function sendRouteChart(lCode,codeRoute){//apo map apo setWay(erxetai apo sidemenu)
    
    globalLine=lineCode[lCode];
    globalRoute=codeRoute;
    addRoutesOfLine();
}
export function connectWithCharts(hour,fileTypeChart,mydaykind){
    globalHour=hour;
    fileType=fileTypeChart;//TO ONOMA POY THELW
    globalDayKind= mydaykind;
    stopsChart();
    realSchedTime(mydaykind);
    pieChart();
    passChart();
    timeNextStop();
}


//**********************************************DEFAULT CHART HANDLERS******************************************/ 
//__________________ALL LINES________________________
export function addlinesDelays(){
    for(var i=0;i<lineNumbers.length;i++){
        if(lineNumbers[i]!=undefined){
            var delay = linesDelays[lineNumbers[i]];
            mylinesDelays.push(delay);
        }
    }
    
}
//___________________ALL ROUTES______________________
export function addRoutesDelays(){

    for(var i=0;i<routeNumbers.length;i++){
        if(routeNumbers[i]!=undefined){
            var delay = routeDelays[routeNumbers[i]];
            if(delay!=undefined){
                myroutesDelays.push(delay);
                allRoutesNums.push(routeNumbers[i]);
            }else{
                continue;
            }
            
        }
    }
}


//**********************************************OTHER CHART HANDLERS******************************************/ 
//_____________________ROUTES OF CHOOSEN LINES________
function addRoutesOfLine(){
    if(routesCodes.length !=0 && delayrouteOfLine!=0){
        routesCodes=[];
        delayrouteOfLine=[];
    }

    var routes = lineRoutes[globalLine];
    var splitted = routes.split(",");
    for(var j=0;j<splitted.length;j++){  
        var routeNum=splitted[j];
        var delayOfRoute = routeDelays[routeNum];//delay per route
       
        if(delayOfRoute!=undefined){
            delayrouteOfLine.push(delayOfRoute);
            routesCodes.push(routeNum);//routes names
        }else{
            delayrouteOfLine.push('2');
            routesCodes.push(routeNum);//routes names
        }
          
    }
    RouteOfLine['labels']=routesCodes;
    RouteOfLine.datasets[0].data=delayrouteOfLine;
    updateRoute();
}
//_____________________Completion time______________________________
function realSchedTime(mydaykind){
    if(schComplTime.length!=0 && realComplTime.length!=0){
        schComplTime=[];
        realComplTime=[];
    }
    for(var j=0;j<routesCodes.length;j++){
        var route = routesCodes[j];

        var scComp = getSchedCompletion(route,mydaykind)
        if(scComp!=undefined){
            schComplTime.push(scComp);
        }else{
            schComplTime.push('0');
        }
           
        var realCom = getRealCompletion(route);
        if(realCom != undefined){
            realComplTime.push(realCom);
        }else{
            realComplTime.push('0');
        }
    }
    data.labels=routesCodes;
    data.datasets[0].data=schComplTime;
    data.datasets[1].data=realComplTime;
    updaterealSced();
}
function getSchedCompletion(routeCode,givenDaykind){
    var time;
    
    if(givenDaykind==="weekday"){
        time = completionWeekday[routeCode+"_"+globalHour];  
    }else if(givenDaykind==="weekend"){
        time = completionWeekend[routeCode+"_"+globalHour]; 
    }else if(givenDaykind==="holidays"){
        time = completionHol[routeCode+"_"+globalHour];
    }
    return time;
}
function getRealCompletion(routeCode){
    var realTime;
    if(fileType==='week_1'){
        realTime = real_week_1[routeCode+"_"+globalHour];
    }else if(fileType==='week_2'){
        realTime = real_week_2[routeCode+"_"+globalHour];
    }else if(fileType==='week_3'){
        realTime = real_week_3[routeCode+"_"+globalHour];
    }else if(fileType==='week_4'){
        realTime = real_week_4[routeCode+"_"+globalHour];
    }else if(fileType==='weekend_1_2'){
        realTime = real_wkn_1_2[routeCode+"_"+globalHour];
    }else if(fileType==='weekend_3_4'){
        realTime = real_wkn_3_4[routeCode+"_"+globalHour];
    }else if(fileType==='hol_1_2'){
        realTime = real_hol_1_2[routeCode+"_"+globalHour];
    }else if(fileType==='hol_3_4'){
        realTime = real_hol_3_4[routeCode+"_"+globalHour];
    }

    return realTime;
}
//___________________________PIE_____________________
function pieChart(){
    //delay of route -- day kind
    var mdelayWeekday;
    var mdelayWeekend;
    var mdelayHol;

    if(pieArr.length!=0){
        pieArr=[];
    }
    if(fileType==='week_1'||fileType==='weekend_1_2' ||fileType==='hol_1_2'){
        mdelayWeekday = mweek_1[globalRoute+"_"+globalHour];
        mdelayWeekend = mweekend_1_2[globalRoute+"_"+globalHour];
        mdelayHol=mhol_1_2[globalRoute+"_"+globalHour];

    }else if(fileType==='week_2'||fileType==='weekend_1_2' ||fileType==='hol_1_2'){
        mdelayWeekday = mweek_2[globalRoute+"_"+globalHour];
        mdelayWeekend = mweekend_1_2[globalRoute+"_"+globalHour];
        mdelayHol=mhol_1_2[globalRoute+"_"+globalHour];

    }else if(fileType==='week_3'||fileType==='weekend_3_4' ||fileType==='hol_3_4'){
        
        mdelayWeekday = mweek_3[globalRoute+"_"+globalHour];
        mdelayWeekend = mweekend_3_4[globalRoute+"_"+globalHour];
        mdelayHol=mhol_3_4[globalRoute+"_"+globalHour];

    }else if(fileType==='week_4'||fileType==='weekend_3_4' ||fileType==='hol_3_4'){
        mdelayWeekday = mweek_4[globalRoute+"_"+globalHour];
        mdelayWeekend = mweekend_3_4[globalRoute+"_"+globalHour];
        mdelayHol=mhol_3_4[globalRoute+"_"+globalHour];

    }

    if(mdelayWeekday!=undefined){
        pieArr.push(mdelayWeekday);
    }else{
        pieArr.push('0');
    }

    if(mdelayWeekend!=undefined){
        pieArr.push(mdelayWeekend);
    }else{
        pieArr.push('0');
    }

    if(mdelayHol!=undefined){
        pieArr.push(mdelayHol);
    }else{
        pieArr.push('0');
    }
    
    dataPie.datasets[0].data=pieArr;
    updatePie();
}
//_____________________STOPS OF CHOOSEN ROUTE________
function stopsChart(){

    if(globalAllStops.length!=0){//empty global array
        globalAllStops=[];
        delays=[];
        passengers=[];
    }
    var stops = routeStops[globalRoute];
    var splittedStops = stops.split(",");
    globalAllStops=splittedStops;
    //take delay
    for(var j=0;j<splittedStops.length;j++){
        
        var stopCode=splittedStops[j];
        var delayInStop;

        if(fileType==='week_1'){
            delayInStop = week_1[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='week_2'){
            delayInStop = week_2[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='week_3'){
            delayInStop = week_3[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='week_4'){
            delayInStop = week_4[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='weekend_1_2'){
            delayInStop = weekend_1_2[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='weekend_3_4'){
            delayInStop = weekend_3_4[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='hol_1_2'){
            delayInStop = hol_1_2[globalRoute+"_"+stopCode+"_"+globalHour];
        }else if(fileType==='hol_3_4'){
            delayInStop = hol_3_4[globalRoute+"_"+stopCode+"_"+globalHour];
        }
        
        if(delayInStop!=undefined){
            var splitted = delayInStop.split(",");

            //gemise arrays me delay kai passengers
            delays.push(splitted[0]);
            passengers.push(splitted[1]);
        }else{
            delays.push('2');
            passengers.push('2');
        }
    }
    stopBar['labels']=globalAllStops;
    stopBar.datasets[0].data=delays;
    updateStops();
}
//_______________________PASSENGERS_______________________________
function passChart(){
    passStops['labels']=globalAllStops;
    passStops.datasets[0].data=passengers;
    
    updatePassengers();
}
//________________________NEXT STOP_________________________________
function timeNextStop(){

    if(timeToNext_scd.length!=0 && timeToNext_real!=0){
        timeToNext_scd=[];
        timeToNext_real=[];
    }

    for(var j=0;j<globalAllStops.length;j++){

        var stop = globalAllStops[j];

        var scNext = getSchedNext(stop);
        if(scNext!=undefined){
            timeToNext_scd.push(scNext);
        }
        var rNext = getRealNext(stop);
        if(rNext!=undefined){
            timeToNext_real.push(rNext);
        }
    }
    timeArriveAtStop.labels=globalAllStops;
    timeArriveAtStop.datasets[0].data=timeToNext_scd;
    timeArriveAtStop.datasets[1].data=timeToNext_real;
}
function getSchedNext(stopCode){
    var next;
    if(globalDayKind==="weekday"){
        next = schedWeek[globalRoute+"_"+stopCode+"_"+globalHour];  

    }else if(globalDayKind==="weekend"){
        next = schedWnd[globalRoute+"_"+stopCode+"_"+globalHour]; 

    }else if(globalDayKind==="holidays"){
        next = schedHol[globalRoute+"_"+stopCode+"_"+globalHour];

    }
    return next;
}
function getRealNext(stopCode){
    var realTime;
    if(fileType==='week_1'){
        realTime = realWeek1[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='week_2'){
        realTime = realWeek2[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='week_3'){
        realTime = realWeek3[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='week_4'){
        realTime = realWeek4[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='weekend_1_2'){
        realTime = realWkn12[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='weekend_3_4'){
        realTime = realWkn34[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='hol_1_2'){
        realTime = realHol12[globalRoute+"_"+stopCode+"_"+globalHour];
    }else if(fileType==='hol_3_4'){
        realTime = realHol34[globalRoute+"_"+stopCode+"_"+globalHour];
    }

    return realTime;
}


//***************************************DATA******************************************************* */
/*********** GENERIC ***************** */
//   DELAY LINES
const linesBar = {
    labels: lineNames,
    datasets: [
        {
            label: 'Delay per Bus Lines',
            data:mylinesDelays,
            backgroundColor: 'rgb(75, 192, 192)',
        }
    ]
};
const lineOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Line Names'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Delay in minutes'
        }
      }
    },  
}
//   DELAY for ALL ROUTES
const dataAllRoutes = {
    labels: allRoutesNums,
    datasets: [
        {
            label: 'Delay per Bus Routes',
            data:myroutesDelays,
            backgroundColor: 'rgb(75, 192, 192)',
        }
    ]
};
const routesOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'All Routes Names'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Delay in minutes'
        }
      }
    }     
}


//  Delay of routes of this line
const RouteOfLine = {
    labels: routesCodes,
    datasets: [
        {
            label: 'Delay per route of this line',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(300,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: delayrouteOfLine
        }
    ]
};
const routeOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Route Names of Choosen Line'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Delay in minutes'
        }
      }
    }     
}
//DOUBLE BARSS
const data = {
    labels: routesCodes,
    datasets: [
        {
            data: schComplTime,
            label: 'Schedule Time',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            data: realComplTime,
            label: 'Real Time',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};
const doubleBarOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Route Codes'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Completion Time in Minutes'
        }
      }
    }     
}



// Delay per stop
const stopBar = {
    labels: globalAllStops,
    datasets: [
        {
            label: 'Delay per bus stop in minutes',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: delays
        }
    ]
};
const stopsOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Stop codes of choosen route'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Delay in minutes'
        }
      }
    }     
}
//Day kind pie
const dataPie = {
    labels: ["Weekday", "Weekend", "Holiday"],
    datasets: [
        {
            label: "Mean Delay",
            data: pieArr,
            backgroundColor: [
                "#007D9C",
                "#244D70",
                "#D123B3",
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

//Passerngers Stops
const passStops = {
    labels: globalAllStops,//route of every stopcode
    datasets: [
        {
            label: 'Number of passegers in this bus stop',
            data: passengers,
            backgroundColor: 'rgb(75, 192, 192)',
        }
    ]
};
const passStopsOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Stops of this route'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Mean number of Passengers'
        }
      }
    }     
}
//Time to next stop
const timeArriveAtStop = {
    labels: globalAllStops,
    datasets: [
        {
            label: 'Schedule Time',
            data: timeToNext_scd,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Real Time',
            data: timeToNext_real,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};
const timeArriveAtStopOptions = {
    scales: {
    x: {
            title: {
              display: true,
              text: 'Stop Codes of choosen Route'
            }
    },
      y: {
        title: {
          display: true,
          text: 'Minutes to arrive at next stop'
        }
      }
    }     
}

/**************************************************************************************** */
function OpenChart() {

    const [linesChart, setlinesChart] = useState(false);
    const [displayRoutes, setdisplayRoutes] = useState(false);

    const [delayrouteOfLineChart, setdelayrouteOfLineChart] = useState(false);
    const [twoBars, setTwoBars] = useState(false);

    const [stopsChart, setstopsChart] = useState(false);
    const [displayPie, setDisplayPie] = useState(false);
    
    const [passengers, setPassengers] = useState(false);
    const [timeAtStop, setTimeAtStop] = useState(false);

    //   GENIKA
    updateLines=function(){
        setlinesChart(!linesChart);
        showMax(linesBar,"line");
    } 
    updateRoutes=function(){
        setdisplayRoutes(!displayRoutes);
        showMax(dataAllRoutes,"route");
    }


    //   EIDIKA
    updateRoute=function(){//routes of choosen line
        console.log("MESA")
    
        console.log(routesCodes)
        console.log(delayrouteOfLine)
        setdelayrouteOfLineChart(!delayrouteOfLineChart);
        showMax(RouteOfLine,"oneroute");
    }
    updaterealSced = function(){
        setTwoBars(!twoBars);
        showMax(data,"completion");
    }


    updatePie = function(){
        setDisplayPie(!displayPie)
    }
    updateStops = function(){//stops of route in choosen hour
        setstopsChart(!stopsChart);
        showMax(stopBar,"stops");
    }

    updatePassengers = function(){
        setPassengers(!passengers);
        showMax(passStops,"pass");
    }
    updateTime = function(){
        setTimeAtStop(!timeAtStop)
        showMax(timeArriveAtStop,"time");
    }

    function erase(myid){

        if(myid==="line"){
            setlinesChart(false);
            showMax(linesBar,"line");
        }else if(myid ==="routes"){
            setdisplayRoutes(false);
            showMax(dataAllRoutes,"route");
        }else if(myid ==="route"){
            setdelayrouteOfLineChart(false);
            showMax(RouteOfLine,"oneroute");
        }else if(myid ==="stops"){
            setstopsChart(false);
            showMax(stopBar,"stops");
        }else if(myid ==="pie"){
            setDisplayPie(false);
        }else if(myid ==="two"){
            setTwoBars(false);
            showMax(data,"completion");
        }else if(myid ==="pass"){
            setPassengers(false);
            showMax(passStops,"pass");
        }else if(myid ==="time"){
            setTimeAtStop(false);
            showMax(timeArriveAtStop,"time");
        }else if(myid ==="all"){
            setlinesChart(false);
            showMax(linesBar,"line");
            setdisplayRoutes(false);
            showMax(dataAllRoutes,"route");
            setdelayrouteOfLineChart(false);
            showMax(RouteOfLine,"oneroute");
            setstopsChart(false);
            showMax(stopBar,"stops");
            setDisplayPie(false);
            setTwoBars(false);
            showMax(data,"completion");
            setPassengers(false);
            showMax(passStops,"pass");
            setTimeAtStop(false);
            showMax(timeArriveAtStop,"time");
        }
    }

    return (
        <div>

            <div class="Buttonbox">
                <h2> Chart Types </h2>

                <h4> Informative Charts </h4>
                <button onClick={() =>updateLines()}>
                    Delay per bus lines
                </button>
                <h1></h1>

                <button onClick={() => updateRoutes()}>
                    All Routes Mean Delay
                </button>
                <h1></h1>

                <h4> Charts for choosen Route </h4>
                <button onClick={() =>updateRoute()}>
                    Delay per route of this lines
                </button>
                <h1></h1>
                <button onClick={() => updaterealSced()}>
                    Real - Scheduled completion time per route 
                </button>


                <h1></h1>
                <button onClick={() => updatePie()}>
                    Delay per day kind
                </button>
                <h1></h1>
                <button onClick={() => updateStops()}>
                    Delay per bus stop
                </button>

                <h1></h1>
                <button onClick={() => updatePassengers()}>
                    Mean number of passegers in every bus stop
                </button>
                <h1></h1>
                <button onClick={() => updateTime()}>
                    Minutes to arrive next stop
                </button>

            </div>

            {linesChart && (
                <div class="BarboxLines">
                    <Bar
                        data={linesBar}
                        options={lineOptions}
                        width={50}
                        height={50}
                    />
                </div>

                
            )}
            {displayRoutes && (
                <div class="RoutesChart">
                    <Bar
                        data={dataAllRoutes}
                        options={routesOptions}
                        width={50}
                        height={50}

                    />
                </div>
            )}


            {delayrouteOfLineChart && (
                <div class="RoutesOfLine">
                    <Bar
                        data={RouteOfLine}
                        options={routeOptions}
                        width={50}
                        height={50}
                    />
                </div>
            )}
            {twoBars && (
                <div class="TwoBars">
                    <Bar
                        data={data}
                        options={doubleBarOptions}
                        height={300}
                        
                    />
                </div>
            )}


            {displayPie && (
                <div class="Piebox">
                    <h1 style={{ fontFamily: "monospace" }}>Delay of this route per day kind</h1>
                    <Pie
                        data={dataPie}
                        width={50}
                        height={50}
                    />
                </div>
            )}
            {stopsChart && (
                <div class="StopBar">
                    <Bar
                        data={stopBar}
                        options={stopsOptions}
                        width={50}
                        height={50}
                    />
                </div>

            )}


            {passengers && (
                <div class="PassegersStops">
                    <Bar
                        data={passStops}
                        options={passStopsOptions}
                        width={50}
                        height={50}
                    />
                </div>

            )}
            {timeAtStop && (
                <div class="NextStop">
                    <Bar
                        data={timeArriveAtStop}
                        options={timeArriveAtStopOptions}
                        height={300}
                        
                    />
                </div>

            )}  


            <div class="RemoveChartsbox">
                <h2> Revove Charts </h2>
                <button onClick={() => erase("line")}>Erase Delay per bus lines Chart</button>
                <h1></h1>
                <button onClick={() => erase("routes")}>All Routes Mean Delay Chart</button>
                <h1></h1>

                <button onClick={() =>erase("route")}>Erase Delay per route of this lines Chart</button>
                <h1></h1>
                <button onClick={() => erase("two")}>Erase Real - Scheduled time per bus stop Chart</button>
                <h1></h1>


                <button onClick={() => erase("pie")}>Erase Delay per day kind Chart</button>
                <h1></h1>
                <button onClick={() => erase("stops")}>Erase Delay per bus stop Chart</button>
                <h1></h1>
                <button onClick={() => erase("pass")}>Erase  passegers charts</button>
                <h1></h1>
                <button onClick={() => erase("time")}>Erase Minutes to arrive next stop</button>
                <h1></h1>
                <button onClick={() => erase("all")}>Erase All</button>
            </div>
        </div>
        

    );

}

export default OpenChart;
