import React from "react";
import styles from "./chooser.module.scss";
const Chooser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.galaxy}>
        <div className={styles.planet}>1</div>
        <div className={styles.planet}>2</div>
        <div className={styles.planet}>3</div>
        <div className={styles.planet}>4</div>
        <div className={styles.planet}>5</div>
        <div className={styles.planet}>6</div>
        <div className={styles.planet}>7</div>
        <div className={styles.planet}>8</div>
        <div className={styles.planet}>9</div>
        <div className={styles.planet}>10</div>
      </div>
    </div>
  );
};

export default Chooser;
