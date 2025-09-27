import React from "react";
import { navItems } from "../constants";
import Logo from "../component/common/Logo";
import { MdOutlineCall } from "react-icons/md";
import CButton from "../component/common/CButton";

const DrawerList = ({ activeNavItem, handleScroll }) => {
  return (
    <div className="bg-white w-[18rem]">
      <div className="flex justify-center items-center h-[73px] border-b border-gray-300">
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-between h-full py-4">
        <ul className="flex flex-col  items-center justify-center space-y-[30px]">
          {navItems.map((link, index) => (
            <li
              key={index}
              className={`${
                activeNavItem !== link.path && "hover:underline"
              } flex items-center cursor-pointer`}
              onClick={() => handleScroll(link.path)}
            >
              <span
                style={{
                  lineHeight: "22.5px",
                  fontWeight: "500",
                  fontSize: "18px",
                  color:
                    activeNavItem === link.path
                      ? "var(--color-primary)"
                      : "#2F2F2F",
                }}
              >
                {link.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <CButton
            name="Account"
            color="white"
            url="https://admin.camppos.app/"
            textColor="#12141E"
            border="1px solid black"
          />
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
