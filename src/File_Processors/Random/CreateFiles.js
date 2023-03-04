import Papa from 'papaparse';
import scheduleCsv from '../files/new/updated_schedule.csv';
import routeCsv from '../files/original/route.csv';
import stops from '../files/original/stops.json';

import liveCsv from '../files/new/live.csv';
import tripCsv from '../files/new/trips.csv';

/*********** Vars *************************************/
/* handling calls of functions */
var hasBeenCalled;

/* holding the output data */
var csvRows;

//For LIVE
var timestamps = [],time = [],hours=[],minutes=[];
var stoplat=[],stoplong=[],stopCodes=[];
var month = [];
var routeCodes=[],lines = [];
var routeOnce=[];

//new info
var departMins=[],departSecs=[];
var arrMins=[],arrSecs=[];
const vehicleCodes = new Map();
var dayKind=[];

/** array key = routecode 
 * value = code of 1st stop in the route*/
var routeStart= Array();
/** array key = routecode 
 * value = code of last stop in the route*/
var routeEnd= Array();


//For Schedule
var weekday_dayKind = [];
var weekday_stops= [];
var weekday_routes = [];
var weekday_hour = [];
var weekday_minutes = [];

var weekend_dayKind = [];
var weekend_stops= [];
var weekend_routes = [];
var weekend_hour = [];
var weekend_minutes = [];


var sc_lat=[];
var sc_long=[];

var weekend_lat=[];
var weekend_long=[];

var hol_dayKind = [];
var hol_stops= [];
var hol_routes = [];
var hol_hour = [];
var hol_minutes = [];
var hol_lat=[];
var hol_long=[];
//for trip
const totalSeats = new Map();

/* vars for computing avgTime*/
var sDay = [], sRoute=[], sStop =[] ;
var sTripTime =[] , sTripTimeHour =[] ,sTripTimeMins =[];


//********************************************************************************************************************************************************************** */
//                                                        HOLIDAY SCHEDULE 
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


//********************************************************************************************************************************************************************** */
//                                                          LIVE 
 
var is_weekend =  function(date){
    var dt = new Date(date[0],date[1],date[2]);
    if(date[1] ==="12" && date[2]==="25" || date[1] ==="11" && date[2]==="17" && date[1] ==="1" && date[2]==="1")
    {
        return "holidays";
    }
    if(dt.getDay() === 6 || dt.getDay() === 0)
       {
        return "weekend";
        } 
}
var getMonth = function(month){
    var date = new Date(month);
    return date.getMonth()+1;
}
var routeNumbers = [105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];
function difference(a, b) {
  return Math.abs(a - b);
}
//For LIVE

var livestops=[];
var routes=[];


//new info
var departMins=[];
var arrMins=[];
var arrDiff=[];
var total= Array();
const averageTime = new Map();

function diffTime(mymin,mymin1) {

  var date1 = new Date(2000, 0, 1, 1, mymin); // 9:00 AM
  var date2 = new Date(2000, 0, 1, 1, mymin1); // 5:00 PM
  var diff = date2 - date1;
  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  
  return mm;

}

export function setLive(records){                     
 
  for(var i=1; i < records.length;i++){
    if(routeNumbers.includes(records[i][7])){

      const rt = records[i][7];
      routes.push(rt);

      const st = records[i][8];
      livestops.push(st);

      const dMins = records[i][2];
      departMins.push(dMins);
      const aMin = records[i][4];
      arrMins.push(aMin);
   
    }
  }

  for(var i=1; i < routes.length;i++){
    var myroute=routes[i];
    var mystop=livestops[i];
    for(var j=1; j < livestops.length;j++){
      var timeArr=[];
      if(routes[j]===myroute && livestops[j]===mystop) {
        var timediff = diffTime(departMins[j],arrMins[j]);
        timeArr.push(timediff);
      }
    }
    for(var k=1; k < timeArr.length;k++){
      var ta = timeArr[k];
      total += ta;
    }
    var size = timeArr.length;
    var avTime=total/size;
    averageTime.set(myroute+"_"+mystop,avTime);
    
    

  }
  
 
      
}

