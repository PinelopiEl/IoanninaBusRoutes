import React from 'react';
import mpass from '../files/JS/MeanPassengers/mPass_hol_3_4';
import Papa from 'papaparse';
import sch from '../files/Original_Files/lines.csv';

/**
 **********************
 * INIT GLOBAL VARS
**********************
*/


/* holding the output data */
var csvRows;


/* routeCodes of each line used more from studennts in uoi */
var line16 =[1602,1609,1620,1626,1633,1637,16381641,1601,1619,1625,1631,1632,1636,1640,2133];
var line17 = [1702,1706,1712,2121,3000,3002,3015,3017,1707,1711,2110,2129,3001,3003,3012,3018];
/**********************************************************
*Returns a random number between min and max (both included) 
***********************************************************/
function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var single = 50;
var double = 100 ;

export function setS(records){
  let data=[];

  for (const key in mpass) {
    if(parseInt(mpass[key])>50){
        data.push({
            "veh_code_capacity" :"veh_code_capacity["+ key.toString() +"]="+"'"+ double +"\';" });
    }else{
        data.push({
            "veh_code_capacity" :"veh_code_capacity["+ key.toString() +"]="+"'"+ single +"\';" });
    }


  }
  
  const csvdata2 = csvmaker(data);
  download(csvdata2);
}


export function getS(callBack)
{
 
   Papa.parse(sch, 
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
	a.setAttribute('download', 'vehicle_cap_hol.csv');

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



