import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import NormalMode from "./Components/NormalMode";
import DarkMode from "./Components/DarkMode";
import ChooseMode from "./Components/ChooseMode";
import Sidebar from "./Components/Sidebar";
import classes from "./style.module.css";

function App() {
  const [mode, setMode] = useState("normal");
  const [selection, setSelection] = useState("");
  const location = useLocation();

  const containerExtraStyle =
    mode === "dark" || selection === "dark"
      ? classes.darkContainer
      : classes.lightContainer;

  useEffect(() => {
    switch (location.pathname) {
      case "/normal":
        setMode("normal");
        setSelection("");
        break;
      case "/dark":
        setMode("dark");
        setSelection("");
        break;
      case "/choose":
        setMode("choose");
        setSelection("");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className={classes.dashboard}>
      <Sidebar
        mode={mode}
        selection={selection}
        showReset={!!selection}
        setSelection={(selection) => setSelection(selection)}
      />
      <div className={`${classes.container} ${containerExtraStyle}`}>
        <Switch>
          <Route path="/normal" render={() => <NormalMode />} />
          <Route path="/dark" render={() => <DarkMode />} />
          <Route
            path="/choose"
            render={() => (
              <ChooseMode
                selection={selection}
                setMode={(mode) => setMode(mode)}
                setSelection={(selection) => setSelection(selection)}
              />
            )}
          />
          <Redirect to="/normal" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
