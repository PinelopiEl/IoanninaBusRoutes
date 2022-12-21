import './App.css';
import React,{useState} from 'react';

import Mapp from './Map';
import ControlSlider from './ControlSlider';
import TopNavigator from '../Menu/TopNavigator';

function App() {
    

    return (
	    <div style={{backgroundColor: '#A52A2A'}}>
        <TopNavigator/>
        <br></br>
        
        <Mapp/>
        <ControlSlider/>
        <br></br>
        <br></br>
        <br></br>
        <a></a>
        
        
	    </div>
    );
}

export default App;
