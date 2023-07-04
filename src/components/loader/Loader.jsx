import React from "react";
import styles from "./loader.module.scss";
import { useSelector } from "react-redux";
const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);
  return (
    <div
      className={styles.spinner_overlay}
      style={{ display: loading ? "flex" : "none" }}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
