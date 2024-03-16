import React from "react";
import { Button } from "@chakra-ui/react";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/Login");
  };

  return (
    <Button
      colorScheme="red"
      onClick={handleLogout}
      isDisbaled={!AuthService.isLoggedIn()}
    >
      Logout
    </Button>
  );
};

export default LogoutComponent;
