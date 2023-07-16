import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../redux/slices/notificationSlice";
import { useEffect } from "react";
import { timelineActions } from "../../../redux/slices/timelineSlice";
import { getTimeline } from "../../../redux/actions/timelineActions";
import { getTimelineEvents } from "../../../redux/actions/eventActions";
import { useLocation } from "react-router-dom";

const Timeline = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const timeline = useSelector((state) => state.timeline.timeline);
  const events = useSelector((state) => state.events.timeline_events);
  const timeline_id = location.state.timeline_id;

  useEffect(() => {
    dispatch(getTimeline(timeline_id));
    dispatch(getTimelineEvents(timeline_id));
  }, []);
  return (
    <div>
      <h1>Your Timeline</h1>
      <h2>{timeline?.title}</h2>
      <h3>{events.length}</h3>
      {/* <>{timeline.toString()}</> */}
    </div>
  );
};

export default Timeline;
