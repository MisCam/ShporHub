import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Button from "../Button";
import cn from 'clsx';
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";
import Server from "../../classes/Server";
import ShporBlock from "./ShporBlock";

import styles from "./AddShporPage.module.css";

type AddShporPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  groups: Group[];
};
type Group = {
  id: number;
  name: string;
};

const AddShporPage = (props: AddShporPageProps): React.ReactElement => {
  const { callbackSetPage, groups } = props;

  const [shpors, setShpors] = useState([0]);
  const [isTimeEmpty, setTime] = useState(false);
  const [isTypeEmpty, setType] = useState(false);
  const [isDescriptionEmpty, setDescription] = useState(false);

  const [shporsData, setShporsData] = useState([{ id: 0, Question: {}, Answer: {} }]);
  const server = new Server();

  const groupRef: React.Ref<HTMLSelectElement> = React.createRef();
  const courseRef: React.Ref<HTMLSelectElement> = React.createRef();
  const textTime: React.Ref<HTMLInputElement> = React.createRef();
  const textType: React.Ref<HTMLInputElement> = React.createRef();
  const textDescription: React.Ref<HTMLInputElement> = React.createRef();
  const changeShporInput = (id: number, isQuestion: boolean, data: Blob) => {
    let isUniqueId = true;
    for (let i = 0; i < shporsData.length; i++) {
      if (shporsData[i].id !== id) continue;
      isUniqueId = false;
      if (isQuestion && shporsData[i].Question) {
        shporsData[i].Question = data;
        continue;
      }
      if (!isQuestion && shporsData[i].Answer) {
        shporsData[i].Answer = data;
        continue;
      }
    }
    if (isUniqueId) {
      setShporsData((shporsData) => [...shporsData,
      { id: id, Question: isQuestion ? data : {}, Answer: !isQuestion ? data : {} }
      ]);
    }
  };
  const checkInputs = () => {
    let isOk = true;
    setTime(false);
    setType(false);
    setDescription(false);
    if (textTime.current!.value === "") {
      setTime(true);
      isOk = false;
    }
    if (textType.current!.value === "") {
      setType(true);
      isOk = false;
    }
    if (textDescription.current!.value === "") {
      setDescription(true);
      isOk = false;
    }
    return isOk;
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text="Загрузи свои шпоры" />
        <input
          ref={textTime}
          className={cn(styles.input, isTimeEmpty ? styles.wrong : '')}
          placeholder="Дата РАБоты (пример: 12.02.2020)"
        />
        <input
          ref={textType}
          className={cn(styles.input, isTypeEmpty ? styles.wrong : '')}
          placeholder="Тип РАБоты (Контрольная, Самостоятельная, Коллоквиум, Экзамен)"
        />
        <input
          ref={textDescription}
          className={cn(styles.input, isDescriptionEmpty ? styles.wrong : '')}
          placeholder="Описание (Что было, кто проводил и т.д)"
        />
        <select className={styles.select} ref={courseRef}>
          <option value="1">
            1
          </option>
          <option value="2">
            2
          </option>
          <option value="3">
            3
          </option>
          <option value="4">
            4
          </option>
        </select>
        <select className={cn(styles.select, styles.mb20px)} ref={groupRef}>
          {groups.map((value) => (
            <option
              value={value.id}
            >
              {value.name}
            </option>
          ))}
        </select>
        {
          shpors.map((value, index) => (
            <ShporBlock changeShporInput={changeShporInput} id={index} addDataIn={() => { }} />
          ))
        }
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => {
            if (!checkInputs()) return;
            if (
              shporsData.length === 1 && 
              !Object.keys(shporsData[0].Answer).length && 
              !Object.keys(shporsData[0].Question).length
            ) return;
            if (shporsData.length <= 0) return;
            server.UploadShpors(
              shporsData,
              textTime.current!.value,
              textType.current!.value,
              textDescription.current!.value,
              courseRef.current!.value,
              groupRef.current!.value
            );
            callbackSetPage(PAGES.MainPage);
          }}
        >
          Отправить на модерацию
        </Button>
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => { setShpors([...shpors, 0]) }}
        >
          Добавить шпору
        </Button>
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => {
            if (shpors.length > 1) {
              setShpors(shpors.filter((item, i) => i !== shpors.length - 1))
            }
          }}
        >
          Удалить последнюю шпору
        </Button>
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => callbackSetPage(PAGES.MainPage)}
        >
          Назад
        </Button>
      </PageLayout>
    </div>
  );
};

export default AddShporPage;
