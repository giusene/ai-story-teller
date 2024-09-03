import { ReactNode } from "react";
import style from "./WindowBox.module.scss";

interface WindowBoxProps {
  title?: string;
  children: ReactNode;
}

const WindowBox = (props: WindowBoxProps) => {
  const { title, children } = props;
  return (
    <div className={style.main}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default WindowBox;
