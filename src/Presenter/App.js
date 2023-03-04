import './App.css';
import React from 'react';
import Mapp from './Map';
import TopNavigator from '../Menu/TopNavigator';
import ControlSlider from './ControlSlider';
import OpenChart from '../Charts/OpenChart';
import Timetable from './Timetable';
import Proposals from './Proposals';
import MaxCounter from '../Charts/MaxValues';

function App() {
  //alert("Welcome to IoanninaBusRoute!\n Select the line and route you desire to analyze.\n You can consult the first two charts at the buttom of the page");
  return (
    <div style=
    {{
          backgroundColor: '#c5f7f5',
          width: '100%',
          height: '6000px'
    }}>
    
    {/* display the gui sidebars and nav bars */}
      <TopNavigator/>
      <Mapp/>
      <OpenChart/>
    {/* handling user input from sliders and buttons */}
      <ControlSlider/>
    {/* handling schedule data */}
      <Timetable/>
    {/* handling schedule data */}
      <Proposals/>
    {/* display map and functionality of bus symbols,route etc. */}
      <MaxCounter/>
      
    </div>
  );
}

export default App;

//<MaxCounter/>