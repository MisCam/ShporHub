import React from "react";

import cn from "clsx";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";
import Test from "../../assets/test.jpg";

import styles from "./Shpor.module.css";
import PageLayout from "../PageLayout";

type ShporProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
};

const Shpor = (props : ShporProps): React.ReactElement => {
  const variants = [0, 0, 0, 0, 0];
  const { callbackSetPage } = props;
  return (
    <div>
      <PageLayout>
        <div className={styles.page}>
          <div className={styles.answers_wrapper}>
            <Button
              classNames={styles.marginBottom}
              color={BUTTON_COLOR.gray}
              size={BUTTON_SIZE.normal}
              callback={() => callbackSetPage(PAGES.MainPage)}
            >
              Назад
            </Button>
            {variants.map((value) => (
              <div className={styles.wrapper}>
                <label className={styles.title}>Вариант</label>
                <div className={styles.answer}>
                  <img src={Test} alt="question"></img>
                </div>
                <label className={styles.title}>Ответ на вариант</label>
                <div className={styles.answer}>
                  <img src={Test} alt="answer"></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Shpor;
