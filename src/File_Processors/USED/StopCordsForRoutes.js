import Papa from 'papaparse';
import stops from '../files/stop.csv';
import routeCsv from '../files/route.csv';
//Create Waypoints.js file
//ROUTE.CSV
var routeCodes = [];
var stopCodes = [];
var stopcodelines = [];
//stop.csv
var mystops = [];
var mycoords = [];

//-------------------- ROUTE.CSV --------------------------------------------
export function setRoutes(records) {

    for (var i = 1; i < records.length; i++) {
        if (routeCodes.includes(records[i][1]) === false) {
            routeCodes.push(records[i][1]);
        }
        if (stopCodes.includes(records[i][6]) === false) {
            stopCodes.push(records[i][6]);
        }

    }
    for (var i = 0; i < stopCodes.length; i++) {
        if (stopcodelines.includes(stopCodes[i]) === false) {
            if (stopCodes[i] !== undefined) {
                var ln = stopCodes[i].split(',');
                stopcodelines.push(ln);
            }
        }
    }
}

/*function setStopCoords(){
    for(var i=0; i < (stopcodelines.length-1); i++){
    
            var line = stopcodelines[i];
            for(var d=0; d < line.length;d++){
                var code = line[d];
                for(var j=0; j < mystops.length;j++){
                    if(mystops[j] !== undefined){
                        if(code===mystops[j].toString()){
                            if(finalcoords.includes(mycoords[j])===false){
                                finalcoords.push(mycoords[j]);
                            }
                        }
                    }
                   
            }
            COORDS.push(finalcoords);
        }
    }
}*/
export function getAllRouteCodes() {
    getStops(setStops);
    return routeCodes;
}
export function getRoutes(callBack) {

    Papa.parse(routeCsv, {
        download: true,
        dynamicTyping: true,
        complete: function (input) {
            callBack(input.data);

        }
    });

};

//---------------------- STOP.CSV ---------------------------------------------
export function setStops(recordsStops) {

    for (var i = 1; i < recordsStops.length; i++) {
        mystops.push(recordsStops[i][1]);
        mycoords.push(recordsStops[i][3] + "," + recordsStops[i][2] + ";");
    }
    getRoutes(setRoutes);

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

//____________________________________________________________________________________________________________________________________________________________________________

export const get = function (mycode) {
    var data = Array();
    var way = [];

    for (var i = 0; i < (routeCodes.length - 1); i++) {
        if (parseInt(mycode) === routeCodes[i]) {//briskw to code sto routes
            var line = stopcodelines[i];

            for (var d = 0; d < line.length; d++) {
                var code = line[d];//px edw 0630 to 0 

                for (var j = 0; j < mystops.length; j++) {

                    if (mystops[j] !== undefined) {
                        if (parseInt(code) === mystops[j]) {
                            way.push(mycoords[j]);

                        }
                    }
                }
            }

        }

    } for (var i = 0; i < way.length; i++) {
        if (data.includes(way[i]) === false) {
            data.push(way[i]);
        }
    }
    return data;
}
