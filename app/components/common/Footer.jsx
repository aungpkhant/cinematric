import React from "react";
import { Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      alignItems="center"
      mt={6}
      fontSize="sm"
      fontWeight="semibold"
    >
      Made with ❤️ by aungpkhant
    </Flex>
  );
};

export default Footer;
