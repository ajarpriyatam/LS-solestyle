import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginInputField = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative h-[50px]">
      {props.leading && (
        <div
          className="leading-[10px] absolute top-1/2 transform -translate-y-1/2 text-[#9e9e9e] text-[16px] left-[10px] 
        w-7 h-7 flex items-center justify-center"
        >
          {props.leading}
        </div>
      )}
      <input
        type={isPasswordVisible ? "text" : props.type}
        placeholder={props.placeholder}
        className="h-full rounded-[4px] pl-[50px] p-[10px] text-[#333333] outline-none !border-none w-full focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#9e9e9e] placeholder:text-[1rem] placeholder:font-serif"
        onKeyDown={props.onKeyDown}
        style={{
          letterSpacing: "2px",
          backgroundColor: "#f5f5f5",
        }}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      {props.type === "password" && (
        <div
          className="absolute right-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer "
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <IoMdEye size={16} color="#333333" opacity={0.6} />
          ) : (
            <IoMdEyeOff size={16} color="#333333" opacity={0.6} />
          )}
        </div>
      )}
    </div>
  );
};

export default LoginInputField;
