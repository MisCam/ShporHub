import React from "react";

import Button from "../../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../../Button/Button";
import cn from 'clsx';

import styles from "./Menu.module.css";

type MenuProps = {
  lessons: {name : string}[];
};

const Menu = (props : MenuProps): React.ReactElement => {
  console.log(props.lessons);
  
  return (
    <div className={cn(styles.menu_wrapper)}>
      <button
        onClick={() => {}}
        className={styles.turnOff}
      ></button>
      <div className={styles.nav_menu}>
        <label className={styles.marginBottom}>Предметы</label>
        {props.lessons.map((value, index) => (
          <Button
            classNames={styles.marginBottom}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.normal}
            callback={() => {}}
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
