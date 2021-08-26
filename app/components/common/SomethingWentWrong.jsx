import React from "react";
import { Box, Image, VStack, Heading } from "@chakra-ui/react";

import ErorrSvg from "@/assets/SomeError/error.svg";

const SomethingWentWrong = () => {
  return (
    <VStack w="full" maxW={["300px", "360px"]} mx="auto" mt={6} spacing={8}>
      <Image src={ErorrSvg.src} />
      <Heading color="gray.500" as="h6" size="md" textAlign="center">
        Whoops. Something went wrong
      </Heading>
    </VStack>
  );
};

export default SomethingWentWrong;
