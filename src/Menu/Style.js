//Ola gia to top menu
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';


//afora to navbar(dld to top bar)
export const Nav = styled.nav`
  background: #5cbdb9;
  height: 85px;
  padding:5px;
  display: flex;
  justify-content:space-evenly;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
  
export const NavLink = styled(Link)`
  color:  #5cbdb9;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color:  #5cbdb9;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
//gia grammata panw orizontia 
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  

//koumpi signin
export const NavBtn = styled.nav`
  
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
//koumpi sign in mesa
export const NavBtnLink = styled(Link)`
   
  border-radius: 4px;
  background:  #5cbdb9;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #59deff;
    color: rgb(19, 33, 97);
  }
`;
//teleiwse kwdikas gia top menu

//to eikonidio gia na anoijei to sidebar
export const NavIcon = styled(Link)`
  margin-top: 4p
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

//afora to sidebar
export const SidebarNav = styled.nav`
  background: #5cbdb9;
  width: 250px;
  heigth:50%;
  overflow-y: ;
  display: flex;
  justify-content: center;
  position: ;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '-20' : '-100vw')};
  
  transition: 350ms;
  z-index: 30;
`;
//to width toy sidebar132
export const SidebarWrap = styled.div`
  width: 40%;
`;

/*Submenu*/
//xrwma thesi ktl toy display route kai create chart
export const SidebarLink = styled(Link)`
  display: flex;
  color: #5cbdb9;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background:#023020;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;
export const DropdownLink = styled(Link)`
  background: #black;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  color: #f34c19;
  font-size: 18px;
  &:hover {
    background: #023020;
    cursor: pointer;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 16px;
`;


//BUTTON
export const Button = styled.button`
  background: #a48888;
  border: #a48888;
  height: 40px;
  display: flex;
  align-items: center;
  margin-right: 24px;
 
  @media screen and (max-width: 768px) {
    display: none;
  }
`;