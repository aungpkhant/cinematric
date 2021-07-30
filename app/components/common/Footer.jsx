import React from "react";
import { Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      alignItems="center"
      mt={4}
      fontSize="sm"
      fontWeight="semibold"
      py={4}
      color="gray.400"
    >
      Made with ❤️ by aungpkhant
    </Flex>
  );
};

export default Footer;
