import React from "react";

import styles from "./Header.module.css";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";

type HeaderProps = {
  isLogged: boolean;
  nick: string;
  callbackSetPage: (page: string, logout?: boolean) => void;
};

const Header = (props: HeaderProps): React.ReactElement => {
  const { callbackSetPage } = props;

  return (
    <header>
      <div
        className={styles.logo}
        onClick={() =>
          callbackSetPage(props.isLogged ? PAGES.MainPage : PAGES.WelcomePage)
        }
      >
        Shpor<span>Hub</span>
      </div>
      {props.isLogged ? (
        <div className={styles.buttons}>
          <label className={styles.nickname}>{props.nick}</label>
          <Button
            callback={() => callbackSetPage(PAGES.WelcomePage, true)}
            classNames={styles.mar_horiz}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Выйти
          </Button>
          <Button
            callback={() => callbackSetPage(PAGES.Profile)}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Профиль
          </Button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <Button
            callback={() => callbackSetPage(PAGES.Login)}
            classNames={styles.mar_horiz}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Войти
          </Button>
          <Button
            callback={() => callbackSetPage(PAGES.Registration)}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Зарегистрироваться
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
