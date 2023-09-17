import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CounterState } from '../Redux/Reducers/createSlice';

interface NavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavBar: FC<NavProps> = ({ isAuthenticated, onLogout }) => {
  const auditor = useSelector((state:CounterState) => state.auditor);
  return(
  <Navbar expand="lg" bg="primary" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">
        Audit
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-3 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          { 
            <Nav.Link as={Link} to="/incident">
              Create Incident
            </Nav.Link>
          }
        </Nav>
        {isAuthenticated ? (
          <Button variant="outline-light" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Form className="d-flex">
            <Button variant="outline-light" as={Link as any} to="/">
              Login
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavBar;
