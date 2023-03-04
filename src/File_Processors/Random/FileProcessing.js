import arrivalCsv from '../files/original/arrival.csv';
import scheduleCsv from '../files/original/schedule.csv';
import routeCsv from '../files/original/route.csv';

import stops from '../files/original/stops.json';
import Papa from 'papaparse';

 /************************
 * INIT GLOBAL VARS
 ********************** */

/* handling calls of functions */
var hasBeenCalled;
/* holding the output data */
var csvRows;
//For Arrivals
/* arrays to save the data columns from csv file */
var timestamps = [],date = [],time = [];
var coords=[],stopCodes=[];
var lineCodes = [],routeCodes = [];
var month = [];
/** array key = routecode 
 * value = code of 1st stop in the route*/
var routeStart= Array();
/** array key = routecode 
 * value = code of last stop in the route*/
var routeEnd= Array();

/* @todo : probably we'll replace them by the avg times */
var realStart =[];
var realFinish =[];
var schedTime =[];

//For Schedule
var schedDayKind = [];//0->Sunday,1->mONDAY ETC
var schedStopCodes= [];
var schedLineCodes = [];
var schedTime = [];
var schedHour = [];
var shedMinutes = [];
var dateKind=[];
/* vars for computing avgTime*/
var aStop,aDay,avgTime,arouteCode;
var avgCount=0;
var avgTimes=[],iscalled=[];

/* vars for computing avgTime*/
var sDay = [], sRoute=[], sStop =[] ,sLine =[] ;
var sTripTime =[] , sTripTimeHour =[] ,sTripTimeMins =[];
 
//--------------------------------------------------------------- ARRIVAL -----------------------------------------------------------------------------
var is_weekend =  function(date){
  var dt = new Date(date[0],date[1],date[2]);
   
  if(dt.getDay() === 6 || dt.getDay() === 0)
     {
      return "weekend";
      } 
}
var getMonth = function(month){
  var date = new Date(month);
  return date.getMonth()+1;
}

export function setData(records){

    
    for(var i=1; i < records.length;i++){
        /* timestamps */
        const datetime=records[i][7];
        timestamps.push(datetime);
        /* stopCodes , lineCodes */
        const stopCode = records[i][5];
        stopCodes.push(stopCode);

        lineCodes.push(records[i][4]);
        /* routeCodes */
        const routeCode = records[i][3];
        routeCodes.push(routeCode);

         /* startPoints */
         const startPoint =routeStart[routeCode]; // kwdikos prwtis stasis tis diadromis me code routecode
         if(startPoint==stopCode)
         {
           realStart.push();
         }
 
         /* endPoints */
         const endPoint =routeEnd[routeCode];// kwdikos teleftaias stasis tis diadromis me code routecode
         if(endPoint==stopCode)
         {
           realFinish.push();
         }

    }

    // STOP COORDINATES
    for(var k=1; k < stopcodes.length ;k++){
      const result = Object.values(stops).filter(item => item.code === stopCodes[k].toString());
  
      const lat=Object.entries(result)[0][1].latitude;
      const lon=Object.entries(result)[0][1].longitude;
      coords.push(lon+ ","+lat);
    }
    
    for(var i=1; i < timestamps.length;i++){
      const splitTimestamps = timestamps[i].split(" ");

      var date = splitTimestamps[0].split('-');
      if(is_weekend(date)==="weekend"){
        dateKind.push("WEEKEND");
      }else{
        dateKind.push("WEEKDAY");
      }
      time.push(splitTimestamps[1]);
      month.push(getMonth(date));
  }
   

  getSchedule(setSchedule);
  getHolidays(setHolidays);
}

