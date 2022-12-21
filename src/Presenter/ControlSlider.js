import React,{useState} from 'react';
import './Slider.css';
import {exportMap} from './Map';

var ampm;
var hour12;
var h;
function filter(hour){
    
}
function ControlSlider() {
    const sl = document.getElementById('slider');
    if(sl){
        sl.addEventListener('input', (e) => {
            const hour = parseInt(e.target.value);
            //const filter = ['==', ['number', ['get', 'Hour']], 12];
         // update the map
         //exportMap.getMap.setFilter('collisions', ['==', ['number', ['get', 'Hour']], hour]);
            ampm = hour >= 12 ? 'PM' : 'AM';
            hour12 = hour % 12 ? hour % 12 : 12;
            h = hour12+ampm;
            console.log(h);
            // update text in the UI
            document.getElementById('active-hour').innerText = hour12 + ampm;
          });
    }
    
    

    return (

        <div class="info-box">
            <h1> Traffic Data</h1>
            <div class='session' id='sliderbar'>
                <h2>Hour: <label id='active-hour'>12PM</label></h2>
                <input id='slider' class='row' type='range' min='0' max='23' step='1' value='12' />
            </div>
            <div class='session'>
                <h2>Traffic in route</h2>
                <div class='row colors'>
                </div>
                
            </div>

            <div class='session'>
                <h2>Day of the week</h2>
                <div class='row' id='filters'>
                    <input id='all' type='radio' name='toggle' value='all' checked='checked'/>
                    <label for='all'>All</label>
                    <input id='weekday' type='radio' name='toggle' value='weekday'/>
                    <label for='weekday'>Weekday</label>
                    <input id='weekend' type='radio' name='toggle' value='weekend'/>
                    <label for='weekend'>Weekend</label>
                </div>
         </div>
            
        
    </div> 
    );
}

export default ControlSlider;

           
           

            
 /*
 */           
            

            
           
            
