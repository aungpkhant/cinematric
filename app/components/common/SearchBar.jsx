import React, { useState, useEffect } from "react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
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
          bg="elevation.200"
          border="initial"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
