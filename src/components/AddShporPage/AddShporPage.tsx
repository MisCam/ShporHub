import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import cn from "clsx";
import { PAGES } from "../App/pages";
import Server from "../../classes/Server";
import ShporBlock from "./ShporBlock";

import styles from "./AddShporPage.module.css";

type AddShporPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
};

const AddShporPage = (props: AddShporPageProps): React.ReactElement => {
  const { callbackSetPage } = props;
  const [shpors, setShpors] = useState([{ isQuestion: false, isAnswer: false }]);
  const changeShporInput = (id: number, isQuestion: boolean = true) => {
    setShpors(shpors.filter((shpor, i) => {
      console.log(i, id, i === id);
      
      if (i === id) {
        isQuestion ? shpor.isQuestion = true : shpor.isAnswer = true;
      }
    }));
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text="Загрузи свои шпоры" />
        {
          shpors.map((value, index) => (
            <ShporBlock changeShporInput={changeShporInput} shporData={value} id={index} addDataIn={() => { }} />
          ))
        }
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => { console.log("отправил запрос") }}
        >
          Отправить на модерацию
        </Button>
        <Button
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.content}
          classNames={styles.marginTop}
          callback={() => { setShpors([...shpors, { isAnswer: false, isQuestion: false }])} }
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
