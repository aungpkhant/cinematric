import React from "react";
import { IconButton, Heading, Flex, Stack, Box } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";

import SearchBar from "@/components/common/SearchBar";
import Footer from "@/components/common/Footer";

const BrowseLayout = ({ title = "Default", children }) => {
  return (
    <Flex direction="column" p={4}>
      <Stack direction="column" mb={6} spacing={6}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" size="md">
            Cinematric
          </Heading>
          <Box>
            <IconButton size="sm" icon={<FaRegUser />} isRound />
          </Box>
        </Flex>
        <SearchBar />
        <Heading as="h4" size="sm">
          {title}
        </Heading>
      </Stack>
      {children}
      <Footer />
    </Flex>
  );
};

export default BrowseLayout;
