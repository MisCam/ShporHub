import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";
import Menu from "./Menu";

import styles from './MainPage.module.css';

type MainPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  lessons: { name: string; id: string }[];
  isMenuOpen: boolean;
  shporsByLesson: {
    date: string;
    type: string;
    shpor_id: string;
    description: string;
    img: string;
  }[];
  setShporsInState: (a: string) => void;
  setMenu: (a: boolean) => void;
  setShporImages: (id: string) => void;
};

const MainPage = (props: MainPageProps): React.ReactElement => {
  const {
    callbackSetPage,
    isMenuOpen,
    setMenu,
    setShporsInState,
    setShporImages
  } = props;
  const [currentSubject, setSubject] = useState("Не выбрано");
  const ChangeSubject = (subjectName: string) => {
    setSubject(subjectName);
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text={`Шпоры по предмету: ${currentSubject}`} />
        {(props.shporsByLesson.length !== 0) ?
            props.shporsByLesson.map((value) => (
              <Post
                data={value.date}
                type={value.type}
                img={value.img}
                shpor_id={value.shpor_id}
                discription={value.description}
                callbackSetPage={callbackSetPage}
                setShporImages={setShporImages}
              />
            )) : <label className={styles.text}>Шпор по предмету не найдено :(</label>}
        <Menu
          setMenu={setMenu}
          isMenuOpen={isMenuOpen}
          lessons={props.lessons}
          setShporsInState={setShporsInState}
          callBackChangeSubject={ChangeSubject}
          callbackSetPage={callbackSetPage}
        />
      </PageLayout>
    </div>
  );
};

export default MainPage;
