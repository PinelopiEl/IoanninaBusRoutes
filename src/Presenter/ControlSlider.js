import React, { useState, useEffect } from 'react';
import {callMoveBus} from './Map';
import { printProposals } from './Proposals';
import './Slider.css';

import stops from '../files/JS/RoutesStops';
import schedDay from '../files/JS/Schedule/CodeToStop_Weekday';
import scheDDend from '../files/JS/Schedule/CodeToStop_Weekend';
import schedHol from '../files/JS/Schedule/CodeToStop_Holidays';

//DELAYS
import delayDay_slot1 from '../files/JS/AvgDelayRoutes/slots/delay_Weekday_slot1';
import delayDay_slot2 from '../files/JS/AvgDelayRoutes/slots/delay_Weekday_slot1';
import delayDay_slot3 from '../files/JS/AvgDelayRoutes/slots/delay_Weekday_slot3';
import delayDay_slot4 from '../files/JS/AvgDelayRoutes/slots/delay_Weekday_slot4';
import delayEnd_slot12 from '../files/JS/AvgDelayRoutes/slots/delay_Weekend_slot1_2';
import delayEnd_slot34 from '../files/JS/AvgDelayRoutes/slots/delay_Weekend_slot3_4';
import delayHol_slot12 from '../files/JS/AvgDelayRoutes/slots/delay_Holiday_slot1_2';
import delayHol_slot34 from '../files/JS/AvgDelayRoutes/slots/delay_Holiday_slot3_4';

import real_week_1 from '../files/JS/real_completion/real_completion_week_1';
import real_week_2 from '../files/JS/real_completion/real_completion_week_2';
import real_week_3 from '../files/JS/real_completion/real_completion_week_3';
import real_week_4 from '../files/JS/real_completion/real_completion_week_4';
import real_wkn_1_2 from '../files/JS/real_completion/real_completion_weekend_1_2';
import real_wkn_3_4 from '../files/JS/real_completion/real_completion_weekend_3_4';
import real_hol_1_2 from '../files/JS/real_completion/real_completion_hol_1_2';
import real_hol_3_4 from '../files/JS/real_completion/real_completion_hol_3_4';

//SCHEDULE COMPLETION TIMES
import completionWeekday from '../files/JS/Schedule/completion_time_week';
import completionWeekend from '../files/JS/Schedule/completion_time_weekend';
import completionHol from '../files/JS/Schedule/completion_time_holidays';

/* User Input on Info Box  */
var globalHour;
var globalMinutes;
var givenMonth;
var givenDaykind;
var fileType;
var globalDiff;//gia color sto map

var chosen_slot;
//###########################################  STATISTICS  ###############################################################################
/************************************************************************
* Each double bus holds around 170 people in lines 16,17.
* Three levels: from 80% up to 120% ,from 40% up to 79%,from  0% up to 39%.
* This leads to passengers : 136 - 200, 68 - 135 , 0 - 67.
*
* Each single bus holds around 90 people in the rest of the lines
* Three levels: from 80% up to 120% ,from 40% up to 79%,from  0% up to 39%
* This leads to passengers : 72- 100, 36 -71 , 0 - 35.
**********************************************************************/
//##########################################################################################################################
/*******************************************
*  Array that holds months with level of usage 
*  0:low ,1:low to medium ,2:medium, 3:high 
********************************************/
var months_0 = ['12', '4', '8'];//'December', 'April', 'August'
var months_1 = ['11', '7']; //'November', 'July'
var months_2 = ['2', '5', '3'];//'February', 'May', 'March'
var months_3 = ['9', '10', '1', '6'];//'September', 'October', 'January', 'June'


function updateMap() {
    console.log(givenDaykind)
    if (globalHour != '5') {
        callMoveBus(globalHour,globalMinutes,givenDaykind);
    }
}


