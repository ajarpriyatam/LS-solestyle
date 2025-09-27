import React from "react";
import Logo from "../component/common/Logo";
import SocialIcons from "../component/common/SocialIcons";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] py-10 px-5">
      <div className="container min-w-[100%] sm:max-w-[90%] mx-auto px-[20px] flex flex-col md:flex-row justify-between gap-10 md:gap-5 text-center md:text-left">
        <div className="flex flex-col items-start gap-[25px]">
          <Logo />
          <h6 className="max-w-[437px] text-left text-gray-300">
            Will surprise you
            <br /> Benefits and plenty of surprises are waiting for you!
          </h6>
          <div className="flex gap-4">
            <SocialIcons
              to={"/"}
              icon={FaFacebookF}
              className="hover:!text-[#ff6b00]"
            />
            <SocialIcons
              to={"/"}
              icon={FaInstagram}
              className="hover:!text-[#ff6b00]"
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-[30px]">
          <h3 className="text-[22px] leading-[25.94px] text-[#ff6b00] font-semibold text-left">
            About
          </h3>
          <ul className="flex flex-col gap-[20px] text-left">
            {footerAbouts.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="text-gray-300 text-[16px] leading-[25.2px] hover:text-[#ff6b00] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="flex flex-col gap-[30px]">
          <h3 className="text-[22px] leading-[25.94px] text-[#ff6b00] font-semibold text-left">
            Get In Touch
          </h3>
          <ul className="flex flex-col gap-[20px] text-left">
            <li>
              <Link
                to="tel:+91-1234567890"
                className="text-gray-300 text-[16px] leading-[25.2px] hover:text-[#ff6b00] transition-colors"
              >
                P: +91-1234567890
              </Link>
            </li>
            <li>
              <Link
                to='mailto:abc@gmail.com'
                className="text-gray-300 text-[16px] leading-[25.2px] hover:text-[#ff6b00] transition-colors"
              >
                E: abc@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <h6 className="text-gray-400 md:mt-[60px] text-center text-[12px]">
        © 2025 SoleStyle. All rights reserved.
      </h6>
    </footer>
  );
};

export default Footer;
