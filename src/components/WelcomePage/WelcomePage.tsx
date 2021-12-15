import React from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";

type WelcomePageProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  setShporsInState: (a: string) => void;
  shporsByLesson: {
    data: string;
    type: string;
    shpor_id: string;
    discription: string;
    img: string;
  }[];
};

const WelcomePage = (props: WelcomePageProps): React.ReactElement => {
  const { callbackSetPage, setShporsInState } = props;
  return (
    <div>
      <PageLayout>
        <PageTitle text={"Приветствуем, милорд"} />
        <label>ХАХАХАХАХАХАХАХАХАХАХАХАХ</label>
      </PageLayout>
    </div>
  );
};

export default WelcomePage;