export var printInformation = function(stop,routeCode){
    if(stop!=undefined){
        document.getElementById("stop").value = stop;
    }
    
    var myStops=stops[routeCode];
    var splitStop = myStops.split(",");
    var myNextStop;

    for(var i=0; i<=splitStop.length; i++){
        if(splitStop[i]===stop){
            if(splitStop[i+1]===undefined){
                myNextStop=-1;
            }else{
                myNextStop=splitStop[i+1];
            }
        }
    }
    
    if(myNextStop!=-1){
        if(givenDaykind==="weekday"){
            for (let key in schedDay) {
                if (schedDay[key] === myNextStop && key.split("_")[0]==routeCode && key.split("_")[1]==globalHour ) {
                  var nextTime =  key.split("_")[1] +":"+ key.split("_")[2];
                  document.getElementById("nextStop").value = nextTime;
                }
            }
        }else if(givenDaykind==="weekend"){
            for (let key in scheDDend) {
                if (scheDDend[key] === myNextStop && key.split("_")[0]==routeCode && key.split("_")[1]==globalHour ) {
                  var nextTime =  key.split("_")[1] +":"+ key.split("_")[2];
                  document.getElementById("nextStop").value = nextTime;
                }
            }
        }else if(givenDaykind==="holidays"){
            for (let key in schedHol) {
                if (schedHol[key] === myNextStop && key.split("_")[0]==routeCode && key.split("_")[1]==globalHour ) {
                  var nextTime =  key.split("_")[1] +":"+ key.split("_")[2];
                  document.getElementById("nextStop").value = nextTime;
                }
            }
        }
    }else{
        document.getElementById("nextStop").value = "Last Stop";
    }
    
    
    if(globalMinutes==="0"){
        document.getElementById("schedTime").value = globalHour.toString()+":"+globalMinutes.toString()+"0";
    }else{
        document.getElementById("schedTime").value = globalHour.toString()+":"+globalMinutes.toString();
    }
    
    printStatistics(routeCode,stop);
}

/*MONTH KIND- DAYKIND*/
export var printStatistics = function (routeCode,stop) {
    var delay;
    var realMinutes;
    var passengers;
    var realTime;

    if (months_0.includes(givenMonth)) {//slot_1
        chosen_slot=1;
        if(givenDaykind==="weekday"){
            var info = delayDay_slot1[routeCode+"_"+stop+"_"+globalHour];
            fileType="week_1";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_week_1[routeCode+"_"+globalHour];
        }else if(givenDaykind==="weekend"){
            var info = delayEnd_slot12[routeCode+"_"+stop+"_"+globalHour];
            fileType="weekend_1_2";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_wkn_1_2[routeCode+"_"+globalHour];
        }else if(givenDaykind==="holidays"){
            var info = delayHol_slot12[routeCode+"_"+stop+"_"+globalHour];
            fileType="hol_1_2";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_hol_1_2[routeCode+"_"+globalHour];
        }

    }else if (months_1.includes(givenMonth)) {//slot_2
        chosen_slot=2;
        if(givenDaykind==="weekday"){
            var info = delayDay_slot2[routeCode+"_"+stop+"_"+globalHour];
            fileType="week_2"; 
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_week_2[routeCode+"_"+globalHour];
        }else if(givenDaykind==="weekend"){
            var info = delayEnd_slot12[routeCode+"_"+stop+"_"+globalHour];
            fileType="weekend_1_2"; 
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_wkn_1_2[routeCode+"_"+globalHour];
        }else if(givenDaykind==="holidays"){
            var info = delayHol_slot12[routeCode+"_"+stop+"_"+globalHour];
            fileType="hol_1_2"; 
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_hol_1_2[routeCode+"_"+globalHour];
        }
    }else if (months_2.includes(givenMonth)) {//slot_3
        chosen_slot=3;
        if(givenDaykind==="weekday"){
            var info = delayDay_slot3[routeCode+"_"+stop+"_"+globalHour];
            fileType="week_3";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_week_3[routeCode+"_"+globalHour];
        }else if(givenDaykind==="weekend"){
            var info = delayEnd_slot34[routeCode+"_"+stop+"_"+globalHour];
            fileType="weekend_3_4";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_wkn_3_4[routeCode+"_"+globalHour];
        }else if(givenDaykind==="holidays"){
            var info = delayHol_slot34[routeCode+"_"+stop+"_"+globalHour];
            fileType="hol_3_4";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_hol_3_4[routeCode+"_"+globalHour];
        }
    }else if (months_3.includes(givenMonth)) {//slot4
        chosen_slot=4;
        if(givenDaykind==="weekday"){
            var info = delayDay_slot4[routeCode+"_"+stop+"_"+globalHour];
            fileType="week_4";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_week_4[routeCode+"_"+globalHour];
        }else if(givenDaykind==="weekend"){
            var info = delayEnd_slot34[routeCode+"_"+stop+"_"+globalHour];
            fileType="weekend_3_4";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_wkn_3_4[routeCode+"_"+globalHour];
        }else if(givenDaykind==="holidays"){
            var info = delayHol_slot34[routeCode+"_"+stop+"_"+globalHour];
            fileType="hol_3_4";
            var splitted = info.split(",");
            delay = splitted[0];
            passengers = splitted[1];
            realTime = real_hol_3_4[routeCode+"_"+globalHour];
        }
    }
    
    if(delay!=undefined && passengers!=undefined){
        if(delay!=0){
            realMinutes = parseInt(globalMinutes)+parseInt(delay);
            document.getElementById("realTime").value = globalHour.toString()+":"+realMinutes.toString();
        }else{
            document.getElementById("realTime").value = globalHour.toString()+":"+globalMinutes.toString();
        }
        
        document.getElementById("delay").value = delay;
        document.getElementById("passeng").value = passengers;
    }else{
        alert("Choose another month")
    }
    var schedTime = getSchedCompletion(routeCode);

    globalDiff=parseInt(realTime)-parseInt(schedTime);
    document.getElementById("schedMean").value =schedTime ;        
    document.getElementById("realMean").value = realTime;         
    document.getElementById("diffMean").value = globalDiff;
    printProposals(routeCode+"_"+globalHour,passengers,chosen_slot,givenDaykind);  
}

