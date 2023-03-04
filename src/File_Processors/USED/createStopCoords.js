import Papa from 'papaparse';
import stops from './stop.csv';
//Creating StopCoords.js file ---> [stopcode] = stop coords
//stop.csv
var mystops = [];
var mycoords = [];

export function setStops(recordsStops) {
    console.log("var stopCoords={}")
    for (var i = 1; i < recordsStops.length; i++) {
        mystops.push(recordsStops[i][1]);
        mycoords.push(recordsStops[i][3] + "," + recordsStops[i][2]);
    }
    for(var i = 1; i < mystops.length; i++){
        var data = "stopCoords['"+mystops[i]+"']='"+mycoords[i]+"';";
        console.log(data)
    }

}

export function getStops(callBack) {

    Papa.parse(stops, {
        download: true,
        dynamicTyping: true,
        complete: function (input) {
            callBack(input.data);

        }
    });

};