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
        <PageTitle text={"Последние обновления"} />
        {props.shporsByLesson.map((value, index) => (
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
      </PageLayout>
    </div>
  );
};

export default WelcomePage;