function getSchedCompletion(routeCode){
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

export function getFileType(){
    return fileType;
}
export function getDiffColor(){
    return globalDiff;
}

function monthName(monthNum) {
    const months = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNum];
}

/***********
* CONTROLLER
************/
function ControlSlider() {

    const [hour, setHour] = useState("5");
    const [minutes, setMinutes] = useState("00");
    const [month, setMonth] = useState("1");
    const [dayKind, setDayKind] = useState("");

    useEffect(() => {
        globalHour = hour;
    }, [hour]);

    useEffect(() => {
        globalMinutes = minutes;
    }, [minutes]);

    useEffect(() => {
        givenMonth = month;
    }, [month]);

    useEffect(() => {
        givenDaykind=dayKind;
    }, [dayKind]);

    return (

        <div class="info-box">
            <h2> Traffic Data</h2>

            
            <div class="session" id="sliderbar">
                <h4>Hour: {hour} </h4>
                <input id="slider" type='range' min='5' max='23' step='1' defaultValue='0'
                    onChange={(event) => setHour(event.target.value)} />
            </div>

            <div class="session" id="sliderbar">
                <h4>Minutes: {minutes} </h4>
                <input id="slider" type='range' min='0' max='59' step='1' defaultValue='0'
                    onChange={(event) => setMinutes(event.target.value)} />
            </div>

            <div class="session" id="sliderbar">
                <h4>Months: {monthName(month)} </h4>
                <input id="slider" type='range' min='1' max='12' step='1' defaultValue='0'
                    onChange={(event) => setMonth(event.target.value)} />
            </div>

            <div class='session'>
                <h3>Day of the week</h3>


                <input id='weekday' type='radio' name='toggle' value='weekday' defaulChecked='checked' onChange={(event) => setDayKind(event.target.value)} />
                <label for='weekday'> Weekday </label>
            </div>  
            <div class='session'>
                <input id='weekend' type='radio' name='toggle' value='weekend' onChange={(event) => setDayKind(event.target.value)} />
                <label for='weekend'>Weekend</label>
            </div>
            <div class='session'>  
                <input id='holidays' type='radio' name='toggle' value='holidays' onChange={(event) => setDayKind(event.target.value)} />
                <label for='holidays'>Holidays</label>

            </div>
            
            <div class='session'>
                <button onClick={updateMap}>Statistics</button>
            </div>
            

            <div class='session'>
                <h2>Delay in route</h2>
                <div class='row colors'>
                </div>

            </div>

            <div class='session'>
                <label id='label' for="Stop should be">Stop that bus is: </label>
                <input type="text" id="stop" name="fname" value=" "></input>
                <h1></h1>

                <label for="Time to next stop">Bus arrives at next stop at: </label>
                <input type="text" id="nextStop" name="fname" value=" "></input>
                <h1></h1>

                <label for="Scheduled Arrival Time">Scheduled Arrival Time:  </label>
                <input type="text" id="schedTime" name="fname" value=" "></input>
                <h1></h1>

                <label for="Real Arrival Time">Real Arrival Time: </label>
                <input type="text" id="realTime" name="fname" value=" "></input>
                <h1></h1>

                <label for="Delay of current route">Delay of current stop: </label>
                <input type="text" id="delay" name="fname" value=" "></input>
                <h1></h1>

                <label for="Scheduled Mean time of completion">Scheduled Mean completion time:</label>
                <input type="text" id="schedMean" name="fname" value=" "></input>
                <h1></h1>

                <label for="Real Mean time of completion">Real Mean completion time:</label>
                <input type="text" id="realMean" name="fname" value=" "></input>
                <h1></h1>

                <label for="Difference in mean time">Difference in mean time: </label>
                <input type="text" id="diffMean" name="fname" value=" "></input>
                <h1></h1>

                <label for="Mean number of passengers">Mean number of passengers: </label>
                <input type="text" id="passeng" name="fname" value=" "></input>

            </div>
        </div>
    );
}

export default ControlSlider;


