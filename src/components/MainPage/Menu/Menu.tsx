import React, { useState } from "react";

import Button from "../../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../../Button/Button";
import cn from "clsx";
import { PAGES } from "../../App/pages";

import styles from "./Menu.module.css";

type MenuProps = {
  lessons: { name: string; id: string }[];
  callBackChangeSubject: (a: string) => void;
  setShporsInState: (a: string) => void;
  callbackSetPage: (page: string, logout?: boolean) => void;
  isMenuOpen: boolean;
  setMenu: (a: boolean) => void;
};

const Menu = (props: MenuProps): React.ReactElement => {
  return (
    <div
      className={cn(styles.menu_wrapper, props.isMenuOpen ? styles.hide_menu : "")}
    >
      <button
        onClick={() => {
          props.setMenu(!props.isMenuOpen);
        }}
        className={styles.turnOff}
      ></button>
      <div className={styles.nav_menu}>
        <label className={styles.marginBottom}>Предметы</label>
        {props.lessons.map((value) => (
          <Button
            classNames={styles.marginBottom}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.normal}
            callback={() => {
              props.callBackChangeSubject(value.name);
              props.setShporsInState(value.id);
            }}
          >
            {value.name}
          </Button>
        ))}
        <label className={styles.marginBottom}>Остальное</label>
        <Button
          classNames={styles.marginBottom}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
          callback={() => props.callbackSetPage(PAGES.UploadShpor)}
        >
          Опубликовать шпору
        </Button>
        {/* <Button>FAQ</Button> */}
      </div>
    </div>
  );
};

export default Menu;
