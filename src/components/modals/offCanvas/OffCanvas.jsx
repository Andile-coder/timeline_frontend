import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import NewEventForm from "../../forms/newEvent/NewEventForm";
import { useDispatch, useSelector } from "react-redux";
import { offCanvasActions } from "../../../../redux/slices/offCanvasSlice";
const OffCanvas = () => {
  const showOffCanvas = useSelector((state) => state.offCanvas.open);
  const dispatch = useDispatch();
  const handleClose = () =>
    dispatch(offCanvasActions.showOffCanvas({ open: false }));

  const handleShow = () =>
    dispatch(offCanvasActions.showOffCanvas({ open: true }));

  return (
    <Offcanvas show={showOffCanvas} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New Event</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NewEventForm />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvas;
