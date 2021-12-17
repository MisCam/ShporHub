import "./App.css";

import { useState, useEffect, RefCallback } from "react";
import { useSwipeable } from "react-swipeable";

import Header from "../Header";
import WelcomePage from "../WelcomePage";
import LoginPage from "../Login";
import Registration from "../Registration";
import MainPage from "../MainPage";
import Profile from "../Profile";
import Shpor from "../Shpor";

import { PAGES } from "./pages";

function App() {
  const [logged, setLogged] = useState(false);
  const [nickName, setNickname] = useState("Unname");
  const [lessons, setLessons] = useState([{ name: "asd", id: "1" }]);
  const [shporsByLesson, setShporsByLesson] = useState([
    { date: "asd", type: "", shpor_id: "1", description: "asdasd", img: "" },
  ]);
  const [shporImages, setShporImages] = useState([{ img: "asd", num: "1" }]);
  const [course, setCourse] = useState(2);
  const [group, setGroup] = useState(2);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState("WelcomePage");
  const [isMenuOpen, setMenu] = useState(false);
  const SwipeLeft = () => {
    setMenu(false);
  };
  const SwipeRight = () => {
    setMenu(true);
  };
  const { ref } = useSwipeable({
    onSwipedLeft: SwipeLeft,
    onSwipedRight: SwipeRight,
  }) as { ref: RefCallback<Document> };

  const Login = (
    nickname: string,
    actualToken: string,
    group_id: number,
    course_id: number,
    id: number
  ) => {
    setNickname(nickname);
    SetInfoInLocalStorage('1', nickname, actualToken, `${id}`, `${course_id}`, `${group_id}`);
    setPage(PAGES.MainPage);
    setLogged(true);
    SetLessonsInState();
    setGroup(group_id);
    setCourse(course_id);
  };
  const GetLessonsResponce = async function () {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getLessons&id=${localStorage.getItem(
        "id"
      )}&token=${localStorage.getItem("token")}`
    );
    const result = await answer.json();
    return result.data;
  };
  const SetLessonsInState = () => {
    GetLessonsResponce().then((value) => {
      setShporsByLesson([]);
      if (value) {
        setLessons(value);
        return;
      }
      setLessons([]);
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
  const ChangePage = (page: string, logout: boolean = false) => {
    setPage(page);
    if (logout) {
      SetInfoInLocalStorage('0', '', '', '', '', '');
      setLogged(false);
    }
  };
  const GetShporsByLesson = async function (discipline_id: string) {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getShporsByLesson&discipline_id=${discipline_id}`
    );
    const result = await answer.json();
    return result.data;
  };
  const SetShporsInState = (discipline_id: string) => {
    GetShporsByLesson(discipline_id).then((value) => {
      if (value) {
        setShporsByLesson(value);
        return;
      }
      setShporsByLesson([]);
    });
  };
  const GetShporByIdResponse = async function (shpor_id: string) {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=getShporsById&shpor_id=${shpor_id}`
    );
    const result = await answer.json();
    return result.data;
  };
  const GetShporsById = (id: string) => {
    GetShporByIdResponse(id).then((value) => {
      if (value) {
        setShporImages(value);
        return;
      }
      setShporImages([]);
    });
  };
  const SetInfoInLocalStorage = (
    logged: '1' | '0', 
    nickname: string, 
    token: string, 
    id: string, 
    course: string, 
    group: string
  ) => {
    localStorage.setItem("logged", logged);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("course", course);
    localStorage.setItem("group", group);
  };
  useEffect(() => {
    if (localStorage.getItem("logged") === '1' && nickName === 'Unname') {
      setNickname(localStorage.getItem("nickname") || '');
      setPage(PAGES.MainPage);
      setLogged(true);
      setGroup(parseInt(localStorage.getItem("group") || ''));
      setCourse(parseInt(localStorage.getItem("course") || ''));
      SetLessonsInState();
    }
    GetGroups();
    ref(document);
  });
  return (
    <div className="App">
      <Header
        isLogged={logged}
        nick={nickName}
        callbackSetPage={ChangePage}
      ></Header>
      {page === PAGES.WelcomePage ? (
        <WelcomePage />
      ) : page === PAGES.Login ? (
        <LoginPage callbackSetPage={ChangePage} callbackLogin={Login} />
      ) : page === PAGES.Registration ? (
        <Registration callbackSetPage={ChangePage} groups={groups} />
      ) : page === PAGES.MainPage ? (
        <MainPage
          setMenu={setMenu}
          isMenuOpen={isMenuOpen}
          lessons={lessons}
          shporsByLesson={shporsByLesson}
          callbackSetPage={ChangePage}
          setShporsInState={SetShporsInState}
          setShporImages={GetShporsById}
        />
      ) : page === PAGES.Shpor ? (
        <Shpor variants={shporImages} callbackSetPage={ChangePage} />
      ) : page === PAGES.UploadShpor ? (
        <div></div>
      ) : page === PAGES.FAQ ? (
        <div></div>
      ) : page === PAGES.Profile ? (
        <Profile
          nickname={nickName}
          groups={groups}
          group={group}
          token={localStorage.getItem("token")}
          changeLessons={SetLessonsInState}
          course={course}
          setGroup={setGroup}
          setCourse={setCourse}
          callbackSetPage={ChangePage}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
