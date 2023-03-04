import React from 'react';
import scheduleCsv from '../files/original/schedule.csv';
import start_end_stops from '../files/JS/start_end_routes.js';
import Papa from 'papaparse';

/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;



export function setSchedule(records){
  let dataf=[];
  let datal=[];
  
  for (var key in start_end_stops){
  
    var sts=[];
    sts =typeof start_end_stops?.[key] === 'string' ?start_end_stops[key].split(',') : '';
    for(var j=1; j < records.length;j++){
    
      if( key==records[j][2] && sts[0]==records[j][3] ){
        var sp=[];
        sp =typeof records?.[j][5] === 'string' ?records[j][5].split(':') : '';
        dataf.push({"First" :"first[\'"+ key +'_'+sp[0]+"\']="+"'"+records[j][5]+"\';" });
        sp.pop();
      }
      else if ( key== records[j][2] && sts[1]==records[j][3] )
      {
        var sp2=[];
        sp2 =typeof records?.[j][5] === 'string' ?records[j][5].split(':') : '';
        datal.push({"Last" :"last[\'"+ key +'_'+sp2[0]+"\']="+"'"+records[j][5]+"\';" });
        sp2.pop();
      }
    }
  }
  const csvdata = csvmaker(dataf);
  download(csvdata);
  const csvdata2 = csvmaker(datal);
  download(csvdata2);
}


export function getSchedule(callBack)
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



