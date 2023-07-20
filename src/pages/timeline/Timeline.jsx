import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../redux/slices/notificationSlice";
import { useEffect } from "react";
import { timelineActions } from "../../../redux/slices/timelineSlice";
import { getTimeline } from "../../../redux/actions/timelineActions";
import { getTimelineEvents } from "../../../redux/actions/eventActions";
import { useLocation, useNavigate } from "react-router-dom";
import TimelineChart from "../../components/charts/timeline/TimelineChart";
import OffCanvas from "../../components/modals/offCanvas/OffCanvas";
import { currentUser } from "../../../redux/actions/authActions";

const Timeline = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const timeline = useSelector((state) => state.timeline.timeline);
  const events = useSelector((state) => state.events.timeline_events);
  const unSavedEvents = useSelector((state) => state.events.events);
  const user = dispatch(currentUser());

  const timeline_id = location.pathname.split("/")[3];

  useEffect(() => {
    if (user) {
      dispatch(getTimeline(timeline_id));
      dispatch(getTimelineEvents(timeline_id));
    } else {
      navigate("/login");
    }
  }, [events]);
  return (
    <div>
      <OffCanvas />
      <div style={{ display: "flex" }}>
        <h2>Title: {timeline?.title}</h2>
        <h3>Saved Events: {events.length}</h3>
        <h3>Draft Events: {unSavedEvents.length}</h3>
      </div>
      <TimelineChart eventsData={events} unSavedEventsData={unSavedEvents} />
    </div>
  );
};

export default Timeline;
