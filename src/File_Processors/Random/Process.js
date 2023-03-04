import Papa from 'papaparse';
import trip from '../files/new/trips.csv';

/*********** Vars ***********/
var hasBeenCalled;

var routeCodes=[];
var times=[];
var hours=[];
var minutes=[];
var stopCodes=[];

var totalSeats=[];
var embarkation=[];
var debarkation=[];
var occupied=[];


var tripArray = new Array();
/***************************/

export function setTrip(records){

    for(var i=1; i < (records.length-1);i++){
        const route = records[i][8];
        routeCodes.push(route);
        const time = records[i][9];
        times.push(time);

        //prostheta dedomena
        const seat = records[i][3]
        totalSeats.push(seat);
        const emb =records[i][5];
        embarkation.push(emb);
        const deb = records[i][6];
        debarkation.push(deb);
        const occ = records[i][2];
        occupied.push(occ);

        //ti tha dwsei
        const stop = records[i][4];
        stopCodes.push(stop);
    }
    console.log(routeCodes[1])
    for(var i=0; i < times.length;i++){
        const split = times[i].split(":");
        hours.push(split[0]);
        minutes.push(split[1]);
    }

    let data = [];
    for(var i=0; i < 2;i++){
        data.push({"hours": hours[i],"minutes": minutes[i],"Stopcodes":stopCodes[i]
        
        })
        
    }
    console.log(data);
}
export function getTrip(callBack){
    //callBack = onlyAllowOneCall(callBack);
    Papa.parse(trip, {
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

/*************
 *                      px arxeio Weekend(0)
 *                              -> apo edw kai pera ta pairnw
 *  Routecode |  hour | minutes | stopcode | totalSeats ...
 * 
 */
export function createArrays(){
   
    console.log("^^^^^^^^^^^^^^^^");
    console.log(routeCodes[1])
    /*for(var i=0; i < time.length;i++){
        data.push({"routeCode":routeCodes[i],"hours": hours[i],"minutes": minutes[i],"Stopcodes":stopCodes[i]
        
        })
        console.log(data);
    }*/
}