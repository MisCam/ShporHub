import React from "react";

import cn from "clsx";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import { PAGES } from "../App/pages";

import styles from "./Shpor.module.css";
import PageLayout from "../PageLayout";

type ShporProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  variants: { img: string; num: string }[];
};

const Shpor = (props: ShporProps): React.ReactElement => {
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
            {props.variants.map((value) => (
              <div className={styles.wrapper}>
                {parseInt(value.num) % 2 === 1 ? (
                  <div>
                    <label className={styles.title}>Вариант</label>
                    <div className={styles.answer}>
                      <img src={value.img} alt="question"></img>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className={styles.title}>Ответ на вариант</label>
                    <div className={styles.answer}>
                      <img src={value.img} alt="answer"></img>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Shpor;
