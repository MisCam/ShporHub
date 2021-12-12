import React, { useState } from "react";

import cn from "clsx";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";

import { PAGES } from "../App/pages";

import styles from "./Login.module.css";

type LoginProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  callbackLogin: (
    nickname: string,
    token: string,
    group_id: number,
    course_id: number,
    id: number,
  ) => void;
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
  const [isLoginValid, setLogin] = useState("");
  const [isPasswordValid, setPassword] = useState("");

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
      if (value.result === "ok") {
        callbackLogin(
          login!.current!.value,
          value.data.token,
          value.data.group,
          value.data.course,
          value.data.id
        );
      } else {
        setLogin(DataInput.Wrong);
        setPassword(DataInput.Wrong);
      }
    });
  };
  const ChangeInput = (currentInput: string) => {
    let input: string = "";
    let func: (a: string) => void = setLogin;
    if (currentInput === "login") {
      input = login!.current!.value;
    } else {
      input = password!.current!.value;
      func = setPassword;
    }
    func(DataInput.Active);
    if (input !== "") {
      func(DataInput.Active);
    } else {
      func(DataInput.NotActive);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <label>Авторизация</label>
        <input
          ref={login}
          onChange={() => ChangeInput("login")}
          className={cn(styles.input, isLoginValid)}
          placeholder="Логин"
        />
        <input
          ref={password}
          onChange={() => ChangeInput("password")}
          className={cn(styles.input, isPasswordValid)}
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
      </div>
    </div>
  );
};

export default Login;
