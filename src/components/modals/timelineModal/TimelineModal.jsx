import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { timelineActions } from "../../../../redux/slices/timelineSlice";
import {
  clearTimelineState,
  createTimeline,
} from "../../../../redux/actions/timelineActions";
import { Form } from "react-bootstrap";
import { createEvent } from "../../../../redux/actions/eventActions";
import { useNavigate } from "react-router-dom";
import { loaderActions } from "../../../../redux/slices/loader";

const TimelineModal = () => {
  const show = useSelector((state) => state.timeline.modal);
  const [timelineForm, setTimelineForm] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.events);
  const timeline_id = useSelector(
    (state) => state.timeline.timelines[0]?.data.timeline_id
  );
  const handleClose = () => {
    //create timeline
    dispatch(timelineActions.showModal(false));
  };

  const timelineHandler = async (e) => {
    e.preventDefault();
    dispatch(createTimeline(timelineForm)); //create timeline which updates timeline_id of events
    dispatch(timelineActions.showModal(false)); //close modal
  };

  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setTimelineForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (events.length !== 0 && events[0].timeline_id !== "") {
      //only render once all events have timeline_id
      events.forEach((event) => dispatch(createEvent(event)));
      dispatch(loaderActions.showLoader(true));
      const navTimeout = setTimeout(() => {
        navigate(`/my/timeline/${timeline_id}`);
        dispatch(loaderActions.showLoader(false));
        dispatch(clearTimelineState());
      }, 5000);

      clearTimeout(navTimeout);
    }
  }, [events, timeline_id]);

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
                required
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
                placeholder="Enter Description (Optional)"
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
