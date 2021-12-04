import React from "react";
import cn from 'clsx';

import styles from "./PageLayout.module.css";


type PageLayoutProps = {
  classNames?: string;
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps): React.ReactElement => {
  const { classNames, children } = props;
  return (
    <div className={cn(styles.container, classNames)}>
        {children}
    </div>
  );
};

export default PageLayout;
