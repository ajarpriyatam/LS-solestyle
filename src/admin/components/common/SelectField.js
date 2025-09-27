import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SelectField = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.value || null);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside, true);
    };
  }, []);

  const handleToggle = (e) => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (item) => () => {
    setSelectedOption(item.label);
    setIsOpen(false);
    props.onChange(props.id, item.value);
  };

  return (
    <div className="flex flex-col space-y-[8px]" ref={selectRef}>
      <div
        className={`${!props.notRequired && "required-input"}`}
        style={{
          fontFamily: "Noto Sans",
          fontWeight: 600,
          color: "#666666",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        {props.label}
      </div>
      <div
        className="relative inline-flex w-full bg-white rounded-lg border border-[#CCCCCC] focus:outline-none focus:border-primary focus:ring-primary h-14"
        style={{
          border: isOpen
            ? "1px solid var(--color-primary)"
            : "1px solid #CCCCCC",
        }}
      >
        <div
          className="w-full px-4 py-2 cursor-pointer flex items-center"
          onClick={handleToggle}
          style={{ color: selectedOption ? "#000000" : "#A0AEC0" }}
        >
          {selectedOption || props.placeholder || "Select"}
        </div>
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 flex justify-center items-center cursor-pointer"
          onClick={handleToggle}
        >
          {isOpen ? (
            <IoIosArrowUp style={{ color: "var(--color-primary)" }} />
          ) : (
            <IoIosArrowDown style={{ color: "#A0AEC0" }} />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 mt-1 w-800px origin-top-right rounded-md bg-white max-h-60 overflow-y-auto custom-scrollbar shadow-lg border border-gray-200"
        >
          {props.items.map((item) => (
            <button
              type="button"
              onClick={onOptionClicked(item)}
              key={item.value}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
