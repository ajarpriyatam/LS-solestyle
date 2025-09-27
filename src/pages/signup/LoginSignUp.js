import React, { useCallback, useRef, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaUnlock, FaUser } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../layouts/Layout";
import LoginInputField from "../../component/common/LoginInputField";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  // const [error, setError] = useState();

  const [existingUser, setExistingUser] = useState({
    loginId: "",
    loginPassword: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    registerPassword: "",
    registerPhoneNumber: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateFields = useCallback((user, isLogin) => {
    if (isLogin) {
      if (!user.loginId) {
        return "Email/Mobile number is required";
      }
      if (!user.loginPassword || !validatePassword(user.loginPassword)) {
        return "Password must be at least 6 characters long";
      }
    } else {
      if (!user.name) {
        return "Name is required";
      }
      if (!user.email || !validateEmail(user.email)) {
        return "Invalid email address";
      }
      if (
        !user.registerPhoneNumber ||
        !validatePhoneNumber(user.registerPhoneNumber)
      ) {
        return "Phone number must be 10 digits";
      }
      if (!user.registerPassword || !validatePassword(user.registerPassword)) {
        return "Password must be at least 6 characters long";
      }
    }
    return null;
  }, []);

  const loginSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const error = validateFields(existingUser, true);
      if (error) {
        toast.error(error);
        return;
      }

      try {
        if (existingUser.loginId === "admin@gmail.com") {
          toast.success("Admin login");
          navigate("/admin");
          return;
        } else {
          toast.error("User login");
          navigate("/");
        }

        // const res = await axios.post("/api/login", {
        //   phoneNumber: existingUser.loginId,
        //   password: existingUser.loginPassword,
        // });

        // const { role } = res.data.user || { role: "user" };

        // if (role === "admin") {
        //   toast.success("Admin login");
        //   navigate("/admin");
        // } else {
        //   toast.success("Login successful");
        //   navigate("/");
        // }
      } catch (error) {
        toast.error("Invalid credentials");
      }
    },
    [existingUser, validateFields, navigate]
  );

  const registerSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const error = validateFields(newUser, false);
      if (error) {
        toast.error(error);
        return;
      }

      try {
        await axios.post("/api/register", {
          name: newUser.name,
          email: newUser.email,
          password: newUser.registerPassword,
          phoneNumber: newUser.registerPhoneNumber,
        });

        toast.success("Registration successful");
        navigate("/");
      } catch (error) {
        toast.error("Failed to register. Please try again");
      }
    },
    [newUser, validateFields, navigate]
  );

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const isRegisterFormActive =
        registerTab.current.classList.contains("shiftToNeutralForm");

      if (!isRegisterFormActive) {
        loginSubmit(e);
      } else {
        registerSubmit(e);
      }
    }
  };

  const handleExistingUserChange = (e) => {
    setExistingUser({
      ...existingUser,
      [e.target.id]: e.target.value,
    });
  };

  const handleNewUserChange = (e) => {
    const { id, value } = e.target;
    setNewUser({
      ...newUser,
      [id]: id === "name" ? value.toUpperCase() : value,
    });
  };

  return (
    <Layout>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <LoginInputField
              label="E-mail/Mobile"
              placeholder="E-mail/Mobile"
              leading={<FaUser />}
              onKeyDown={handleKeyDown}
              id="loginId"
              value={existingUser.loginId}
              onChange={handleExistingUserChange}
            />

            <LoginInputField
              label="Password"
              placeholder="Password"
              leading={<FaUnlock />}
              type="password"
              onKeyDown={handleKeyDown}
              id="loginPassword"
              value={existingUser.loginPassword}
              onChange={handleExistingUserChange}
            />
            <Link to="">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />

            <div className="text-[12px] text-[#9EA0A0] text-center">
              <span>By clicking through, I agree with the</span>
              <br />
              <span
                className="text-[#5B91E8] underline cursor-pointer"
                onClick={() => window.open("/terms-and-conditions", "_blank")}
              >
                Terms &amp; Conditions
              </span>
              <span> and </span>
              <span
                className="text-[#5B91E8] underline cursor-pointer"
                onClick={() => window.open("/privacy-policy", "_blank")}
              >
                Privacy Policy
              </span>
            </div>
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <LoginInputField
              label="Name"
              placeholder="Name as per Aadhar"
              leading={<FaRegFaceGrin />}
              type="text"
              onKeyDown={handleKeyDown}
              id="name"
              value={newUser.name}
              onChange={handleNewUserChange}
            />

            <LoginInputField
              label="Email"
              placeholder="Email"
              leading={<MdOutlineMail />}
              type="text"
              onKeyDown={handleKeyDown}
              id="email"
              value={newUser.email}
              onChange={handleNewUserChange}
            />

            <LoginInputField
              label="Phone"
              placeholder="Phone Number"
              leading="+91"
              type="number"
              onKeyDown={handleKeyDown}
              id="registerPhoneNumber"
              value={newUser.registerPhoneNumber}
              onChange={handleNewUserChange}
            />

            <LoginInputField
              label="Password"
              placeholder="Password"
              leading={<FaUnlock />}
              type="password"
              onKeyDown={handleKeyDown}
              id="registerPassword"
              value={newUser.registerPassword}
              onChange={handleNewUserChange}
            />
            <input type="submit" value="Register" className="signUpBtn mt-5" />
            <div className="text-[12px] text-[#9EA0A0] text-center">
              <span>By clicking through, I agree with the</span>
              <br />
              <span
                className="text-[#5B91E8] underline cursor-pointer"
                onClick={() => window.open("/terms-and-conditions", "_blank")}
              >
                Terms &amp; Conditions
              </span>
              <span> and </span>
              <span
                className="text-[#5B91E8] underline cursor-pointer"
                onClick={() => window.open("/privacy-policy", "_blank")}
              >
                Privacy Policy
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
};


export default LoginSignUp;
