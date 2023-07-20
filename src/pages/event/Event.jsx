import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getEvent } from "../../../redux/actions/eventActions";

const Event = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
  const event_id = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getEvent(event_id));
  }, []);
  return (
    <div>
      <h1>Event Name:{event.title}</h1>
      <p>Description:{event.description}</p>
      <p>Date: {event.event_date} </p>
      <h2>Images</h2>
    </div>
  );
};

export default Event;
