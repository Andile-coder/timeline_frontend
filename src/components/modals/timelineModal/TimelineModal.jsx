import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { timelineActions } from "../../../../redux/slices/timelineSlice";
import { createTimeline } from "../../../../redux/actions/timelineActions";
import { Form } from "react-bootstrap";

const TimelineModal = () => {
  const show = useSelector((state) => state.timeline.modal);
  const [timelineForm, setTimelineForm] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    //create timeline
    dispatch(timelineActions.showModal(false));
  };

  const timelineHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(createTimeline(timelineForm));
    dispatch(timelineActions.showModal(false));
  };

  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setTimelineForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(timelineForm);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Timeline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={timelineHandler}>
            <Form.Group className="mb-3" controlId="event_title">
              <Form.Label>Timeline Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={timelineForm.title}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="event_description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                value={timelineForm.description}
                onChange={handleFormChange}
                name="description"
                placeholder="Enter Description"
              />
            </Form.Group>

            <Form.Group className="mb-3 justify-content-space-between">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">Save</Button>{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TimelineModal;
