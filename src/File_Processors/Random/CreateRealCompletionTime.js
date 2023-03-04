import React from 'react';
import schedWeekend from '../files/CSV/Final Files Schedule/ScheduleHolidays.csv';
import Papa from 'papaparse';

import avgDelay from '../files/JS/AvgDelayRoutes/AvgDelayRoute_hol_3_4';
import completion_time from '../files/JS/Schedule/completion_time_holidays';


/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;


export function setComp(records){
  let data=[];

  for (const key in completion_time) {
        var duration = parseInt(completion_time[key])+ parseInt(avgDelay[key]);
        data.push({
            "real_completion_time" :"real_completion_time["+ "'"+key.toString() + "'"+"]="+"'"+duration+"\';" });
    

  }
  
  const csvdata2 = csvmaker(data);
  download(csvdata2);
}


export function getComp(callBack)
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
	a.setAttribute('download', 'real_completion_hol34.csv');

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



