import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthService from "./Auth/AuthService";
import LoginComponent from "./Auth/LoginComponent";
import CardList from "./Components/CardList";
import HeaderBar from "./Components/HeaderBar";

function App() {
  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/Home" /> : <Navigate to="/Login" />
          }
        />
        <Route path="/Home" element={<CardList />} />
        <Route path="/Login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
