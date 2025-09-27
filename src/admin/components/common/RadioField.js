import React from "react";

const RadioField = ({
  label,
  options,
  onChange,
  checked,
  notRequired,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-[8px]">
      {label && (
        <div
          className={`${!notRequired && "required-input"}`}
          style={{
            fontFamily: "Noto Sans",
            fontWeight: 600,
            color: "#666666",
            fontSize: "12px",
            lineHeight: "18px",
          }}
        >
          {label}
        </div>
      )}
      <div className="flex flex-row space-x-[20px]">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex gap-[16px]"
            style={{
              fontFamily: "Noto Sans",
              fontWeight: 400,
              color: "#666666",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              className="cursor-pointer"
              checked={checked === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
