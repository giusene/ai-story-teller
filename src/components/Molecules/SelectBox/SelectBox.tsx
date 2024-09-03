import { ListOption } from "@/types/common";
import style from "./SelectBox.module.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SelectBoxProps {
  label: string;
  list: ListOption[];
  setAction: Dispatch<SetStateAction<string>>;
}

const SelectBox = (props: SelectBoxProps) => {
  const { label, list, setAction } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  return (
    <div className={style.main}>
      <h3>{label}</h3>
      <select id="select" onChange={handleChange}>
        <option value="" hidden>
          seleziona
        </option>
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
