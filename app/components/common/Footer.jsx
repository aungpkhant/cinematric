import React from "react";
import { Flex } from "@chakra-ui/react";

const Footer = ({ ...props }) => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      alignItems="center"
      fontSize="sm"
      fontWeight="semibold"
      py={4}
      color="gray.400"
      mt="auto"
      {...props}
    >
      Made with ❤️ by aungpkhant
    </Flex>
  );
};

export default Footer;
