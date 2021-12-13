import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";
import Menu from "./Menu";

type MainPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  lessons: { name: string; id: string }[];
  isMenuOpen: boolean;
  shporsByLesson: {
    data: string;
    type: string;
    shpor_id: string;
    discription: string;
    img: string;
  }[];
  setShporsInState: (a: string) => void;
  setMenu: (a: boolean) => void;
};

const MainPage = (props: MainPageProps): React.ReactElement => {
  const {
    callbackSetPage,
    isMenuOpen,
    setMenu,
    setShporsInState,
  } = props;
  const [currentSubject, setSubject] = useState("Не выбрано");
  const ChangeSubject = (subjectName: string) => {
    setSubject(subjectName);
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text={`Шпоры по предмету: ${currentSubject}`} />
        {props.shporsByLesson.map((value) => (
          <Post
            data={value.data}
            type={value.type}
            img={value.img}
            shpor_id={value.shpor_id}
            discription={value.discription}
            setShporsInState={setShporsInState}
            callbackSetPage={callbackSetPage}
          />
        ))}
        <Menu
          setMenu={setMenu}
          isMenuOpen={isMenuOpen}
          lessons={props.lessons}
          callBackChangeSubject={ChangeSubject}
        />
      </PageLayout>
    </div>
  );
};

export default MainPage;
