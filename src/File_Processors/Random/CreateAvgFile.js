import React from 'react';
import Papa from 'papaparse';
import tripsCsv from './try.csv';



/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;

/* vars for computing avgTime*/
var aday,avgTime;


/* vars holding data from trips.csv */

var keys=[];
var delay=[];
var pas=[];




export function setTrips(records){

  for(var t=1; t < records.length;t++)
  {
    keys.push(records[t][0]);
    delay.push(records[t][1]);
    pas.push(records[t][2]);

  }
  
  const samedate = "2022-11-10";

  let datatrips =[];
  var avgArray ={};
  var avgCounters={};


  for(var i=0; i <records.length;i++)
  {
      avgArray[keys[i]] =0;
      avgCounters[keys[i] ] =0;
    
          
  }
  for(var i=0; i <records.length;i++)
  {
      
      avgArray[keys[i]] += delay[i];
      avgCounters[keys[i]] +=1;
      }
      
      for (const key in avgCounters) {
        const value = Math.round(avgArray[key]/avgCounters[key]);
        datatrips.push({
          "avgDelay" :"avg["+ key.toString() +"]="+"'"+value+"\';" });
      }
      
  const csvdata = csvmaker(datatrips);
  download(csvdata);
  
}


export function getTrips(callBack)
{
 Papa.parse(tripsCsv,  { download: true, dynamicTyping: true, complete: function (input) {
                        callBack(input.data);} });
   
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
	a.setAttribute('download', 'tripscsv.csv');

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

