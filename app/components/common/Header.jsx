import React from "react";
import { Box, Heading, IconButton, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { HiMenu } from "react-icons/hi";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <NextLink href={"/"} passHref>
        <Heading as="a" size="md">
          Cinematric
        </Heading>
      </NextLink>
      <Box w="max(40%, 300px)" mr={4} display={["none", "none", "block"]}>
        <SearchBar />
      </Box>
      <IconButton bg="gray.700" aria-label="Menu Button" icon={<HiMenu />} />
    </Flex>
  );
};

export default Header;
