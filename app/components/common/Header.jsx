import React from "react";
import {
  IconButton,
  Heading,
  Flex,
  Stack,
  Box,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import NextLink from "next/link";

const Header = () => {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <NextLink href={"/"}>
        <Heading as="h1" size="md">
          Cinematric
        </Heading>
      </NextLink>
    </Flex>
  );
};

export default Header;
