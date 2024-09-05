import { Dispatch, SetStateAction, useEffect } from "react";
import style from "./Toast.module.scss";

interface ToastProps {
  title: string;
  message: string;
  setAction: Dispatch<SetStateAction<boolean>>;
}

const Toast = (props: ToastProps) => {
  const { title, message, setAction } = props;

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setAction(false);
    }, 3000);
    return () => clearTimeout(timeoutID);
  }, [setAction]);

  return (
    <div className={style.main}>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <p className={style.close} onClick={() => setAction(false)}>
        x
      </p>
      <div className={style.progressBar}>
        <div className={style.fill} />
      </div>
    </div>
  );
};

export default Toast;
