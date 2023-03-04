import React from 'react';
import routeCsv from '../files/original/route.csv';
import Papa from 'papaparse';
// Creates start_end_routes.js file, [routecode]='startStopcode,finishStopCode'
/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;
var first =[];
var last =[];
var rcode=[];set_Start_End


export function set_Start_End(records){

  for(var j=1; j < records.length;j++)
  {
    rcode.push(records[j][1]);
    var sts=[];

    sts =typeof records?.[j][6] === 'string' ?records[j][6].split(',') : '';
    first.push(sts[0]);
    
    if(Array.isArray(sts)){
      last.push(sts.pop());
    }else{
        console.log("Given data is not an array")
    }
  }
  let datar=[];
  for (var i=0;i<records.length;i++) {
    datar.push({
      "startend" :"st_sp[\'"+ rcode[i] +"\']="+"'"+ first[i]+','+ last[i]+"\';" });
  }
  const csvdata = csvmaker(datar);
  download(csvdata);
}


export function getRoute(callBack)
{
 
   Papa.parse(routeCsv, 
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
	a.setAttribute('download', 'download.csv');

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

