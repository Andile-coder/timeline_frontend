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
import Navigation from "../../components/navigation/Navigation";
import { createEvent } from "../../../redux/actions/eventActions";
import Notification from "../../components/notification/Notification";
const Timeline = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const timeline = useSelector((state) => state.timeline.timeline);
  const savedEvents = useSelector((state) => state.events.timeline_events);
  const unSavedEvents = useSelector((state) => state.events.events);
  const user = useSelector((state) => state.auth.user);
  const notification = useSelector((state) => state.notification.notification);
  const timeline_id = location.pathname.split("/")[3];

  const handleTimelineUpdate = async () => {
    console.log("update timeline");
    const toSave = unSavedEvents.map((event) => ({
      ...event,
      timeline_id: timeline_id,
    }));
    await toSave.forEach((event) => dispatch(createEvent(event)));
  };
  useEffect(() => {
    dispatch(getTimeline(timeline_id));
    dispatch(getTimelineEvents(timeline_id));
  }, []);
  return (
    <div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Navigation onSave={handleTimelineUpdate} />
      <OffCanvas />

      <TimelineChart
        eventsData={savedEvents}
        unSavedEventsData={unSavedEvents}
      />
    </div>
  );
};

export default Timeline;
