import { Dispatch, SetStateAction, useState } from "react";
import style from "./Switch.module.scss";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const Switch = (props: SwitchProps) => {
  const { active, setActive } = props;

  return (
    <div
      className={`${style.main} ${active ? style.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={`${style.mask}  ${active ? style.active : ""}`} />
      <div className={`${style.dot} ${active ? style.active : ""}`} />
    </div>
  );
};

export default Switch;
