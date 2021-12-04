import React from "react";

import styles from "./PageTitle.module.css";


type PageTitleProps = {
  text: string;
}

const PageTitle = (props: PageTitleProps): React.ReactElement => {
  return (
    <label className={styles.title}>{props.text}</label>
  );
};

export default PageTitle;
