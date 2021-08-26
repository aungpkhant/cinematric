import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Stack, useMediaQuery } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import Footer from "@/components/common/Footer";

import theme from "@/styles/theme";

const BrowseLayout = ({ title, categoryBar, children }) => {
  const [largerThanMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  return (
    <Flex direction="column" flexGrow="1">
      <Stack direction="column" mb={2} spacing={6} px={[4, 8]} pt={[4, 6]}>
        {/* Brand & Profile bar */}
        <Header />
        <SearchBar />
      </Stack>
      <Box ml={[4, 8]} mt={4}>
        {categoryBar}
      </Box>
      <Flex direction="column" p={[4, 8]}>
        {title}
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

BrowseLayout.propTypes = {
  title: PropTypes.node.isRequired,
  categoryBar: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default BrowseLayout;
