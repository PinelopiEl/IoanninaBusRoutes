import React from 'react';
//FOR NAVBAR (MENU ON TOP OF WEB PAGE)
import Navbar from './index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Login from './pages/signup';

import Find from './pages/find';
import StandBy from './pages/standby';
import Display from './pages/display';

import SideMenu from './SideMenu';
function TopNav(){
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={Home} />
            
            
          </Routes>
          
        <SideMenu/>
        </Router>
       
      );
}
export default TopNav; 
//<Route path='/sign-up' element={Login} />