import React, { useState } from "react";
import { Flex, HStack } from "@chakra-ui/react";
import CardComponent from "./Card";
import CharacterModal from "./CharacterModal";

const List = ({ data, animalImages }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [charImage, setCharImage] = useState();

  const handleCardClick = (character, image) => {
    setSelectedCharacter(character);
    setCharImage(image);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setCharImage(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <HStack spacing={10}>
        {data?.length && animalImages?.length ? (
          data.map((character, itr) => {
            return (
              <CardComponent
                key={character.id}
                data={character}
                onClick={() => {
                  handleCardClick(character, animalImages[itr]);
                }}
                imgUrl={animalImages[itr] ?? ""}
              />
            );
          })
        ) : (
          <Flex justify="center" align="center" h="75vh">
            No Data Found
          </Flex>
        )}
      </HStack>
      {selectedCharacter && (
        <CharacterModal
          isOpen={!!selectedCharacter}
          onClose={handleCloseModal}
          character={selectedCharacter}
          charImage={charImage}
        />
      )}
    </div>
  );
};

export default List;
