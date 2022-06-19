import React from "react";
import styles from './Loader.module.css';

interface Props {}

export const Loader = (props: Props) => {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
