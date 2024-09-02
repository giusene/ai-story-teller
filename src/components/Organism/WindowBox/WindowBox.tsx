import style from "./WindowBox.module.scss";

interface WindowBoxProps {
  title?: string;
}

const WindowBox = (props: WindowBoxProps) => {
  const { title } = props;
  return <div className={style.main}>{title && <h2>{title}</h2>}</div>;
};

export default WindowBox;
