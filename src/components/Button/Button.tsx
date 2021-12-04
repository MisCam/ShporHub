import React from "react";

import styles from "./Button.module.css";

import cn from "clsx";

export const BUTTON_SIZE = {
  content: "",
  normal: styles.normal_size,
};

export const BUTTON_COLOR = {
  gray: styles.gray,
  blue: styles.blue,
};

type ButtonColor = typeof BUTTON_COLOR[keyof typeof BUTTON_COLOR];
type ButtonSize = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];

type ButtonProps = {
  children: React.ReactNode;
  size: ButtonSize;
  color: ButtonColor;
  classNames?: string;
  callback: () => void;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const { classNames, color, size, children, callback } = props;
  return (
    <button onClick={callback} className={cn(size, color, classNames)}>
      {children}
    </button>
  );
};

export default Button;
