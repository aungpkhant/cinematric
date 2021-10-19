import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import theme from "@/styles/theme";
import { useIsoMediaQuery } from "@/hooks/useMediaQuery";

const CinemaDetailLayout = ({ backdrop, aside, children }) => {
  const largerThanLg = useIsoMediaQuery(theme.breakpoints.lg);

  if (largerThanLg) {
    return (
      <Flex direction="column" flexGrow="1">
        {/* Brand & Profile bar */}
        <Stack py={5} px={[4, 8]}>
          <Header />
        </Stack>
        <Flex>
          <Flex
            direction="column"
            p={[4, 8]}
            w="300px"
            top="0px"
            position="sticky"
            alignSelf="flex-start"
            flexShrink="0"
          >
            {aside}
          </Flex>
          <Flex
            direction="column"
            position="relative"
            flexGrow="1"
            maxW="calc(100vw - 300px)"
          >
            <Box>{backdrop}</Box>
            <Box px={4} pb={6}>
              {children}
            </Box>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    );
  }

  return (
    <Flex direction="column" flexGrow="1">
      {/* Brand & Profile bar */}
      <Stack p={[4, 8]}>
        <Header />
      </Stack>
      {backdrop}
      <Flex direction="column" p={[4, 8]}>
        <Box marginTop="-60px" zIndex="10">
          {aside}
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default CinemaDetailLayout;
