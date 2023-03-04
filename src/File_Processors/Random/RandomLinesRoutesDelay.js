import lineRoutes from '../files/JS/LinesRoutes.js';
import routesD from '../files/JS/RoutesDelay.js';

import Papa from 'papaparse';
/* holding the output data */
var csvRows;

var lineNumbers = [1732, 1730, 1722, 1726, 1729, 1728, 1737, 1734, 1727, 1724, 1731, 1736, 1723, 1733, 1725, 1735];
var line16 =[1602,1609,1620,1626,1633,1637,1638,1641,1601,1619,1625,1631,1632,1636,1640,2133];
var line17 = [1702,1706,1712,2121,3000,3002,3015,3017,1707,1711,2110,2129,3001,3003,3012,3018];

var routesDelay=[];
var linesDelay=[];
var linesMaxArr=[];
var finalRoutes=[];

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function routeDelay(){
    for(var i=0;i<lineNumbers.length;i++){
        var routes = lineRoutes[lineNumbers[i]];
        var splitted = routes.split(",");
       
        for(var j=0;j<splitted.length;j++){
            var routeNum=splitted[j];
            if(line16.includes(routeNum) || line17.includes(routeNum) ){
                var delaytime = getRnd(10,70);
                routesDelay.push({
                    "routeDelay" :"routeDelay['"+lineNumbers[i]+"_"+routeNum+"'"+"]="+"'"+delaytime+"\';" });
                
            }else{
                var delaytime = getRnd(10,30);
                routesDelay.push({
                    "routeDelay" :"routeDelay["+ "'"+lineNumbers[i]+"_"+routeNum+"'"+"]="+"'"+delaytime+"\';" });
                
            }
        }
    }
    const csvdata2 = csvmaker(routesDelay);
    download(csvdata2);
}

export function lineDelay(){
    var add;
    var count;
    var avgDelay;
    for(var i=0;i<lineNumbers.length;i++){
        var routes = lineRoutes[lineNumbers[i]];
        var splitted = routes.split(",");
        add=0;
        count=0;
        avgDelay=0;
        for(var j=0;j<splitted.length;j++){
            var routeNum=splitted[j];

            var value = routesD[lineNumbers[i]+"_"+routeNum];
            console.log(value);
            add += parseInt(value);
            count++;
        }
        console.log(add)
        avgDelay = Math.round(add/count);
        linesDelay.push({
            "routeDelay" :"routeDelay["+ "'"+lineNumbers[i]+"'"+"]="+"'"+avgDelay+"\';" });
    }


    const csvdata2 = csvmaker(linesDelay);
    download(csvdata2);
}

export function linesMaxDelay(){
    var maxValue;
    for(var i=0;i<lineNumbers.length;i++){
        var routes = lineRoutes[lineNumbers[i]];
        var splitted = routes.split(",");
        var maxValue=0;

        for(var j=0;j<splitted.length;j++){
            var routeNum=splitted[j];
            var value = routesD[lineNumbers[i]+"_"+routeNum];
            if(maxValue<value){
                maxValue=value;
            }
        }

        linesMaxArr.push({
            "linesMaxDelay" :"linesMaxDelay["+ "'"+lineNumbers[i]+"'"+"]="+"'"+maxValue+"\';" });
    }


    const csvdata2 = csvmaker(linesMaxArr);
    download(csvdata2);
}

export function finalrouteDelay(){
    for(var i=0;i<lineNumbers.length;i++){
        var routes = lineRoutes[lineNumbers[i]];
        var splitted = routes.split(",");
       
        for(var j=0;j<splitted.length;j++){
            var routeNum=splitted[j];
            if(line16.includes(routeNum) || line17.includes(routeNum) ){
                var delaytime = getRnd(10,70);
                finalRoutes.push({
                    "routeDelay" :"routeDelay['"+routeNum+"'"+"]="+"'"+delaytime+"\';" });
                
            }else{
                var delaytime = getRnd(10,30);
                finalRoutes.push({
                    "routeDelay" :"routeDelay["+ "'"+routeNum+"'"+"]="+"'"+delaytime+"\';" });
                
            }
        }
    }
    const csvdata2 = csvmaker(finalRoutes);
    download(csvdata2);
}

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
     a.setAttribute('download', 'LinesMaxDelay.csv');
 
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