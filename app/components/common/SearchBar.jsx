import React from "react";

import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<FaSearch color="gray.300" />}
      />
      <Input
        type="text"
        size="md"
        placeholder="Find movies, TV shows..."
        bg="elevation.200"
        border="initial"
      />
    </InputGroup>
  );
};

export default SearchBar;
