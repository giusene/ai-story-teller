import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, onClick, disabled } = props;

  return (
    <button disabled={disabled} className={style.main} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
