import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TimelineChart from "./components/charts/timeline/TimelineChart";
import Navigation from "./components/navigation/Navigation";
import Notification from "./components/notification/Notification";
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";
import TimelineModal from "./components/modals/timelineModal/TimelineModal";

function App() {
  const [count, setCount] = useState(0);
  const notification = useSelector((state) => state.notification.notification);

  useEffect(() => {}, [notification]);
  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Loader />
      <TimelineModal />
      <Navigation />
      <TimelineChart />
    </>
  );
}

export default App;
