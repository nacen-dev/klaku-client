import React, { FC } from "react";
import styles from './Loader.module.css';

interface Props {}

export const Loader:FC<Props> = () => {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
