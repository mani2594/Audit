import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useState} from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Incident from '../Incident/Incident';
import Login from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { CounterState, RemoveuserId } from '../Redux/Reducers/createSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state:CounterState) => state.isAuthenticated);
  const auditor = useSelector((state:CounterState) => state.auditor);
  const handleLogout = () => {    
    dispatch(RemoveuserId());    
  };
  
  return (    
      <BrowserRouter>
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />        
        <div id="root-content">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" replace />
          }
        />
        {auditor && 
          <Route
            path="/incident/:ticketNumber?"
            element={
              isAuthenticated ? <Incident /> : <Navigate to="/" replace />
            }
          />
        }
          </Routes>
        
        </div>
      </BrowserRouter>
 
  );
}

export default App;
