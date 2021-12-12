import React, { useState } from "react";

import cn from "clsx";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";

import styles from "./Registration.module.css";

type LoginProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  groups: Group[];
};
type Group = {
  id: number;
  name: string;
};
const DataInput = {
  Wrong: styles.wrongInput,
  Active: styles.activeInput,
  NotActive: "",
};
const Registration = (props: LoginProps): React.ReactElement => {
  const { callbackSetPage, groups } = props;
  const login: React.Ref<HTMLInputElement> = React.createRef();
  const password: React.Ref<HTMLInputElement> = React.createRef();
  const name: React.Ref<HTMLInputElement> = React.createRef();
  const course: React.Ref<HTMLSelectElement> = React.createRef();
  const group: React.Ref<HTMLSelectElement> = React.createRef();
  const [isLoginValid, setLogin] = useState("");
  const [isPasswordValid, setPassword] = useState("");
  const [isNameValid, setName] = useState("");

  const RegisterQuery = async function () {
    const md5 = require("md5");
    const loginInput: string = login!.current!.value;
    const hash: string = md5(`${loginInput}${password!.current!.value}`);
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=registration&hash=${hash}&login=${loginInput}&group=${
        group!.current!.value
      }&course=${course!.current!.value}&name=${name!.current!.value}`
    );
    const result = await answer.json();
    return result;
  };
  const Register = async function () {
    if (!checkValidInput()) return;
    const response = await RegisterQuery();
    if (response.result === "error") return;
    if (response.data) {
      callbackSetPage(PAGES.Login);
    } else {
      setLogin(DataInput.Wrong);
      setPassword(DataInput.Wrong);
      setName(DataInput.Wrong);
    }
  };
  const checkValidInput = () => {
    const alphabet: string[] =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    const loginArray: string[] = login!.current!.value.split("");
    if (loginArray.length < 6 || password!.current!.value.length < 6) {
      setLogin(DataInput.Wrong);
      setPassword(DataInput.Wrong);
      setName(DataInput.Wrong);
      return false;
    }
    for (let i = 0; i < loginArray.length; i++) {
      let isCharValid = false;
      for (let j = 0; j < alphabet.length; j++) {
        if (loginArray[i] === alphabet[j]) {
          isCharValid = true;
          continue;
        }
      }
      if (isCharValid) {
        isCharValid = false;
      } else {
        setLogin(DataInput.Wrong);
        setPassword(DataInput.Wrong);
        setName(DataInput.Wrong);
        return false;
      }
    }
    return true;
  };
  const ChangeInput = (currentInput: string) => {
    let input: string = "";
    let func: (a: string) => void = setLogin;
    if (currentInput === "login") {
      input = login!.current!.value;
    } else if (currentInput === "password") {
      input = password!.current!.value;
      func = setPassword;
    } else {
      input = name!.current!.value;
      func = setName;
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
      <div className={styles.registration}>
        <label>Регистрация</label>
        <input
          ref={login}
          onChange={() => ChangeInput("login")}
          className={cn(styles.input, isLoginValid)}
          placeholder="Логин(> 5 символов)"
        />
        <input
          ref={password}
          onChange={() => ChangeInput("password")}
          className={cn(styles.input, isPasswordValid)}
          placeholder="Пароль(> 5 символов)"
        />
        <input
          ref={name}
          onChange={() => ChangeInput("name")}
          className={cn(styles.input, isNameValid)}
          placeholder="Имя (нас заставили)"
        />
        <div className={styles.selectors}>
          <select className={styles.select} ref={course}>
            <option disabled>Выберите курс</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <select className={styles.select} ref={group}>
            <option disabled defaultValue={""}>
              Выберите группу
            </option>
            {groups.map((value: Group) => (
              <option value={value.id}>{value.name}</option>
            ))}
          </select>
        </div>
        <Button
          callback={Register}
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
        >
          Зарегистрироваться
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

export default Registration;
