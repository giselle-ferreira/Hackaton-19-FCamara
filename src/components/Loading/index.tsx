import React from "react";

import styles from "./styles.module.scss";
const Loading = () => {
  return (
    <svg
      className={styles.dots}
      width="24px"
      height="16px"
      viewBox="0 0 132 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns-sketch="http://www.bohemiancoding.com/sketch/ns"
    >
      <title>dots</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        sketch-type="MSPage"
      >
        <g id="dots" sketch-type="MSArtboardGroup" fill="#A3A3A3">
          <circle
            className={styles.dot1}
            sketch-type="MSShapeGroup"
            cx="25"
            cy="24"
            r="13"
          ></circle>
          <circle
            className={styles.dot2}
            sketch-type="MSShapeGroup"
            cx="65"
            cy="24"
            r="13"
          ></circle>
          <circle
            className={styles.dot3}
            sketch-type="MSShapeGroup"
            cx="105"
            cy="24"
            r="13"
          ></circle>
        </g>
      </g>
    </svg>
  );
};

export default Loading;
