import { Route, Routes } from 'react-router-dom';
import React, { useState} from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Incident from '../Incident/Incident';

function App() {
  return (    
      <BrowserRouter>
        <NavBar />
        <div id="root-content">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/createincident" element={<Incident />} />
          </Routes>
        </div>
      </BrowserRouter>
 
  );
}

export default App;
