import React, { useState } from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";
import Menu from "./Menu";

type MainPageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  lessons: { name: string, id: string }[];
};

const MainPage = (props: MainPageProps): React.ReactElement => {
  const arr = [0, 0, 0, 0, 0];
  const { callbackSetPage } = props;
  const [currentSubject, setSubject] = useState("Не выбрано");
  const ChangeSubject = (subjectName: string) => {
    setSubject(subjectName);
  };
  return (
    <div>
      <PageLayout>
        <PageTitle text={`Шпоры по предмету: ${currentSubject}`} />
        {arr.map((value) => (
          <Post callbackSetPage={callbackSetPage} />
        ))}
        <Menu lessons={props.lessons} callBackChangeSubject={ChangeSubject} />
      </PageLayout>
    </div>
  );
};

export default MainPage;
