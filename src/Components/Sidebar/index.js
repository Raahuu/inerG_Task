import React from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";

const Home = (props) => {
  const styleCondition =
    props.mode === "normal" || props.selection === "normal";

  const menuOptionalStyle = styleCondition
    ? classes.lightMenuItem
    : props.selection === "dark" || props.mode === "dark"
    ? classes.darkMenuItem
    : classes.chooseMenuItem;

  const sidebarOptionalStyle = styleCondition
    ? classes.lightSideBar
    : props.selection === "dark" || props.mode === "dark"
    ? classes.darkSideBar
    : classes.chooseSideBar;

  const buttonOptionalStyle = styleCondition
    ? classes.lightButton
    : classes.darkButton;

  return (
    <div className={`${classes.sideBar} ${sidebarOptionalStyle}`}>
      <Link className={`${classes.menuItem} ${menuOptionalStyle}`} to="/normal">
        Normal Mode
      </Link>
      <Link className={`${classes.menuItem} ${menuOptionalStyle}`} to="/dark">
        Dark Mode
      </Link>
      <Link className={`${classes.menuItem} ${menuOptionalStyle}`} to="/choose">
        Choose Mode
      </Link>
      {props.showReset ? (
        <button
          className={`${classes.resetButton} ${buttonOptionalStyle}`}
          onClick={() => props.setSelection("")}
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
