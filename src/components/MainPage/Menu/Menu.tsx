import React, { useState } from "react";

import Button from "../../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../../Button/Button";
import cn from "clsx";

import styles from "./Menu.module.css";

type MenuProps = {
  lessons: { name: string; id: string }[];
  callBackChangeSubject: (a: string) => void;
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
        {props.lessons.map((value, index) => (
          <Button
            classNames={styles.marginBottom}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.normal}
            callback={() => props.callBackChangeSubject(value.name)}
          >
            {value.name}
          </Button>
        ))}
        {/* <label>Остальное</label>
        <Button>Опубликовать шпору</Button>
        <Button>FAQ</Button> */}
      </div>
    </div>
  );
};

export default Menu;
