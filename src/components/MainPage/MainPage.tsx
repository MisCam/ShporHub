import React from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";
import Menu from "./Menu";

type MainPageProps = {
  callbackSetPage: (page : string, logout? : boolean) => void;
  lessons: {name : string}[];
};

const MainPage = (props : MainPageProps): React.ReactElement => {
  const arr = [0, 0, 0, 0, 0];
  const { callbackSetPage } = props;
  return (
    <div>
      <PageLayout>
        <PageTitle text={`Шпоры по предмету: ${"АХАХАХ"}`} />
        {arr.map((value) => (
          <Post callbackSetPage={callbackSetPage}/>
        ))}
        <Menu lessons={props.lessons} />
      </PageLayout>
    </div>
  );
};

export default MainPage;
