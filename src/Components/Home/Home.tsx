import React, { FC, useEffect, useState,useContext } from "react";
import Table from "react-bootstrap/esm/Table";
import Spinner from "react-bootstrap/esm/Spinner";
import { useSelector } from "react-redux";
import { CounterState } from "../Redux/Reducers/createSlice";



const Home: FC = () => {
  const audit = useSelector((state:CounterState) => state.audit)
  
  return (
    <div style={{ padding: "20px" }}>
    
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Caller</th>
              <th>Created</th>              
              <th>Short Description</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          {audit?.map((item, index) => (
              <tr key={index}>
                <td>{item.incidentNumber}</td>
                <td>{item.caller}</td>
                <td>{item.created}</td>                
                <td>{item.descNonConformity}</td>                
                <td>{item.ncrStatus}</td>
              </tr>
            ))}
        </Table>
    </div>
  );
};

export default Home;

