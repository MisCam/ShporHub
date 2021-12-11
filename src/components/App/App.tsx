import "./App.css";

import React, { useState, useEffect } from "react";

import Header from "../Header";
import WelcomePage from "../WelcomePage";
import LoginPage from "../Login";
import Registration from "../Registration";
import MainPage from "../MainPage";
import Profile from "../Profile";
import Shpor from "../Shpor";

import { PAGES } from "./pages";
import { NonNullChain } from "typescript";

function App() {
  const [logged, setLogged] = useState(false);
  const [nickName, setNickname] = useState("Unname");
  const [lessons, setLessons] = useState([{ name: "asd", id: '1' }]);
  const [course, setCourse] = useState(2);
  const [userId, setUserId] = useState(1);
  const [group, setGroup] = useState(2);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState("WelcomePage");

  const Login = (nickname: string, actualToken: string, group_id : number, course_id : number, id : number) => {
    setNickname(nickname);
    localStorage.setItem('token', actualToken);
    setPage(PAGES.MainPage);  
    setLogged(true);
    SetLessonsInState();
    setGroup(group_id);
    setCourse(course_id); 
    setUserId(id); 
  };
  const GetLessonsResponce = async function () {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getLessons&id=${userId}&token=${localStorage.getItem('token')}`
    );
    const result = await answer.json();
    return result.data;
  };
  const SetLessonsInState = () => {
    GetLessonsResponce().then((value) => {
      if(value){
        setLessons(value);
      } else {
        setLessons([
          {name: 'предметы отсутствуют', id: ''}
        ]);
      }
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
  const ChangePage = (page : string, logout : boolean = false) => {
    setPage(page);
    if(logout){
      localStorage.setItem('token', '');
      setLogged(false);
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
        callbackSetPage={ChangePage}
      ></Header>
      {page === PAGES.WelcomePage ? (
        <WelcomePage callbackSetPage={ChangePage} />
      ) : page === PAGES.Login ? (
        <LoginPage
          callbackSetPage={ChangePage}
          callbackLogin={Login}
        />
      ) : page === PAGES.Registration ? (
        <Registration
          callbackSetPage={ChangePage}
          groups={groups}
        />
      ) : page === PAGES.MainPage ? (
        <MainPage
          lessons={lessons}
          callbackSetPage={ChangePage}
        />
      ) : page === PAGES.Shpor ? (
        <Shpor />
      ) : page === PAGES.UploadShpor ? (
        <div></div>
      ) : page === PAGES.FAQ ? (
        <div></div>
      ) : page === PAGES.Profile ? (
        <Profile
          nickname={nickName}
          groups={groups}
          group={group}
          token={localStorage.getItem('token')}
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
