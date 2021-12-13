import React from "react";

import Button from "../Button";
import { BUTTON_SIZE, BUTTON_COLOR } from "../Button/Button";

import TestImg from "../../assets/test.jpg";

import { PAGES } from "../App/pages";

import styles from "./Post.module.css";

type PostProps = {
  callbackSetPage: (page: string, logout?: boolean) => void;
  data: string;
  type: string;
  discription: string;
  img: string;
  shpor_id: string;
};

const Post = (props: PostProps): React.ReactElement => {
  const {
    callbackSetPage,
    data,
    type,
    discription,
    img,
    shpor_id,
  } = props;
  return (
    <div className={styles.post}>
      <label>{data}</label>
      <label>Тип: {type}</label>
      <label className={styles.test_description}>{discription}</label>
      <div className={styles.image}>
        <img src={img} alt="post_img"></img>
      </div>
      <Button
        callback={() => callbackSetPage(PAGES.Shpor)}
        classNames={styles.button}
        size={BUTTON_SIZE.content}
        color={BUTTON_COLOR.gray}
      >
        Посмотреть ответы
      </Button>
    </div>
  );
};

export default Post;
