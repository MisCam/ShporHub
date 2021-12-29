import React, { useState } from "react";

import cn from "clsx";

import styles from "./ShporBlock.module.css";

type ShporBlockProps = {
    id: number;
    shporData: { isQuestion: boolean, isAnswer: boolean };
    changeShporInput: (id: number, isQuestion?: boolean) => void;
    addDataIn: () => void;
};

const ShporBlock = (props: ShporBlockProps): React.ReactElement => {
    const { id, changeShporInput, shporData } = props;
    return (
        <div>
            <div key={id} className={cn(styles.shporBlock)}>
                <label className={styles.title}>Загрузка варианта №{id + 1}</label>
                <input
                    type="file"
                    name="imageFile"
                    accept="images/*"
                    id={styles.shporImagesAnswers}
                    multiple
                    onChange={() => {
                        console.log('добавил вопрос в блок номер ' + id);
                        changeShporInput(id, true);
                    }}
                />
                <label className={cn(styles.upload_files, shporData.isQuestion ? styles.uploaded : '')} htmlFor={styles.shporImagesAnswers}>
                    {`Загрузить фотографию вопроса`}
                </label>
                <label className={cn(styles.title, styles.marginTop)}>Загрузка ответа</label>
                <input
                    type="file"
                    name="imageFile"
                    accept="images/*"
                    id={styles.shporImagesQuestions}
                    multiple
                    onChange={() => {
                        console.log('добавил ответ в блок номер ' + id);
                        changeShporInput(id, false);
                    }}
                />
                <label className={cn(styles.upload_files, shporData.isAnswer ? styles.uploaded : '')} htmlFor={styles.shporImagesQuestions}>
                    {`Загрузить фотографию ответа`}
                </label>
            </div>
        </div>
    );
};

export default ShporBlock;
