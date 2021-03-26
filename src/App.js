//TECH IMPORTS 
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//COMPONENT IMPORTS
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./helpers/PrivateRoute";
//STYLING IMPORTS 
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/protected">
          <BubblePage />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute