import React from 'react';
import schedWeekend from '../../files/CSV/Final Files Schedule/ScheduleHolidays.csv';
import Papa from 'papaparse';

import start_end_stops from '../../files/JS/start_end_routes.js';

/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;


/* routeCodes of each line used more from studennts in uoi */
var line16 =[1602,1609,1620,1626,1633,1637,1638,1641,1601,1619,1625,1631,1632,1636,1640,2133];
var line17 = [1702,1706,1712,2121,3000,3002,3015,3017,1707,1711,2110,2129,3001,3003,3012,3018];

/**********************************************************
*Returns a random number between min and max (both included) 
***********************************************************/
function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function setSchedule(records){
  let data=[];

  for(var i=1; i < records.length;i++){
    // if the line is 16 or 17
    if (line16.includes(records[i][0]) || line17.includes(records[i][0])) {
       
         // if   8<= hour <=10 , means its morning very busy time ,everyone goes at work
        if( records[i][2]<=10 && records[i][2]>=8 ){
            var numOfPassengers = getRnd(5, 40);

            if(records[i][3]<55)
            {

                if(records[i][0]==records[i+1][0] && records[i][2]==records[i+1][2]  ){
                    var diff_mins = records[i+1][3]-records[i][3];
                    if(diff_mins>1){
                        var delaytime = getRnd(1,diff_mins-1);
                    }else{
                        var delaytime =0;
                    }
                    
                }
                else
                {
                    var delaytime =0;
                }
            }else{
                var delaytime =0;
            }

            
            
        }else{
            var numOfPassengers = getRnd(0, 35);
            if(records[i][3]<55)
            {

                if(records[i][0]==records[i+1][0] && records[i][2]==records[i+1][2]  ){
                    var diff_mins = records[i+1][3]-records[i][3];
                    if(diff_mins>2){
                        var delaytime = getRnd(1,diff_mins-2);
                    }else{
                        var delaytime =0;
                    }
                }
                else
                {
                    var delaytime =0;
                }
            }else{
                var delaytime =0;
            }
        }
	    var str=[];
    	str =typeof start_end_stops?.[records[i][0]] === 'string' ?start_end_stops[records[i][0]].split(',') : '';
	    if(records[i][1]!=str[0]){
    		//routeCode_stopCode_hour_day = delay,numpassengers
        	data.push({
            	"delay" :"delay["+ "'"+records[i][0]+'_'+records[i][1]+'_'+records[i][2]+'_' +"'"+"]="+"'"+delaytime+','+numOfPassengers+"\';" });
	 	
    	}else{
		//routeCode_stopCode_hour_day = delay,numpassengers
        	data.push({
            	"delay" :"delay["+ "'"+records[i][0]+'_'+records[i][1]+'_'+records[i][2]+'_' +"'"+"]="+"'"+0+','+numOfPassengers+"\';" });
	 	}
	
     }else{//not 16 or 17

        // if   8<= hour <=10 , means its morning very busy time ,everyone goes at work
        if( records[i][2]<=10 && records[i][2]>=8 ){
            var numOfPassengers = getRnd(3, 35);
            if(records[i][3]<55)
            {

                if(records[i][0]==records[i+1][0] && records[i][2]==records[i+1][2]  ){
                    var diff_mins = records[i+1][3]-records[i][3];
                    if(diff_mins>1){
                        var delaytime = getRnd(1,diff_mins-1);
                    }else{
                        var delaytime =0;
                    }
                    
                }
                else
                {
                    var delaytime =0;
                }
            }else{
                var delaytime =0;
            }
        }else{
            var numOfPassengers = getRnd(0, 20);
            if(records[i][3]<55)
            {

                if(records[i][0]==records[i+1][0] && records[i][2]==records[i+1][2]  ){
                    var diff_mins = records[i+1][3]-records[i][3];
                    if(diff_mins>2){
                        var delaytime = getRnd(1,diff_mins-2);
                    }else{
                        var delaytime =0;
                    }
                    
                }
                else
                {
                    var delaytime =0;
                }
            }else{
                var delaytime =0;
            }
        }
	    var str=[];
    	str =typeof start_end_stops?.[records[i][0]] === 'string' ?start_end_stops[records[i][0]].split(',') : '';
	    if(records[i][1]!=str[0]){
    		//routeCode_stopCode_hour = delay,numpassengers
        	data.push({
            	"delay" :"delay["+ "'"+records[i][0]+'_'+records[i][1]+'_'+records[i][2]+'_' +"'"+"]="+"'"+delaytime+','+numOfPassengers+"\';" });
	 	
    	}else{
		//routeCode_stopCode_hour = delay,numpassengers
        	data.push({
            	"delay" :"delay["+ "'"+records[i][0]+'_'+records[i][1]+'_'+records[i][2]+'_' +"'"+"]="+"'"+0+','+numOfPassengers+"\';" });
	 	}
                 
       

    }
  }


  const csvdata2 = csvmaker(data);
  download(csvdata2);
}


export function getSchedule(callBack)
{
 
   Papa.parse(schedWeekend, 
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
const download = function (data) 
{

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
	a.setAttribute('download', 'delay_Holiday.csv');

	// Performing a download with click
	a.click()
}

/**
 ******************************
 *    CREATE CSV FILE
 ******************************
 */
const csvmaker = function (data) 
{

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
        for (const row of data) 
        {
            const values = headers.map(header => 
            {
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



