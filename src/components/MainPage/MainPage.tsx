import React from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";
import Menu from "./Menu";

import styles from "./MainPage.module.css";

type MainPageProps = {
  callbackShpor: () => void;
  lessons: {name : string}[];
};

const MainPage = (props : MainPageProps): React.ReactElement => {
  const arr = [0, 0, 0, 0, 0];
  const { callbackShpor } = props;
  return (
    <div>
      <PageLayout>
        <PageTitle text={`Шпоры по предмету: ${"АХАХАХ"}`} />
        {arr.map((value) => (
          <Post callbackShpor={callbackShpor}/>
        ))}
        <Menu lessons={props.lessons} />
      </PageLayout>
    </div>
  );
};

export default MainPage;
