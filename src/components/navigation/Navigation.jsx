import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import NewEventForm from "../forms/newEvent/NewEventForm";
import { useDispatch, useSelector } from "react-redux";
import { offCanvasActions } from "../../../redux/slices/offCanvasSlice";
import { authActions } from "../../../redux/slices/authSlice";
import { currentUser } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { timelineActions } from "../../../redux/slices/timelineSlice";
import { createTimeline } from "../../../redux/actions/timelineActions";

function Navigation() {
  const [show, setShow] = useState(false);
  const userLoggedin = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const showOffCanvas = useSelector((state) => state.offCanvas.open);
  const handleClose = () =>
    dispatch(offCanvasActions.showOffCanvas({ open: false }));

  const handleShow = () =>
    dispatch(offCanvasActions.showOffCanvas({ open: true }));

  const handleSave = () => {
    if (!userLoggedin || userLoggedin === {}) {
      naviagate("/login");
    } else {
      //create a timeline

      dispatch(timelineActions.showModal(true));
      //add events to timeline
    }
  };

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Timeline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Button variant="secondary" onClick={handleSave}>
          Save
        </Button>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button onClick={handleShow}>+ New Event</Button>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Public Timelines</Nav.Link>
            <Nav.Link href="#action2">Library</Nav.Link>
            <Nav.Link href="#action2">Faq</Nav.Link>
            <Nav.Link href="#action2">Contact us</Nav.Link>
            <NavDropdown title="John Doe" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">My Timelines</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Offcanvas show={showOffCanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Event</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NewEventForm />
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Navigation;
