import React from "react";
import { CgSpinner } from "react-icons/cg";

const Button = (props) => {
  return (
    <button
      className={`border-2 border-primary rounded-[0.5rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white disabled:text-primary bg-primary text-white text-[14px] flex justify-center items-center gap-2`}
      onClick={props.onClick}
      style={{
        padding: "7px 20px",
        transition: "all 0.35s",
      }}
      disabled={props.disabled}
    >
      {props.isLoading && <CgSpinner size="20" className="animate-spin" />}
      {props.isLoading ? "Please wait..." : `${props.name}`}
    </button>
  );
};

export default Button;
