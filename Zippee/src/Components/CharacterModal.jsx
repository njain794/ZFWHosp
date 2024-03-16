import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
  Image,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";

const CharacterModal = ({ isOpen, onClose, character, charImage }) => {
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState(null);
  const [homeworldData, setHomeWorldData] = useState(null);

  useEffect(() => {
    fetchCharacterData(character);
  }, [character]);

  const fetchCharacterData = async (character) => {
    try {
      setLoading(true);
      const response = await fetch(character.url);
      const result = await response.json();
      setCharacterData(result);

      const homeworldResonse = await fetch(result.homeworld);
      const homeworldResult = await homeworldResonse.json();
      setHomeWorldData(homeworldResult);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getFormattedDate = (apiDate) => {
    const date = new Date(apiDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="fit-content" height="fit-content">
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {characterData && !loading ? (
            <HStack spacing={4}>
              <Image src={charImage} alt="Img" mb="4" maxWidth="150px" />
              <VStack align="left" spacing={2}>
                <Text>Height: {characterData.height} meters</Text>
                <Text>Mass: {characterData.mass} kg</Text>
                <Text>
                  Date Added: {getFormattedDate(characterData.created)}
                </Text>
                <Text>No. Of Films: {characterData.films.length}</Text>
                <Text>Birth Year: {characterData.birth_year}</Text>
                <Text>Homeworld Name: {homeworldData.name}</Text>
                <Text>Terrain: {homeworldData.terrain}</Text>
                <Text>Climate: {homeworldData.climate}</Text>
                <Text>Amount of residents: {homeworldData.population}</Text>
              </VStack>
            </HStack>
          ) : (
            <Flex justify="center" align="center" h="75vh">
              <Spinner size="xl" />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterModal;
