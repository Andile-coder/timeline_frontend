import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import NewEventForm from "../forms/newEvent/NewEventForm";

function Navigation() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Timeline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
      <Offcanvas show={show} onHide={handleClose}>
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
{
  /* <Offcanvas show={show} onHide={handleClose}>
<Offcanvas.Header closeButton>
  <Offcanvas.Title>New Event</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
  <NewEventForm />
</Offcanvas.Body>
</Offcanvas> */
}
{
  /* <Navbar expand="lg" className="bg-body-tertiary">
<Container>
  <Navbar.Brand href="#">Timeline</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="navbarScroll">
    <Nav className="me-auto" style={{ maxHeight: "100px" }}>
      <Button onClick={handleShow}>+ New Event</Button>
      <Nav.Link href="#action1">Home</Nav.Link>
      <Nav.Link href="#action2">Public Timelines</Nav.Link>
      <Nav.Link href="#action2">Library</Nav.Link>
      <Nav.Link href="#action2">Faq</Nav.Link>
      <Nav.Link href="#action2">Contact us</Nav.Link>
      <NavDropdown title="John Doe" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">
          Something else here
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Container>
</Navbar> */
}
