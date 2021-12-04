import React from "react";

import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import Post from "../Post";

type WelcomePageProps = {
  callbackShpor: () => void;
};

const WelcomePage = (props : WelcomePageProps): React.ReactElement => {
  const arr = [0,0,0,0,0];
  const { callbackShpor } = props;
  return (
    <div>
      <PageLayout>
        <PageTitle text={'Последние обновления'} />
        {arr.map((value,index) => (
          <Post callbackShpor={callbackShpor} key={index}></Post>
        ))}
      </PageLayout>
    </div>
    
  );
};

export default WelcomePage;