export function getLive(callBack){
  Papa.parse(liveCsv, {
    download: true,
    dynamicTyping: true,
    complete: function (input) {
        callBack(input.data);
    }
  });
};

//********************************************************************************************************************************************************************** */
//                                                          SCHEDULE (gemizei pinakes me stoixeia apo schedule)

export function setTrip(records){ //TOTAL SEATS
  for(var i=1; i < records.length;i++){
    for(var j=0; j < weekday_routes.length;j++){
      var route=weekday_routes[j];
      if(route=== records[i][8]){
        if(!routeOnce.includes(route)){
          routeOnce.push(route);
          totalSeats.set(route,records[i][3]);
        }
      }
    }
  }
}

export function getTrip(callBack){
  Papa.parse(tripCsv, {
    download: true,
    dynamicTyping: true,
    complete: function (input) {
        callBack(input.data);
    }
  });
};

//********************************************************************************************************************************************************************** */
//---------------------------------------------- Start and finish of the routes(routeStart,routeEnd) ---------------------------------------------------------
export function setStart(records){
    for(var j=1; j < records.length;j++){
        const start= typeof records?.[j][6] === 'string' ?records[j][6].substring(0, records[j][6].indexOf(',')) : '';   //paei sto route.csv kai blepei ola ta stopCodes tis diadromis kai 
        routeStart[records[j][1]]= start;                                                                                //bazei sto start to 1o
  
        const end =  typeof records?.[j][6] === 'string' ?records[j][6].substring(records[j][6].lastIndexOf(",")) : '';
        routeEnd[records[j][1]]= end.slice(1);                                                                           //paei sto route.csv kai blepei ola ta stopCodes tis diadromis kai 
    } 
    getLive(setLive); //afou pira to start stop code kai to finish paw sto arrivals
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




//********************************************************************************************************************************************************************** */
//                                                          SCHEDULE (gemizei pinakes me stoixeia apo schedule)

export function setSchedule(records){

  for(var i=1; i < records.length;i++){
    if(records[i][0]===0){
      hol_dayKind.push("HOLIDAYS");
      hol_routes.push(records[i][1]);
      hol_stops.push(records[i][2]);
      hol_hour.push(records[i][4]);
      hol_minutes.push(records[i][5]);
    }
    /*if(records[i][0]===6 || records[i][0]=== 0){
      weekend_dayKind.push("WEEKEND");
      weekend_routes.push(records[i][1]);
      weekend_stops.push(records[i][2]);
      weekend_hour.push(records[i][4]);
      weekend_minutes.push(records[i][5]); 
    }
    if(records[i][0]!=6 && records[i][0]!= 0){
      weekday_dayKind.push("WEEKDAY");
      weekday_routes.push(records[i][1]);
      weekday_stops.push(records[i][2]);
      weekday_hour.push(records[i][4]);
      weekday_minutes.push(records[i][5]);
    }
      */
  }
  for(var k=0; k <(hol_stops.length-1);k++){

    const result = Object.values(stops).filter(item => item.code === hol_stops[k].toString());
    
    if(result.length!=0){
      const lat=Object.entries(result)[0][1].latitude;
      const long=Object.entries(result)[0][1].longitude;
      hol_lat.push(lat);
      hol_long.push(long);

    }else{              //some stopcodes that exist in schedule file do not exist in stops file(with coordinates)
      hol_lat.push("-");
      hol_long.push("-");
      continue;
    }
    
  }
  /*for(var k=0; k <(weekend_stops.length-1);k++){

    const result = Object.values(stops).filter(item => item.code === weekend_stops[k].toString());
    
    if(result.length!=0){
      const lat=Object.entries(result)[0][1].latitude;
      const long=Object.entries(result)[0][1].longitude;
      weekend_lat.push(lat);
      weekend_long.push(long);

    }else{              //some stopcodes that exist in schedule file do not exist in stops file(with coordinates)
      weekend_lat.push("-");
      weekend_long.push("-");
      continue;
    }
  }
  for(var k=0; k <(weekday_stops.length-1);k++){

    const result = Object.values(stops).filter(item => item.code === weekday_stops[k].toString());
    
    if(result.length!=0){
      const lat=Object.entries(result)[0][1].latitude;
      const long=Object.entries(result)[0][1].longitude;
      sc_lat.push(lat);
      sc_long.push(long);

    }else{              //some stopcodes that exist in schedule file do not exist in stops file(with coordinates)
      sc_lat.push("-");
      sc_long.push("-");
      continue;
    }
    
  }
  for(var k=0; k <(hol_stops.length-1);k++){

    const result = Object.values(stops).filter(item => item.code === hol_stops[k].toString());
    
    if(result.length!=0){
      const lat=Object.entries(result)[0][1].latitude;
      const long=Object.entries(result)[0][1].longitude;
      hol_lat.push(lat);
      hol_long.push(long);

    }else{              //some stopcodes that exist in schedule file do not exist in stops file(with coordinates)
      hol_lat.push("-");
      hol_long.push("-");
      continue;
    }
    
  }*/
/*
  */
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


//********************************************************************************************************************************************************************** */
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
	a.setAttribute('download', 'HolidayData.csv');

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

/**
 * ROUTECODE | HOUR | MINUTES -> stopcode | long | lat .... vehicleCode 
 * ta departure kai arrival thw ta pairnw ston xrono
 */
//********************************************************************************************************************************************************************** */
export const get = async function () {
  //changeTime(); -->prosthiki depart and arrival minutes sto time
  //completeRoute();
  let dataWeekday= [];
  let dataWeekend=[];
  let dataHolidays=[];

 /* //WEEKDAY
 for(var i=0; i < weekday_routes.length;i++)
  {
    if(weekday_dayKind[i]==="WEEKDAY"){
      dataWeekday.push({
        "Route":weekday_routes[i],
        "Choosen_hour":weekday_hour[i],
        "Choosen_minutes":weekday_minutes[i],

        "stopCode": weekday_stops[i],
        "stopLat":sc_lat[i],
        "stopLong":sc_long[i],
      })

    }
  }
  if(dataWeekday != null){
    const csvdata1 = csvmaker(dataWeekday);
    download(csvdata1);
  }

*/
//WEEKEND
/*for(var i=0; i < weekend_routes.length;i++)
  {
    
      dataWeekend.push({

        "Route":weekend_routes[i],
        "Choosen_hour":weekend_hour[i],
        "Choosen_minutes":weekend_minutes[i],

        "stopCode": weekend_stops[i],
        "stopLat":weekend_lat[i],
        "stopLong":weekend_long[i],
      })
    
  }
  if(dataWeekend != null){
      const csvdata2 = csvmaker(dataWeekend);
      download(csvdata2);
  }*/

//HOLIDAYS
  for(var i=0; i < hol_routes.length;i++)
  {
      dataHolidays.push({
        
        "Route":hol_routes[i],
        "Choosen_hour":hol_hour[i],
        "Choosen_minutes":hol_minutes[i],

        "stopCode": hol_stops[i],
        "stopLat":hol_lat[i],
        "stopLong":hol_long[i],})
    
    
  }
  
  if(dataHolidays != null){
    const csvdata3 = csvmaker(dataHolidays);
    download(csvdata3);
   }
 

   


}


//************************************************** KWDIKAS POY ISOS XREIASTO ************************************* */

/*                                                    pairnw apo live ta vehicle codes
for(var i=1; i < records.length;i++){
      //if(sroute===records[i][7]){
        var sroute = records[i][7];
        if(!routeOnce.includes(sroute)){
          routeOnce.push(sroute);
          vehicleCodes.set(sroute,records[i][9]);
        }
       
      }

      for(var i=0; i < routeOnce.length;i++){
        console.log("vehicleCodes['"+routeOnce[i]+"']='"+vehicleCodes.get(routeOnce[i])+"';")
      }
*/

/*LIVE

export function setLive(records){                   
 
  for(var i=1; i < records.length;i++){
    if(routeNumbers.includes(records[i][7])){
          // timestamps
          /*const datetime=records[j][14];
          timestamps.push(datetime);

          if(datetime!=undefined){
            const splitTimestamps = datetime.split(" ");
            var date = splitTimestamps[0].split('-');

            //DAYKIND
            if(is_weekend(date)==="holidays"){
               dayKind.push("HOLIDAY");
            }else if(is_weekend(date)==="weekend"){
              dayKind.push("WEEKEND");//to 2022-11-10 einai 10 11(noembri)
            }else{
              dayKind.push("WEEKDAY");
            }
            const month=getMonth(date);
            month.push(month);
          }
          // new info 
          const dMins = records[i][2];
          const aMin = records[i][4];
          
          var timeTogotonextStop = difference(parseInt(departMins),parseInt(aMin))
          arr[records[i][7].toString()+'_'+records[i][8].toString()]+=timeTogotonextStop;

*/
          //departMins.push(dMins);
          //const dSeconds = records[j][3];
          //departSecs.push(dSeconds);
          //arrMins.push(aMin);
          //const aSec = records[j][5];
          //arrSecs.push(aSec);
        
  
    // DATE KAI TIME PRAGMATIKOS
   /*for(var i=0; i < timestamps.length;i++){
      if(timestamps[i]!=undefined){
        const splitTimestamps = timestamps[i].split(" ");
        var date = splitTimestamps[0].split('-');

      //DAYKIND
      if(is_weekend(date)==="holidays"){
        dayKind.push("HOLIDAY");
      }else if(is_weekend(date)==="weekend"){
        dayKind.push("WEEKEND");//to 2022-11-10 einai 10 11(noembri)
      }
      else{
        dayKind.push("WEEKDAY");
      }
      var split_time = splitTimestamps[1].split(":");
      hours.push(split_time[0]);
      minutes.push(split_time[1]);
      //time and month
      time.push(splitTimestamps[1]);
      month.push(getMonth(date));
      }
      
    }
    
      
}*/















/** FUNCTION FOR CHANGING TIME
 * function changeTime(){
  for(var i=0; i < hours.length;i++){
    var min = minutes[i];
    var newMin = min+departMins[i]+arrMins[i];
    if(newMin >= 59){
      //HOUR
      if(hours[i]!=23){
        hours[i] +=1;
      }else{
        hours[i]=00;
      }
      //MINUTES
      if(newMin===59){
        minutes[i]=00;
      }else{
        minutes[i]=newMin-60;
      }
      

    }
  }
}
 * 
 */




/** FUNCTION FOR OLOKLIROSH DROMOLOGIOY(PREPEI NA GINEI MESOS OROS)
 * //start time and finish
const startTime = new Map();
const finishTime = new Map();
var routeNumbers = [105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];

function completeRoute(){
  var scounter=0;
  var fcounter=0;
  for(var i=0; i < routeCodes.length;i++){//routeCodes.length

    var route = routeCodes[i];
    var stop = stopCodes[i];
      
    
    const startPoint =routeStart[route]; // kwdikos prwtis stasis tis diadromis me code routecode
    if(stop != undefined){
        if(startPoint===stop.toString()){

          if(startTime.get(route.toString())!=undefined){
            scounter++;
            startTime.set(scounter+"."+route.toString(),time[i]);
            
          }else{
            startTime.set(route.toString(),time[i]);
          }
          
        }
        
       
        const endPoint =routeEnd[route];// kwdikos teleftaias stasis tis diadromis me code routecode
        if(endPoint===stop.toString()){

          if(finishTime.get(route.toString())!=undefined){
            fcounter++;
            finishTime.set(fcounter+"."+route.toString(),time[i]);
            
          }else{
            finishTime.set(route.toString(),time[i]);
          }

        }
    }
    
  } 
  for(var j=0; j < routeNumbers.length;j++){
    var code = routeNumbers[j].toString();

    var start = startTime.get(code);
    var finish = finishTime.get(code);
    var olokl = finish-start;
  }
  console.log(startTime)
  console.log(finishTime)

}
 */