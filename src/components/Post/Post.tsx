import React from "react";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";

import TestImg from '../../assets/test.jpg';

import { PAGES } from "../App/pages";

import styles from "./Post.module.css";

type PostProps = {
  callbackSetPage: (page : string, logout? : boolean) => void;
};

const Post = (props : PostProps): React.ReactElement => {
  const { callbackSetPage } = props;
  return (
    <div className={styles.post}>
      <label>Время проведения: 13.09.2019</label>
      <label>Тип: контрольная</label>
      <label className={styles.test_description}>
        Тут мы указываем абсолютно все подробности работы, кто проводил, какая
        была тема и так далее, что бы пользователь понял, то это или нет
      </label>
      <div className={styles.image}>
        <img src={TestImg} alt="post_img"></img>
      </div>
      <Button callback={() => callbackSetPage(PAGES.Shpor)} classNames={styles.button} size={BUTTON_SIZE.content} color={BUTTON_COLOR.gray}>
        Посмотреть ответы
      </Button>
    </div>
  );
};

export default Post;
