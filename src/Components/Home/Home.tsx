import { FC, useEffect, useCallback, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { useSelector } from "react-redux";
import { CounterState } from "../Redux/Reducers/createSlice";
import Incident, { Audit } from "../Incident/Incident";
import { TicketApi } from "../../Services/TicketApi";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";



const Home: FC = () => {
  const uid = useSelector((state:CounterState) => state.uid);
  const [ticketList, setTicketList] = useState<Audit[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const fetchData = useCallback(async () =>  {
    try {
        setIsDataFetched(true);
        setError(false);
        const ticketsResponse = await TicketApi.getAllTicket(uid);
        setTicketList(ticketsResponse);
        setIsDataFetched(false);
    } catch (e) {
        setError(true);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div style={{ padding: "20px" }}>
      {isDataFetched ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Caller</th>
              <th>Created</th>              
              <th>Short Description</th>              
              <th>Status</th>
            </tr>
          </thead>
          {ticketList?.map((item, index) => (
              <tr key={index}>
                
                <td> <Link to={`/incident/${item.incidentNumber}`} state={{incident: ticketList}}>{item.incidentNumber}</Link></td>
                <td>{item.auditor}</td>
                <td>{item.ncrCreationDate}</td>                              
                <td>{item.descNonConformity}</td>                
                <td>{item.ncrStatus}</td>
              </tr>
            ))}
        </Table>
      )}
    </div>
  );
};

export default Home;

