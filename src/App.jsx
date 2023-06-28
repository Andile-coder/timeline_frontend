import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TimelineChart from "./components/charts/timeline/TimelineChart";
import Navigation from "./components/navigation/Navigation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <TimelineChart />
    </>
  );
}

export default App;
