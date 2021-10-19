import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useRouter } from "next/router";

const SearchBar = () => {
  const { push, query } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    push({ pathname: `/search`, query: { q: searchQuery } });
  };

  useEffect(() => {
    if (query.q) setSearchQuery(query.q);
  }, [query]);

  return (
    <form onSubmit={handleSearchSubmit}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch color="gray.300" />}
        />
        <Input
          type="text"
          size="md"
          placeholder="Find movies, TV shows..."
          bg="gray.700"
          border="initial"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement
          children={
            searchQuery ? (
              <IconButton
                fontSize="18px"
                icon={<MdClear />}
                color="gray.400"
                onClick={(_) => {
                  setSearchQuery("");
                }}
              />
            ) : null
          }
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
