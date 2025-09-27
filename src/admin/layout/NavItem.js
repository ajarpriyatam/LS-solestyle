import React from "react";
import { Link } from "react-router-dom";

export const NavItem = ({ SelectedIcon, name, isSelected, path, onClick }) => {
  return (
    <Link
      className={`flex h-[53.59px] items-center cursor-pointer w-full rounded-[0.5rem] py-[0.675rem] px-[1rem] ${
        isSelected === name ? "bg-white" : "bg-transparent"
      }`}
      to={`${path}`}
      style={{
        boxShadow:
          isSelected === name ? "0 20px 27px 0 rgba(0, 0, 0, 0.05)" : "",
      }}
      onClick={onClick}
    >
      <div>
        <div
          className={`flex justify-center items-center w-[32px] h-[32px] mr-3 p-[8px] ${
            isSelected === name ? "bg-primary" : "bg-white"
          }`}
          style={{
            boxShadow: "0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.12) !important",
            borderRadius: "0.5rem",
          }}
        >
          {isSelected === name ? (
            <SelectedIcon size={18} color="white" />
          ) : (
            <SelectedIcon size={18} />
          )}
        </div>
      </div>
      <h6
        className="font-sans"
        style={{
          color: isSelected === name ? "#344767" : "#67748e",
          fontSize: "0.875rem",
          fontWeight: isSelected === name ? 600 : 500,
        }}
      >
        {name}
      </h6>
    </Link>
  );
};
