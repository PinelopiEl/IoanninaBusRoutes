import './App.css';
import sf from '../files/JS/Schedule/final_sched_first'
import sl from '../files/JS/Schedule/final_sched_last'



export var printSchedule= function (chosenRoute) {

     for(var day=0 ;day < 7 ;day++){
          var start_times="";
          var keyStart;
          for(var time=0 ; time < 24 ;time++){
               keyStart = chosenRoute +'_'+ day + "_" + time;
               if(sf[keyStart]!==undefined){
                    if(start_times===""){
                         start_times += sf[keyStart];
                    }else{
                         start_times += ","+sf[keyStart];
                    }
               }
          }

          if(start_times==""){
              document.getElementById(day).value = "No Routes Available" ;
               
          }else{
               document.getElementById(day).value = start_times;
          }
               
     }
     

}

function Timetable() {
   const routecc =[105, 106, 108, 109, 110, 111, 112, 201, 202, 203, 207, 219, 221, 225, 228, 234, 3004, 3010, 3016, 309, 401, 402, 403, 503, 504, 508, 604, 610, 702, 801, 804, 807, 905, 907, 908, 1002, 1004, 1012, 1017, 1019, 1021, 1024, 1028, 1201, 1202, 1312, 1502, 1503, 1602, 1609, 1620, 1626, 1633, 1637, 1638, 1641, 1702, 1706, 1712, 220, 222, 224, 226, 227, 229, 230, 2104, 3006, 3007, 3013, 301, 302, 2123, 404, 502, 507, 2112, 605, 2121, 3000, 3002, 3015, 3017, 2102, 2103, 2117, 701, 704, 802, 803, 805, 806, 808, 906, 1001, 1003, 1006, 1013, 1015, 1018,, 1020, 1022, 1023, 1027, 1029, 1309, 1315, 1501, 1601, 1619, 1625, 1631, 1632, 1636, 1640, 2133, 1707, 1711, 2110, 2129, 3001, 3003, 3012, 3018];
   
   var chosenRoute = routecc[3];
   var day = 1;
   var start_times="";
   var keyStart;
 
   var end_times="";
   var keyEnd;
   
   return (
        


    <div class="sched-box">
        <h2> <p>TimeTable</p> </h2>  
        <label for="Departures">MONDAY: </label>
        <input type="text" id="1" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">TUESDAY: </label>
        <input type="text" id="2" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">WEDNESDAY: </label>
        <input type="text" id="3" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">THURSDAY: </label>
        <input type="text" id="4" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">FRIDAY: </label>
        <input type="text" id="5" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">SATURDAY: </label>
        <input type="text" id="6" name="fname" value=" " class="resizedTextbox"></input>
        <h1></h1>
        <label for="Departures">SUNDAY: </label>
        <input type="text" id="0" name="fname" value=" " class="resizedTextbox"></input>
    </div>


    

);
         
       
 }
 
 export default Timetable;