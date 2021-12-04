import React from "react";

import styles from "./Header.module.css";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import Pages from "../App/App";

type HeaderProps = {
  isLogged: boolean;
  nick: string;
  callbackLogin: () => void;
  callbackRegistration: () => void;
  callbackLogout: () => void;
  callbackProfile: () => void;
};

const Header = (props: HeaderProps): React.ReactElement => {
  const {
    callbackLogin,
    callbackRegistration,
    callbackLogout,
    callbackProfile,
  } = props;
  
  return (
    <header>
      <div className={styles.logo}>
        Shpor<span>Hub</span>
      </div>
      {props.isLogged ? (
        <div className={styles.buttons}>
          <label className={styles.nickname}>{props.nick}</label>
          <Button
            callback={callbackLogout}
            classNames={styles.mar_horiz}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Выйти
          </Button>
          <Button
            callback={callbackProfile}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Профиль
          </Button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <Button
            callback={callbackLogin}
            classNames={styles.mar_horiz}
            color={BUTTON_COLOR.gray}
            size={BUTTON_SIZE.content}
          >
            Войти
          </Button>
          <Button
            callback={callbackRegistration}
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
