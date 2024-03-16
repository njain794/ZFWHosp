import React from "react";
import { Input, HStack, Select } from "@chakra-ui/react";

function Header({
  setSearchField,
  homeWorldNames,
  setSelectedHomeWorld,
  selectedHomeWorld,
  searchField,
}) {
  return (
    <div style={{ padding: "25px" }}>
      <HStack spacing={10}>
        <Input
          type="text"
          placeholder="Search Character"
          border="1px solid #949494"
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
          value={searchField}
          width={"35rem"}
          backgroundColor={"white"}
        />
        <Select
          placeholder="Select Homeworld Name"
          backgroundColor={"white"}
          onChange={(e) => {
            setSelectedHomeWorld(e.currentTarget.value);
          }}
          value={selectedHomeWorld}
          width={"35rem"}
        >
          {homeWorldNames.map((name, i) => {
            return (
              <option value={name} key={i}>
                {name}
              </option>
            );
          })}
        </Select>
      </HStack>
    </div>
  );
}

export default Header;
