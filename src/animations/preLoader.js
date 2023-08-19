import React, { useEffect } from "react";
import "./preLoader.css";
import { preLoaderAnim } from ".";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";

function PreLoader() {
  const navigate = useNavigate();
  useEffect(() => {
    preLoaderAnim();
    setTimeout(() => {
      navigate("/home");
    }, 7000);
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Web Developer</span>
        <span>Web Designer</span>
        <span>Learner</span>
      </div>

      <img src={logo} className="app-logo" alt="logo" />
    </div>
  );
}

export default PreLoader;
