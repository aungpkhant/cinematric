import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = () => {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <NextLink href={"/"} passHref>
        <Heading as="a" size="md">
          Cinematric
        </Heading>
      </NextLink>
    </Flex>
  );
};

export default Header;
