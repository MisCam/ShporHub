import React, { useEffect, useState } from "react";

import cn from "clsx";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";

import { PAGES } from "../App/pages";

import styles from "./Login.module.css";

type LoginProps = {
  callbackSetPage: (page : string, logout? : boolean) => void;
  callbackLogin: (nickname: string, token: string, group_id : number, course_id : number) => void;
};

const DataInput = {
  Wrong: styles.wrongInput,
  Active: styles.activeInput,
  NotActive: "",
};

const Login = (props: LoginProps): React.ReactElement => {
  const { callbackLogin, callbackSetPage } = props;
  const login: React.Ref<HTMLInputElement> = React.createRef();
  const password: React.Ref<HTMLInputElement> = React.createRef();
  const [isDataValid, setData] = useState("");

  const Response = async function () {
    const md5 = require("md5");
    const rand: number = Math.floor(Math.random() * 1000000);
    const loginInput: string = login!.current!.value;
    const passwordInput: string = password!.current!.value;
    const hash: string = md5(md5(`${loginInput}${passwordInput}`) + rand);
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=login&hash=${hash}&rand=${rand}&login=${loginInput}`
    );
    const result = await answer.json();
    return result;
  };

  const LoginFunc = () => {
    Response().then((value) => {
      setData(DataInput.Active);
      if (value.result === "ok") {
        callbackLogin(login!.current!.value, value.data.token, value.data.group, value.data.course);
      } else {
        setData(DataInput.Wrong);
      }
    });
  };
  const ChangeInput = (input: string) => {
    setData(DataInput.Active);
    if (input !== "") {
      setData(DataInput.Active);
    } else {
      setData(DataInput.NotActive);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <label>Авторизация</label>
        <input
          ref={login}
          onChange={() => ChangeInput(login!.current!.value)}
          className={cn(styles.input, isDataValid)}
          placeholder="Почта"
        />
        <input
          ref={password}
          onChange={() => ChangeInput(password!.current!.value)}
          className={cn(styles.input, isDataValid)}
          placeholder="Пароль"
        />
        <Button
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
          callback={LoginFunc}
        >
          Войти
        </Button>
        <Button
          callback={() => callbackSetPage(PAGES.WelcomePage)}
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
        >
          Назад в меню
        </Button>
        <Button
          callback={() => {
            login!.current!.value = 'elprimo';
            password!.current!.value = '123456';
          }}
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
        >
          Заполнить як elprimo
        </Button>
      </div>
    </div>
  );
};

export default Login;
