import React, { useState } from "react";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);

  const handleLogin = () => {
    const loggedIn = AuthService.login(username, password);
    if (loggedIn) {
      console.log("LogIn");
      navigate("/Home");
    } else {
      setValidation(true);
    }
  };

  const formBackground = useColorModeValue("gray.400", "gray.700");

  return (
    <div className="loginContainer" style={{ backgroundColor: "aquamarine" }}>
      <Flex alignItems="center" justifyContent="center" padding={10}>
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6}>Sign-In</Heading>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => {}}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" mb={3} onClick={handleLogin}>
            Log In
          </Button>
          {validation && <p style={{ color: "red" }}>Incorrect Credentials</p>}
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginComponent;
