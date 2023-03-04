import Papa from 'papaparse';
import sched from './final_updated_schedule.csv';

//route.csv
var route = [];
var stops = [];

export function setStops(recordsStops) {
    console.log("var routeStops={};")
    for (var i = 1; i < recordsStops.length; i++) {
        route.push(recordsStops[i][1]);
        stops.push(recordsStops[i][6]);
    }
    for(var i = 1; i < route.length; i++){
        var data = "routeStops['"+route[i]+"']='"+stops[i]+"';";
        console.log(data)
    }
    console.log("export default ")

}

export function getStops(callBack) {

    Papa.parse(sched, {
        download: true,
        dynamicTyping: true,
        complete: function (input) {
            callBack(input.data);

        }
    });

};