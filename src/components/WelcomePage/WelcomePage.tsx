import React from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import styles from './WelcomePage.module.css';

const WelcomePage = (): React.ReactElement => {
  return (
    <div>
      <PageLayout>
        <PageTitle text={"Приветствуем вас на ShporHub"} />
        <label className={styles.text}>Наш сайт призван помочь <b>БЕДНЫМ</b> студентам, чьи головы кипят от сложнейших предметов, а банка пива/шишка/жижка/доза жаждет их внимания. Специально для вас, мы создали онлайн библиотеку шпор, где вы можете легко и просто посмотреть любые контрольные/коллоквиумы/экзамены/самостоятельные по любым предметам, а так же их ответы.</label>
        <PageTitle text={"Последние обновления сайта"} />
        <label className={styles.text}>Запуск сайта. Версия 1.0</label> 
      </PageLayout>
    </div>
  );
};

export default WelcomePage;
