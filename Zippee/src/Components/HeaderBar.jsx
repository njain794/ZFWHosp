import React from "react";
import { Flex, Text, Spacer } from "@chakra-ui/react"; // Added Spacer component
import LogoutComponent from "../Auth/LogoutComponent";

const HeaderBar = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      h="80px"
      bg="black"
      color="yellow"
      px={6}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Star Wars - Character Profiles Portal
      </Text>
      <Spacer />
      <LogoutComponent />
    </Flex>
  );
};

export default HeaderBar;
