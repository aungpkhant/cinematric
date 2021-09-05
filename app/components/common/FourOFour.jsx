import React from "react";
import { Box, Image, VStack, Heading } from "@chakra-ui/react";

import FourOFourSvg from "@/assets/FourOFour/404.svg";

const FourOFour = () => {
  return (
    <VStack w="full" maxW={["300px", "400px"]} mx="auto" mt={6} spacing={8}>
      <Image src={FourOFourSvg.src} />
      <Heading color="gray.500" as="h6" size="md" textAlign="center">
        The page you are looking for cannot be found
      </Heading>
    </VStack>
  );
};

export default FourOFour;
