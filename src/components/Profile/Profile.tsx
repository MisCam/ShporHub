import React, { useState } from "react";

import PageLayout from "../PageLayout";
import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";
import cn from "clsx";
import { PAGES } from "../App/pages";

import styles from "./Profile.module.css";

type ProfileProps = {
  nickname: string;
  course: number;
  group: number;
  groups: Group[];
  token: string | null;
  setGroup: (groupId: number) => void;
  setCourse: (courseId: number) => void;
  changeLessons: () => void;
  callbackSetPage: (page: string, logout?: boolean) => void;
};
type Group = {
  id: number;
  name: string;
};
const Profile = (props: ProfileProps): React.ReactElement => {
  const {
    nickname,
    course,
    group,
    token,
    groups,
    setGroup,
    setCourse,
    changeLessons,
    callbackSetPage,
  } = props;
  const [isBtnStyleOk, setStyle] = useState(false);
  let courseSelect = course;
  let groupSelect = group;
  const ChangeCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    courseSelect = parseInt(event.target.value);
  };
  const ChangeGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    groupSelect = parseInt(event.target.value);
  };
  const ChangeInfo = async function () {
    const answer = await fetch(
      `http://shporhub/api/index.php/?method=updateProfile&course=${courseSelect}&group=${groupSelect}&token=${token}`
    );
    const response = await answer.json();
    if (response.data) {
      setGroup(groupSelect);
      setCourse(courseSelect);
      localStorage.setItem("course", `${courseSelect}`);
      localStorage.setItem("group", `${groupSelect}`);
      changeLessons();
      setStyle(true);
      setTimeout(() => {
        setStyle(false);
      }, 2500);
    }
  };
  return (
    <div>
      <PageLayout>
        <label className={styles.title}>Логин: {nickname}</label>
        <label className={styles.title}>
          Курс
          <select className={styles.standartSelect} onChange={ChangeCourse}>
            <option selected={course == 1 ? true : false} value="1">
              1
            </option>
            <option selected={course == 2 ? true : false} value="2">
              2
            </option>
            <option selected={course == 3 ? true : false} value="3">
              3
            </option>
            <option selected={course == 4 ? true : false} value="4">
              4
            </option>
          </select>
        </label>
        <label className={styles.title}>
          Направление
          <select className={styles.standartSelect} onChange={ChangeGroup}>
            {groups.map((value) => (
              <option
                selected={group == value.id ? true : false}
                value={value.id}
              >
                {value.name}
              </option>
            ))}
          </select>
        </label>
        <Button
          classNames={cn(
            isBtnStyleOk ? styles.greenBtn : ""
          )}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
          callback={ChangeInfo}
        >
          Сохранить изменения
        </Button>
        <Button
          classNames={styles.marginTop}
          color={BUTTON_COLOR.gray}
          size={BUTTON_SIZE.normal}
          callback={() => callbackSetPage(PAGES.MainPage)}
        >
          Назад
        </Button>
      </PageLayout>
    </div>
  );
};

export default Profile;
