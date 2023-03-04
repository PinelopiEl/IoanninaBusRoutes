import React,{useState} from 'react';
import './max.css';
import routeName from '../files/JS/RouteNames';
var myid;

var lines;
var routes;
var oneroute;
var completion;
var stops;
var pass;
var time;

//helpers
var callLine;
var callRoute;
var callOneRoute;
var callCompl;
var callStops;
var callPass;
var callTime;

export var updateMax = function(){

        if(myid ==="line"){
            const data = lines.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = lines.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            document.getElementById("maxLine").value = maxLabel;
        
        }else if(myid ==="route"){
            const data = routes.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = routes.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            var name = routeName[maxLabel];
            document.getElementById("maxRoute").value = name;
        }else if(myid ==="oneroute"){
            const data = oneroute.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = oneroute.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            var name = routeName[maxLabel];
            if(maxLabel===undefined){
                document.getElementById("maxChRoute").value = "No data yet, choose line";
            }else{
                document.getElementById("maxChRoute").value = name;
            }
        }else if(myid ==="completion"){
            const data = completion.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = completion.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            var name = routeName[maxLabel];
            if(maxLabel===undefined){
                document.getElementById("maxCompl").value = "No data yet, choose route";
            }else{
                document.getElementById("maxCompl").value = name;
            }
        }else if(myid ==="stops"){
            const data = stops.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = stops.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            if(maxLabel===undefined){
                document.getElementById("maxStops").value = "No data yet, choose route";
            }else{
                document.getElementById("maxStops").value = maxLabel;
            }
        }else if(myid ==="pass"){
            const data = pass.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = pass.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            if(maxLabel===undefined){
                document.getElementById("maxPass").value = "No data yet, choose route";
            }else{
                document.getElementById("maxPass").value = maxLabel;
            }
        }else if(myid ==="time"){
            const data = time.datasets[0].data;
            const maxVal = data.length > 0 ? Math.max(...data) : 0;
            const labels = time.labels;
            const maxIndex = data.indexOf(maxVal.toString());
            const maxLabel = labels[maxIndex];
            if(maxLabel===undefined){
                document.getElementById("maxTime").value = "No data yet, choose route";
            }else{
                document.getElementById("maxTime").value = maxLabel;
            }
        }
}

export async function showMax(array,id){
    
    myid=id;

    if(myid ==="line"){
        lines=array;
        callLine();
    }else if(myid ==="route"){
        routes=array;
        callRoute();
    }else if(myid ==="oneroute"){
        oneroute=array;
        callOneRoute();
    }else if(myid ==="completion"){
        completion=array;
        callCompl();
    }else if(myid ==="stops"){
        stops=array;
        callStops();
    }else if(myid ==="pass"){
        pass=array;
        callPass();
    }else if(myid ==="time"){
        time=array;
        callTime();
    }
}

const MaxCounter = () => {
   

    callLine = function(){
        var menu = document.getElementById('menu');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
       
        updateMax();
    }
    callRoute = function(){
        var menu = document.getElementById('menu2');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
       
        updateMax();
    }

    callOneRoute = function(){
        var menu = document.getElementById('menu3');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
       
        updateMax();
    }
    callCompl=function(){
        var menu = document.getElementById('menu4');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
        updateMax();
    }

    callStops= function(){
        var menu = document.getElementById('menu5');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
        updateMax();
    }
    callPass= function(){
        var menu = document.getElementById('menu6');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
        updateMax();
    }
    callTime= function(){
        var menu = document.getElementById('menu7');
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
        updateMax();
    }

    return (
        <div>
            <div class="max-box" id="menu" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Line with max mean delay: </label>
                    <input type="text" id="maxLine" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>

            <div class="max-box2" id="menu2" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Route with max mean delay: </label>
                    <input type="text" id="maxRoute" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>

            <div class="max-box3" id="menu3" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Route of choosen line with max mean delay: </label>
                    <input type="text" id="maxChRoute" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>
            <div class="max-box4" id="menu4" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max">Route with MAX mean completion time: </label>
                    <input type="text" id="maxCompl" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>

            <div class="max-box5" id="menu5" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Stop of choosen route with max delay:</label>
                    <input type="text" id="maxStops" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>
            <div class="max-box6" id="menu6" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Stop with max passengers:</label>
                    <input type="text" id="maxPass" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>
            <div class="max-box7" id="menu7" style={{ display: 'none' }}>
                <div class='session'>
                    <label for="Max Line">Stop code with Max time to arrive at next stop:</label>
                    <input type="text" id="maxTime" name="fname" value=" " class="resizedTextbox"></input>
                </div>
            </div>
        </div>
    );
};
export default MaxCounter;