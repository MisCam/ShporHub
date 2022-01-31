import React, { useState } from "react";

import cn from "clsx";

import styles from "./ShporBlock.module.css";

type ShporBlockProps = {
    id: number;
    changeShporInput: (id: number, isQuestion: boolean, data: Blob) => void;
    addDataIn: () => void;
};

const ShporBlock = (props: ShporBlockProps): React.ReactElement => {
    const { id, changeShporInput } = props;
    const [isQuestion, setQuestion] = useState(false);
    const [isAnswer, setAnswer] = useState(false);
    return (
        <div>
            <div key={id} className={cn(styles.shporBlock)}>
                <label className={styles.title}>Загрузка варианта №{id + 1}</label>
                <input
                    type="file"
                    name="imageFile"
                    accept="images/*"
                    className={styles.hideInput}
                    id={'shporImagesAnswers' + `${id + 1}`}
                    onChange={(value) => {
                        setQuestion(true);
                        changeShporInput(id, true, value.target.files![0]);
                    }}
                />
                <label className={cn(styles.upload_files, isQuestion ? styles.uploaded : '')} htmlFor={'shporImagesAnswers' + `${id + 1}`}>
                    {`Загрузить фотографию вопроса`}
                </label>
                <label className={cn(styles.title, styles.marginTop)}>Загрузка ответа</label>
                <input
                    type="file"
                    name="imageFile"
                    accept="images/*"
                    className={styles.hideInput}
                    id={'shporImagesQuestions' + `${id + 1}`}
                    onChange={(value) => {
                        setAnswer(true);
                        changeShporInput(id, false, value.target.files![0]);
                    }}
                />
                <label className={cn(styles.upload_files, isAnswer ? styles.uploaded : '')} htmlFor={'shporImagesQuestions' + `${id + 1}`}>
                    {`Загрузить фотографию ответа`}
                </label>
            </div>
        </div>
    );
};

export default ShporBlock;
