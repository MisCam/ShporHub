import React from "react";

import cn from "clsx";
import Test from '../../assets/test.jpg';

import styles from "./Shpor.module.css";
import PageLayout from "../PageLayout";

const Shpor = (): React.ReactElement => {
  const variants = [0, 0, 0, 0, 0];
  return (
    <div>
      <PageLayout>
        <div className={styles.page}>
          <div className={styles.answers}>
            {variants.map((value) => (
              <div>
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
