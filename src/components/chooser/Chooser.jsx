import React from "react";

import { BsCalendarEvent } from "react-icons/bs";
// import { FaTimeline } from "react-icons/fa6";
import styles from "./chooser.module.scss";
const Chooser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.galaxy}>
        <div className={styles.circle}>
          <BsCalendarEvent />
          <span className={styles.tooltiptext}>Event</span>
        </div>
        <div className={styles.circle}>2</div>
        <div className={styles.circle}>3</div>
        <div className={styles.circle}>4</div>
        <div className={styles.circle}>5</div>
        <div className={styles.circle}>6</div>
        <div className={styles.circle}>7</div>
        <div className={styles.circle}>8</div>
        <div className={styles.circle}>9</div>
        <div className={styles.circle}>10</div>
      </div>
    </div>
  );
};

export default Chooser;
