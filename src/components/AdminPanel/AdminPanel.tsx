import React, { useState } from "react";

import PageLayout from "../PageLayout";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import cn from "clsx";
import { PAGES } from "../App/pages";
import Server from "../../classes/Server";

import styles from "./AdminPanel.module.css";

type AdminPanelProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
};

const AdminPanel = (props: AdminPanelProps): React.ReactElement => {
  const { callbackSetPage } = props;
  return (
    <div>
      <PageLayout>
        <Button
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
          callback={() => callbackSetPage(PAGES.MainPage)}
        >
          Назад
        </Button>
      </PageLayout>
    </div>
  );
};

export default AdminPanel;
