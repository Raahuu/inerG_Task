import React, { useState, useEffect } from "react";
import classes from "./style.module.css";
import NormalMode from "../NormalMode";
import DarkMode from "../DarkMode";

const ChooseMode = (props) => {
  const [selectedTheme, setSelectedTheme] = useState("Select");
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionSelect = (value) => {
    switch (value) {
      case "normal":
        setSelectedTheme("normal");
        props.setSelection("normal");
        setShowOptions(false);
        break;
      case "dark":
        setSelectedTheme("dark");
        props.setSelection("dark");
        setShowOptions(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.selection === "") {
      setSelectedTheme("Select");
    }
  }, [props.selection]);

  const renderContent = () => {
    switch (selectedTheme) {
      case "normal":
        return <NormalMode />;
      case "dark":
        return <DarkMode />;
      default:
        return (
          <div className={classes.container}>
            <div
              className={classes.select}
              onClick={() => setShowOptions(!showOptions)}
            >
              {selectedTheme}
            </div>
            {showOptions ? (
              <div className={classes.options}>
                <p className={classes.disabledOption}>Select</p>
                <p onClick={() => handleOptionSelect("normal")}>
                  Set normal mode
                </p>
                <p onClick={() => handleOptionSelect("dark")}>Set dark mode</p>
              </div>
            ) : (
              ""
            )}
          </div>
        );
    }
  };

  return renderContent();
};

export default ChooseMode;
