import React from "react";

const CButton = ({
  name,
  height = "50px",
  color,
  url,
  textColor,
  border,
  className,
  icon: Icon,
}) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <button
      className={`${
        color ? `bg-${color}` : "bg-primary"
      } px-6 font-medium text-[20px] leading-[25px] transition-all duration-300 hover:opacity-80 flex items-center justify-center gap-2 ${className}`}
      style={{
        height: height,
        borderRadius: "64px",
        border: border,
        color: textColor ? `${textColor}` : "white",
      }}
      onClick={handleClick}
    >
      {name}
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default CButton;
