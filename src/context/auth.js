import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
// create context variable using createContext
const AuthContext = createContext();

// getter and setter are tracked by useState

// using AuthProvider function, we can access it from anywhere.
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth, //spread the auth means all the data in auth are copied in setauth
        user: parseData.user, // pass the user
        token: parseData.token, // pass the token
      });
    }
    //eslint-disable-next-line
  }, []); // pass the auth to the dependencies //[auth] it prevent unnecessary re-run of the effect if specific dependencies (auth) does not change
  //  now, on refreshing the page we dont get any loss of data
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

// now, configure it into index.js file
