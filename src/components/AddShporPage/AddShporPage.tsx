import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";
import Server from "../../classes/Server";
import ShporBlock from "./ShporBlock";

import styles from "./AddShporPage.module.css";

type AddShporPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
};

const AddShporPage = (props: AddShporPageProps): React.ReactElement => {
  const { callbackSetPage } = props;
  const [shpors, setShpors] = useState([0]);
  const [shporsData, setShporsData] = useState([{id: 0, Question: {}, Answer: {}}]);
  const server = new Server();
  const textTime: React.Ref<HTMLInputElement> = React.createRef();
  const textType: React.Ref<HTMLInputElement> = React.createRef();
  const textDescription: React.Ref<HTMLInputElement> = React.createRef();
  const changeShporInput = (id: number, isQuestion: boolean, data: Blob) => {
    let isUniqueId = true;
    for(let i = 0; i < shporsData.length; i++){
      if(shporsData[i].id !== id) continue;
      isUniqueId = false;
      if(isQuestion && shporsData[i].Question) {
        shporsData[i].Question = data;
        continue;
      }  
      if(!isQuestion && shporsData[i].Answer) {
        shporsData[i].Answer = data;
        continue;
      } 
    }
    if(isUniqueId){
      setShporsData((shporsData) => [...shporsData, 
        {id: id, Question: isQuestion ? data : {}, Answer: !isQuestion ? data : {}}
      ]);
    }
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text="Загрузи свои шпоры"/>
        <input
          ref={textTime}
          className={styles.input}
          placeholder="Дата РАБоты (пример: 12.02.2020)"
        />
        <input
          ref={textType}
          className={styles.input}
          placeholder="Тип РАБоты (Контрольная, Самостоятельная, Коллоквиум, Экзамен)"
        />
        <input
          ref={textDescription}
          className={styles.input}
          placeholder="Описание (Что было, кто проводил и т.д)"
        />
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
            server.UploadShpors(
              shporsData,
              textTime.current!.value,
              textType.current!.value,
              textDescription.current!.value
            );
          }}
        >
          Отправить на модерацию
        </Button>
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => { setShpors([...shpors, 0])} }
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
