import { Dispatch, SetStateAction, useState } from "react";
import style from "./Hamburger.module.scss";

interface HamburgerProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const Hamburger = (props: HamburgerProps) => {
  const { active: nuovoNome, setActive: nuovoSet } = props;

  return (
    <div
      className={`${style.main} ${nuovoNome ? style.active : ""}`}
      onClick={() => nuovoSet(!nuovoNome)}
    >
      <div className={style.breadUp} />
      <div className={style.hamb} />
      <div className={style.breadDown} />
    </div>
  );
};

export default Hamburger;
