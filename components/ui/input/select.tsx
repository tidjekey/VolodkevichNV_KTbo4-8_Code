import React from "react";

interface Props {
  value: string;
  onChange: any;
  onBlur: () => {};
  label: string;
  defaultTitle: string;
  selectableValues: { value: string; label: string }[];
}

const Select = ({
  value,
  onChange,
  onBlur,
  label,
  defaultTitle,
  selectableValues,
}: Props) => {
  return (
    <form className="w-full ">
      <label className="flex flex-col gap-[8rem]">
        {label}
        <select
          className="input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={''}
        >
          {selectableValues.map((e, i) => (
            <option key={i} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default Select;
