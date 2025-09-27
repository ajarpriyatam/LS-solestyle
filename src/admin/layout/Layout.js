import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import SideNav from "./SideNav";
import DrawerIcon from "../assets/Drawer.png";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6b00',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
  },
});

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row gap-7 h-screen w-screen pt-[1rem] sm:p-[1rem] bg-[#000000]">
        {/* Drawer Icon */}
        <div className="absolute left-[27px] sm:hidden">
          <button
            onClick={toggleDrawer(true)}
            className="focus:outline-none h-6 w-6 hover:bg-[#2a2a2a] rounded-md flex items-center justify-center transition-colors duration-200 border border-[#ff6b00]"
          >
            <img 
              src={DrawerIcon} 
              alt="Drawer icon" 
              className="filter invert"  // Makes the icon white
            />
          </button>
        </div>

        {/* Left layout */}
        <div className="h-[100%] hidden sm:block bg-[#1a1a1a] rounded-xl shadow-lg">
          <SideNav />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-grow pt-[2rem] sm:pt-0 h-[100%] w-full">
          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg h-full">
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))
              )}
            </Routes>
          </div>
        </div>
      </div>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        className="sm:hidden"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1a1a1a",
            borderRight: "1px solid #2a2a2a",
            boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <SideNav onClose={toggleDrawer(false)} />
      </Drawer>
    </ThemeProvider>
  );
};

export default Layout;