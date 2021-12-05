import React, {useState} from "react";

import cn from "clsx";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";

import styles from "./Registration.module.css";

type LoginProps = {
    callbackBack: () => void;
    callbackRegistration: () => void;
    groups: Group[];
}
type Group = {
  id: number;
  name: string;
}
const DataInput = {
  Wrong: styles.wrongInput,
  Active: styles.activeInput,
  NotActive: "",
};
const Registration = (props : LoginProps): React.ReactElement => {
  const { callbackRegistration, callbackBack, groups } = props;
  const login: React.Ref<HTMLInputElement> = React.createRef();
  const password: React.Ref<HTMLInputElement> = React.createRef();
  const name: React.Ref<HTMLInputElement> = React.createRef();
  const course: React.Ref<HTMLSelectElement> = React.createRef();
  const group: React.Ref<HTMLSelectElement> = React.createRef();
  const [isDataValid, setData] = useState("");

  const RegisterQuery = async function () {
    const md5 = require("md5");
    const loginInput : string = login!.current!.value;
    const hash : string = md5(`${loginInput}${password!.current!.value}`);
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=registration&hash=${hash}&login=${loginInput}&group_id=${group!.current!.value}&course=${course!.current!.value}&name=${name!.current!.value}`
    );
    const result = await answer.json();
    return result;
  };
  const Register = async function () {
    if(!checkValidInput()) return;
    const response = await RegisterQuery();
    if(response.result === 'error') return;
    if (response.data) {
      callbackRegistration();
    } else {
      setData(DataInput.Wrong);
    }
  };
  const checkValidInput = () => {
    const alphabet : string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split('');
    const loginArray : string[] = login!.current!.value.split('');
    if(loginArray.length < 6 || password!.current!.value.length < 6) {
      setData(DataInput.Wrong);
      return false;
    }
    for(let i = 0; i < loginArray.length; i++){
      let isCharValid = false;
      for(let j = 0; j < alphabet.length; j++){
        if(loginArray[i] === alphabet[j]){
          isCharValid = true;
          continue;
        }
      }
      if(isCharValid){
        isCharValid = false;
      } else {
        setData(DataInput.Wrong);
        return false;
      }
    }
    return true;
  }
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
      <div className={styles.registration}>
        <label>Регистрация</label>
        <input
          ref={login}
          onChange={() => ChangeInput(login!.current!.value)}
          className={cn(styles.input, isDataValid)}
          placeholder="Логин(> 6 символов)"
        />
        <input
          ref={password}
          onChange={() => ChangeInput(password!.current!.value)}
          className={cn(styles.input, isDataValid)}
          placeholder="Пароль(> 6 символов)"
        />
        <input
          ref={name}
          onChange={() => ChangeInput(name!.current!.value)}
          className={cn(styles.input, isDataValid)}
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
            <option disabled defaultValue={''}>
              Выберите группу
            </option>
            {groups.map((value : Group) => (
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
          callback={callbackBack}
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
