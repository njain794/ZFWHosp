import React from "react";
import { Box, Image, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CardComponent = ({ data, onClick, imgUrl }) => {
  const boxBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <MotionBox
      maxW="200px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      textAlign="center"
      key={data.id}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: "lg" }}
      transition={{ duration: 0.3 }}
      bg={boxBgColor}
      p="2"
      backgroundColor={"beige"}
      borderColor={data.eye_color}
    >
      <Image src={imgUrl ?? ""} alt="Character Image" />
      <Flex justify="center" align="center" p="3">
        <Text>{data.name}</Text>
      </Flex>
    </MotionBox>
  );
};

export default CardComponent;
