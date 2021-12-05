import "./App.css";

import React, { useState, useEffect } from "react";

import Header from "../Header";
import WelcomePage from "../WelcomePage";
import LoginPage from "../Login";
import Registration from "../Registration";
import MainPage from "../MainPage";
import Profile from "../Profile";
import Shpor from "../Shpor";

const Pages = {
  WelcomePage: "WelcomePage",
  Login: "Login",
  Registration: "Registration",
  MainPage: "MainPage",
  Shpor: "Shpor",
  UploadShpor: "UploadShpor",
  FAQ: "FAQ",
  Profile: "Profile",
};

function App() {
  const [logged, setLogged] = useState(false);
  const [nickName, setNickname] = useState("Unname");
  const [token, setToken] = useState("");
  const [lessons, setLessons] = useState([{ name: "asd" }]);
  const [course, setCourse] = useState(2);
  const [group, setGroup] = useState(2);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState("WelcomePage");

  const Login = (nickname: string, actualToken: string, group_id : number, course_id : number) => {
    setNickname(nickname);
    setToken(actualToken);
    setPage(Pages.MainPage);
    setLogged(true);
    SetLessonsInState();
    setGroup(group_id);
    setCourse(course_id);
  };

  const GetLessonsResponce = async function () {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getLessons`
    );
    const result = await answer.json();
    return result.data;
  };
  const SetLessonsInState = () => {
    GetLessonsResponce().then((value) => {
      setLessons(value);
    });
  };
  const GroupsQuery = async function () {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getGroups`
    );
    const result = await answer.json();
    return result;
  };

  const GetGroups = async function () {
    if (groups.length === 0) {
      const response = await GroupsQuery();
      setGroups(response.data);
    }
  };

  useEffect(() => {
    GetGroups();
  });

  return (
    <div className="App">
      <Header
        isLogged={logged}
        nick={nickName}
        callbackLogin={() => setPage(Pages.Login)}
        callbackLogout={() => {
          setPage(Pages.WelcomePage);
          setLogged(false);
        }}
        callbackProfile={() => setPage(Pages.Profile)}
        callbackRegistration={() => setPage(Pages.Registration)}
      ></Header>
      {page === Pages.WelcomePage ? (
        <WelcomePage callbackShpor={() => setPage(Pages.Shpor)} />
      ) : page === Pages.Login ? (
        <LoginPage
          callbackBack={() => setPage(Pages.WelcomePage)}
          callbackLogin={(nickname: string, token: string, group_id : number, course_id : number) =>
            Login(nickname, token, group_id, course_id)
          }
        />
      ) : page === Pages.Registration ? (
        <Registration
          callbackBack={() => setPage(Pages.WelcomePage)}
          callbackRegistration={() => setPage(Pages.Login)}
          groups={groups}
        />
      ) : page === Pages.MainPage ? (
        <MainPage
          lessons={lessons}
          callbackShpor={() => setPage(Pages.Shpor)}
        />
      ) : page === Pages.Shpor ? (
        <Shpor />
      ) : page === Pages.UploadShpor ? (
        <div></div>
      ) : page === Pages.FAQ ? (
        <div></div>
      ) : page === Pages.Profile ? (
        <Profile
          nickname={nickName}
          groups={groups}
          group={group}
          token={token}
          course={course}
          setGroup={setGroup}
          setCourse={setCourse}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
