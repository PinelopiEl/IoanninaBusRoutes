import React, {useEffect, useState} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './color.css';

import { setWay } from '../Presenter/Map.js';

import lineFile from '../files/JS/LinesRoutes';
import lineNames from '../files/JS/LineNames';
import namesFile from '../files/JS/RouteNames';

/************* VARIABLES ********************* */
let linecode = '0';
//let varcodes; //routes of the line user chose
var names = []; //route dropdown menu
var codes = [];
var namesToCodes = []; //codes related to names
var select; //filling route dropdown
var globalLineCode;


//send route and line name to Map.js
async function sendMap(code) {
  var linenum = lineNames[linecode];
  if (code != undefined) {
    setWay(parseInt(code), parseInt(linenum), globalLineCode);
  }
}

//Remove options before adding new names
function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function takeRouteName(linecode) {
  if (linecode != '0') {

    let rcodes = lineFile[linecode];
    var varcodes = rcodes.split(',');

    if (codes != []) {
      codes = [];
    }

    for (var j = 0; j < varcodes.length; j++) {
      codes.push(varcodes[j])
    }
    
    if (names != []) {
      names = [];
    }
    names.push("Choose ROUTE")

    if (namesToCodes != []) {
      namesToCodes = [];
    }

    namesToCodes.push("0")

    for (var i = 0; i < codes.length; i++) {
      names.push(namesFile[codes[i]]);
      namesToCodes.push(codes[i])
    }

    //-------------------------------- Fill dropdown with routes of the choosen line
    select = document.getElementById("selectRoute");

    removeOptions(document.getElementById("selectRoute"));
    for (var i = 0; i < names.length; i++) {
      var opt = names[i];
      //Gemizw to options tou html
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

    //get route menu changes
    getText();
  }
}

var getText = function () {

  var e = document.getElementById("selectRoute");

  function onChange() {
    var value = e.value;
    var text = e.options[e.selectedIndex].text;

    //phgaine bres ton kwdiko toy route gia thn epilogh
    for (var i = 0; i < names.length; i++) {
      if (names[i] == text) {
        sendMap(namesToCodes[i]); //go to map and update route
        return;
      }
    }

  }
  e.onchange = onChange;
  onChange();
}

const SideMenu = () => {

  const [code, setCode] = useState(0);

  useEffect(() => {
    globalLineCode=code;
    linecode = code;
    takeRouteName(linecode);
  }, [code]);

  return (
    <div style={{ display: 'flex', height: '545vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#36454F" backgroundColor="#5cbdb9" align='left' >

        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" style={{ marginRight: '-100px' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Ioannina Bus Routes
          </a>
        </CDBSidebarHeader>
        <br></br>


        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <h3>
              Choose Line and Route:
            </h3>

            <NavLink exact to="/" activeClassName="activeClicked">
            </NavLink>
            <div style={{ display: 'flex', width: 80, padding: '20px' }}>

              <Dropdown textColor="black">
                <select id="selectLine" style={{ textAlign: 'center', display: 'flex', height: 40, width: 240, backgroundColor: '#F0FFF0' }} onChange={(event) => setCode(event.target.value)}>
                  <option backgroundColor="#fbc40e" value='0' > LINES </option>
                  <option backgroundColor="#fbc40e" value='1732'>01:ΛΟΓΓΑΔΕΣ-ΧΑΡΟΚΟΠΙ</option>
                  <option backgroundColor="#fbc40e" value='1723'>02:ΕΛΕΟΥΣΑ-ΠΑΝΕΠΙΣΤΗΜΙΟ</option>
                  <option backgroundColor="#fbc40e" value='1730'>03:ΚΟΥΤΣΕΛΙΟ-ΜΟΥΖΑΚΕΟΙ</option>
                  <option backgroundColor="#fbc40e" value='1726'>04:ΠΕΡΙΒΛΕΠΤΟΣ-ΚΡΥΑ</option>
                  <option backgroundColor="#fbc40e" value='1729'>05:ΜΠΑΦΡΑ-ΝΕΑ ΖΩΗ</option>
                  <option backgroundColor="#fbc40e" value='1728'>06:ΠΕΔΙΝΗ-ΠΑΝΕΣΤΗΜΙΟ</option>
                  <option backgroundColor="#fbc40e" value='1722'>07:ΑΝΑΤΟΛΗ</option>
                  <option backgroundColor="#fbc40e" value='1737'>08:ΑΝΑΤΟΛΗ-ΚΑΤΣΙΚΑ</option>
                  <option backgroundColor="#fbc40e" value='1734'>09:ΕΡΓΑΤΙΚΕΣ ΚΑΤΟΙΚΙΕΣ-ΝΕΟΧΩΡΟΠΟΥΛΟ</option>
                  <option backgroundColor="#fbc40e" value='1727'>10:ΝΟΣΟΚΟΜΕΙΟ ΧΑΤΖΗΚΩΣΤΑ ΚΑΡΔΑΜΙΤΣΙΑ ΑΝΑΤΟΛΗ ΤΕΙ ΠΑΝΕΠΙΣΤΗΙΜΙΟ</option>
                  <option backgroundColor="#fbc40e" value='1733'>12:ΜΑΡΜΑΡΑ-ΣΤΑΥΡΑΚΗ</option>
                  <option backgroundColor="#fbc40e" value='1735'>13:ΛΑΨΙΣΤΑ-ΠΑΝΕΠΙΣΤΗΜΙΟ</option>
                  <option backgroundColor="#fbc40e" value='1731'>15:ΕΛΛΗΝΙΚΟ-ΧΑΝΙ</option>
                  <option backgroundColor="#fbc40e" value='1725'>16:ΠΑΝΕΠΙΣΤΗΜΙΟ-ΑΜΦΙΘΕΑ</option>
                  <option backgroundColor="#fbc40e" value='1724'>17:ΝΕΑ ΖΩΗ-ΠΑΝΕΠΙΣΤΗΜΙΟ</option>
                  <option backgroundColor="#fbc40e" value='1736'>21:ΔΡΟΣΙΑ</option>
                </select>

              </Dropdown>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>


        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <NavLink exact to="/" activeClassName="activeClicked">
            </NavLink>


            <div style={{
              display: 'in-line',
              width: 100,
              padding: '20px',
              marginTop: 300
            }}>

              <Dropdown textColor="black">
                <select id="selectRoute" style={{ textAlign: 'center', display: 'flex', height: 40, width: 200, backgroundColor: '#F0FFF0', marginTop: -2200, }}>

                  <option backgroundColor="#fbc40e" selected="selected"> ROUTE </option>
                </select>

              </Dropdown>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>



        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >

          </div>
        </CDBSidebarFooter>
      </CDBSidebar>



    </div>
  );
};

export default SideMenu;
