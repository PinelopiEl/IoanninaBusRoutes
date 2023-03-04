import Papa from 'papaparse';
import sched from './ScheduleWeekday.csv';
/*
*          Creating files that Map.js can access the stopCode that the bus should be in this routecode , Hour , minutes and daykind 
*          user choose
*/
//stop.csv
var routes = [];
var hours = [];
var minutes =[];
var stopCode = [];
var hasBeenCalled;

export function setSched(recordsStops) {
    console.log("var schedStop={}")
    for (var i = 1; i < recordsStops.length; i++) {
        routes.push(recordsStops[i][0]);
        hours.push(recordsStops[i][2]);
        minutes.push(recordsStops[i][3]);
        stopCode.push(recordsStops[i][1]);
    }
    for(var i = 1; i < routes.length; i++){
        var data = "schedStop['"+routes[i]+"_"+hours[i]+"_"+minutes[i]+"']='"+stopCode[i]+"';";
        console.log(data)
    }


}

export function getSched(callBack) {
    callBack = onlyAllowOneCall(callBack);
    Papa.parse(sched, {
        download: true,
        dynamicTyping: true,
        complete: function (input) {
            callBack(input.data);

        }
    });

};
function onlyAllowOneCall(fn){
    hasBeenCalled = false;    
    return function(){
         if (hasBeenCalled){
            return;
         }
         hasBeenCalled = true;
         return fn.apply(this, arguments)
    }
  }

