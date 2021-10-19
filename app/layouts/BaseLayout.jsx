import React from "react";
import { Flex, Stack } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const BaseLayout = ({ children }) => {
  return (
    <Flex direction="column" flexGrow="1">
      <Stack direction="column" mb={2} spacing={6} px={[4, 8]} pt={[4, 6]}>
        <Header />
      </Stack>
      {children}
      <Footer bg="elevation.200" />
    </Flex>
  );
};

export default BaseLayout;
