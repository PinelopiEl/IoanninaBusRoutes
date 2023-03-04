import React from 'react';
import real from '../../../files/JS/Real Avg Time/AllTimeReal.js';
import start_end_stops from '../../../files/JS/start_end_routes.js';
import Papa from 'papaparse';
//var routeNumbers = [105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];
var routeNumbers = [1004]
export function createMeanTimeComplFile(){

    for( var i = 0; i < routeNumbers.length; i++){
        var startArr = [];

        var startend = start_end_stops[routeNumbers[i]];
        const spStEnd = startend.split(",")
        var startStop = spStEnd[0];
        var endStop = spStEnd[1];

        var accessStart = routeNumbers[i]+"_"+startStop;
        

        var accessFinish = routeNumbers[i]+"_"+endStop;
        var finishTime = real[accessFinish];

        
        for (var i = 0; i < 23119; i++) {
            var startTime = real[accessStart];
            if(startTime!=undefined){
                console.log(startTime)
                startArr.push(startTime);
            }
            
        }
        console.log(startArr)   
       
    }
}