export function getData(callBack){
  callBack = onlyAllowOneCall(callBack);
  Papa.parse(arrivalCsv, {
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
//_____________________________________________________________________________________________________________________________________________________

//------------------------------------------------------- FOR REAL AND PLANNED COMPLETION OF CHOOSEN ROUTE------------------------------------------------
/*
//  ROUTE DAYKIND     REALSTARTTIME  REALFINISHTIME   PROGRAMMEDSTARTTIME   PROGRAMMEDFINISHTIME
    1626   WEEKKEND           6.10                5.05                   6.02

function findRouteStartTime(){
  for(var i=1; i < 4;i++){
    for(var j=1; j < 4;j++){
    //routeStart[routeCodes[i]] -> epistrefei to prwto stopcode ths diadromis
      if(routeEnd[routeCodes[i]] === stopCodes[j]){
        realTimeRouteFinished.push(time[j]);
        plannedTimeRouteFinished.push(schedTime[j]);
      }
    }
  }
}
function findRouteFinishTime(){
  for(var i=1; i < 4;i++){
    for(var j=1; j < 4;j++){
    //routeStart[routeCodes[i]] -> epistrefei to prwto stopcode ths diadromis
      if(routeStart[routeCodes[i]] === stopCodes[j]){//brisko to tropcode
        realTimeRouteStarted.push(time[j]);
        plannedTimeRouteStarted.push(schedTime[j]);
      }
    }
  }
}
*/
//______________________________________________________________________________________________________________________________________________________

//---------------------------------------------------------------- SCHEDULE ----------------------------------------------------------------------------
/**
 **********************
 * RETRIEVE COORDINATES
 **********************
 */
export function setSchedule(records){

  //mexri stopCodes.length
  for(var i=1; i < 4;i++){
    for(var j=1; j < records.length;j++){
      
      if(stopCodes[i]===records[j][3] && routeCodes[i]===records[j][2] && time[i].substring(0, 2) === records[j][6]){
        
        if(records[i][1]===6 || records[i][1]=== 0){
          schedDayKind.push("WEEKEND");
        }else{
          schedDayKind.push("WEEKDAY");
        }
        schedStopCodes.push(records[i][3]);
        schedLineCodes.push(records[i][4]);
        schedTime.push(records[j][5]);
        schedHour.push(records[i][6]);
        shedMinutes.push(records[i][7]); 
      }
    }
  }
  
}
export function getSchedule(callBack){
 
   Papa.parse(scheduleCsv, {
     download: true,
     dynamicTyping: true,
     complete: function (input) {
         callBack(input.data);
   
     }
   });
   
};
//___________________________________________________________________________________________________________________________________________________________

//---------------------------------------------- Start and finish of the routes(routeStart,routeEnd) ---------------------------------------------------------
export function setStart(records){
  //mexri routeCodes.length
    for(var j=1; j < records.length;j++){
      const start= typeof records?.[j][6] === 'string' ?records[j][6].substring(0, records[j][6].indexOf(',')) : '';   //paei sto route.csv kai blepei ola ta routeCodes tis diadromis kai 
      routeStart[records[j][1]]= start;                                                                                //bazei sto start to 1o

      const end =  typeof records?.[j][6] === 'string' ?records[j][6].substring(records[j][6].lastIndexOf(",")) : '';
      routeEnd[records[j][1]]= end.slice(1);                                                                           //paei sto route.csv kai blepei ola ta routeCodes tis diadromis kai 
    }                                                                                                                  ////bazei sto end to teleutaio


    getData(setData); //afou pira to start stop code kai to finish paw sto arrivals
}

export function getStart(callBack){
 
  Papa.parse(routeCsv, {
    download: true,
    dynamicTyping: true,
    complete: function (input) {
        callBack(input.data);
  
    }
  });
  
};
//_____________________________________________________________________________________________________________________________________________________________________
/**
 **********************
 * RETRIEVE HOLIDAYS FILE
 **********************
 */
 export function setHolidays(records){

  var ind =1;
 //mexri stopCodes.length
 console.log(records.length+"RECORRRRRRRRRRDS")
 for(var j=1; j < records.length;j++)
 {
     //if day == sunday
     if(records[j][1] === 0)
     {
       sDay[ind] = records[j][1];
       sRoute[ind] = records[j][2];
       sStop[ind] = records[j][3];
       sLine[ind] = records[j][4];
       sTripTime[ind] = records[j][5];
       sTripTimeHour[ind] = records[j][6];
       sTripTimeMins[ind] = records[j][7];
       ind = ind + 1;
     }
   
 }
 console.log(ind+"LENGTTTTTTTH OF FILES")
 
}
export function getHolidays(callBack)
{
 
   Papa.parse(scheduleCsv, 
    {
     download: true,
     dynamicTyping: true,
     complete: function (input) {
         callBack(input.data);
   
     }
   });
   
};
/**
 ******************************
 *    DOWNLOAD CSV FILE
 ******************************
 */
const download = function (data) {

	// Creating a Blob for having a csv file format
	// and passing the data with type
	const blob = new Blob([data], { type: 'text/csv' });

	// Creating an object for downloading url
	const url = window.URL.createObjectURL(blob)

	// Creating an anchor(a) tag of HTML
	const a = document.createElement('a')

	// Passing the blob downloading url
	a.setAttribute('href', url)

	// Setting the anchor tag attribute for downloading
	// and passing the download file name
	a.setAttribute('download', 'download.csv');

	// Performing a download with click
	a.click()
}
/**
 ******************************
 *    CREATE CSV FILE
 ******************************
 */
const csvmaker = function (data) {

	// Empty array for storing the values
	csvRows = [];

       /* Get headers as every csv data format
        has header (head means column name)
        so objects key is nothing but column name
        for csv data using Object.key() function.
        We fetch key of object as column name for
        csv */
        const headers = Object.keys(data[0]);
     
        /* Using push() method we push fetched
           data into csvRows[] array */
        csvRows.push(headers.join(','));
     
        // Loop to get value of each objects key
        for (const row of data) {
            const values = headers.map(header => {
                const val = row[header]
                return `"${val}"`;
            });
     
            // To add, sepearater between each value
            csvRows.push(values.join(','));
        }
     
        /* To add new line for each objects values
           and this return statement array csvRows
           to this function.*/
        return csvRows.join('\n');
}
//____________________________________________________________________________________________________________________________________________________________________________

export const get = async function () {


    let data= [];
    for(var i=0; i < stopCodes.length;i++){
       /* local vars */
       aStop = stopCodes[i];
       aDay = date[i];
       avgTime = new Date(timestamps[i]).getTime();
       arouteCode = routeCodes[i];

       let ahour = time[i].substring(0, 2);
       let avgCount =1;

       
       
       //iscalled.push(stopCodes[i]) !iscalled.includes(stopCodes[j])
       //date.length
       for(var j=i; j< date.length;j++)
       {
           if(date[j]!==aDay && stopCodes[j]===aStop && time[j].substring(0, 2)=== ahour && routeCodes[j]==arouteCode)
           {
             //avgTime[i] += time[i]
             avgCount = avgCount +1;
             let sdat = aDay.concat(" "+time[j])
             let inSec = new Date(sdat).getTime(); // get milliseconds
             avgTime = avgTime + inSec;
               
             
           }
           
       }
       let avgRes = new Date(avgTime/avgCount).toString().substring(17, 24);
       

       avgTimes.push(avgRes);
    }
    for(var s=1; s < sDay.length;s++)
    {

      data.push({"day" : sDay[s],
                "routeCode":sRoute[s],
                "stopCode":sStop[s],
                "line": sLine[s],
                "tripTime":sTripTime[s],
                "tripTimedHour":sTripTimeHour[s],
                "tripTimeMinute":sTripTimeMins[s]})
    }
    
     //create and download the csv file 
    const csvdata = csvmaker(data);
    download(csvdata);
  
}


    /*
    for(var i=1; i < 4;i++)
    {

      data.push({"timestampID" : i,
                "date":date[i],
                "realTime":time[i],
                "realHour":time[i],//.substring(0, 2),
                "realMins":time[i],//.substring(3, 5),
                "schedTime":schedTime[i],
                "schedHour":schedTime[i],//.substring(0, 2),
                "schedMins":schedTime[i],//.substring(3, 5),
                "stopCode": stopCodes[i],
                "stopCoords":coords[i],
                "lineCode":lineCodes[i],
                "routeCode":routeCodes[i]})
    }
    
     /* create and download the csv file */
    //const csvdata = csvmaker(data);
    //download(csvdata);*/