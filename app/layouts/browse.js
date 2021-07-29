import React from "react";

import { Flex } from "@chakra-ui/react";

const BrowseLayout = ({ children }) => {
  return (
    <Flex direction="column" p={4}>
      {children}
    </Flex>
  );
};

export default BrowseLayout;
