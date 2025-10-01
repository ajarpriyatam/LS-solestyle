import React, { useEffect, useState } from "react";
import Logo from "../component/common/Logo";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";
import DrawerList from "./DrawerList";
import { HiOutlineBars2 } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

const theme = createTheme();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [, , cartContext] = useCart();
  const { cart } = cartContext;
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const updateActiveNav = () => {
      const currentPath = window.location.hash.replace("#", "") || "";
      setActiveNavItem(currentPath);

      if (currentPath === "") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    updateActiveNav();

    window.addEventListener("hashchange", updateActiveNav);
    return () => window.removeEventListener("hashchange", updateActiveNav);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div
        className={`flex fixed z-50 h-[67px] w-full justify-between items-center min-w-[100%] sm:max-w-[90%] mx-auto px-[40px] ${isScrolled ? "border-b border-gray-800 bg-black/95" : "bg-black/80"
          } backdrop-blur-sm transition-all duration-300`}
      >
        <Logo />

        <div className="hidden lg:flex">
          <ul className="flex justify-center space-x-[50px]">
          <Link
              className="flex items-center cursor-pointer group"
              to='/'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/all/collection'
                  ? "text-orange-500"
                  : isScrolled
                    ? "text-slate-100 group-hover:text-orange-500"
                    : "text-slate-300 group-hover:text-orange-500"
                  }`}
              >
                Home
              </span>
            </Link>
            <Link
              className="flex items-center cursor-pointer group"
              to='/all/collection'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/all/collection'
                  ? "text-orange-500"
                  : isScrolled
                    ? "text-slate-100 group-hover:text-orange-500"
                    : "text-slate-300 group-hover:text-orange-500"
                  }`}
              >
                Products
              </span>
            </Link>
          </ul>
        </div>

        <div className="flex flex-row gap-5">
          <Link to={"/cart"} className="relative p-2 text-gray-300 hover:text-orange-500 transition-colors duration-300">
            <FaShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {Math.ceil(cartItemsCount/48)}
              </span>
            )}
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
            <HiOutlineBars2 className="h-[24px] w-[24px]" />
          </button>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        className="lg:hidden"
        PaperProps={{
          sx: {
            backgroundColor: '#111',
            color: '#f1f5f9'
          }
        }}
      >
        <DrawerList activeNavItem={activeNavItem} />
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
