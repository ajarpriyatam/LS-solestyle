import React from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@chakra-ui/react";

const SearchBar = ({ placeholder, onChange, value }) => {
  return (
    <div
      className={`flex items-center w-auto lg:w-[279px] h-[39px] border-[0.5px] border-[#E2E8F0]`}
      style={{ borderRadius: "15px", backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-row items-center pl-[13px] gap-2 w-[100%]">
        <CiSearch width="12.16px" height="12.16px" color="#2D3748" />
        <Input
          placeholder={placeholder}
          className="placeholder-custom-gray focus:outline-none w-[100%]"
          variant="unstyled"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
