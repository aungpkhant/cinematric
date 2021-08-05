import React from "react";
import { IconButton, Heading, Flex, Stack, Box } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import NextLink from "next/link";

const Header = () => {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <NextLink href={"/browse/m/popular"}>
        <Heading as="h1" size="md">
          Cinematric
        </Heading>
      </NextLink>
      <Box>
        <IconButton size="sm" icon={<FaRegUser />} isRound />
      </Box>
    </Flex>
  );
};

export default Header;
