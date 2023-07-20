import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TimelineChart from "./components/charts/timeline/TimelineChart";
import Navigation from "./components/navigation/Navigation";
import Notification from "./components/notification/Notification";
import { timelineActions } from "../redux/slices/timelineSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/loader/Loader";

import TimelineModal from "./components/modals/timelineModal/TimelineModal";
import { useNavigate } from "react-router-dom";

function App() {
  const notification = useSelector((state) => state.notification.notification);
  const unSavedEvents = useSelector((state) => state.events.events);
  const userLoggedin = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSave = () => {
    if (!userLoggedin || userLoggedin === {}) {
      navigate("/login");
    } else {
      dispatch(timelineActions.showModal(true));
    }
  };
  useEffect(() => {}, [notification]);
  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Loader />
      <TimelineModal />
      <Navigation onSave={handleSave} />
      <TimelineChart eventsData={[]} unSavedEventsData={unSavedEvents} />
    </>
  );
}

export default App;
