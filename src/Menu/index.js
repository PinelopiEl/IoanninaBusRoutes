import React,{useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './Style';

import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';

const Navbar = () => {
  

  return (
    <>
    <Nav>
    <img src={logo}/>
    <Bars />
    

    <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/find' activeStyle>
            Find
          </NavLink>
          <NavLink to='/standby' activeStyle>
            Stand By
          </NavLink>
          
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign in
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    </NavMenu>

        
      </Nav>
    </>
  );
};
export default Navbar;
/*<NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>*/