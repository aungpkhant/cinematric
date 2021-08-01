import React from "react";
import PropTypes from "prop-types";
import { Flex, Stack } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import Footer from "@/components/common/Footer";
import CategoryBar from "@/components/common/CategoryBar";

const BrowseLayout = ({ title, children }) => {
  return (
    <Flex direction="column">
      <Stack direction="column" mb={6} spacing={6} px={4} pt={4}>
        {/* Brand & Profile bar */}
        <Header />
        <SearchBar />
        <CategoryBar />
        {title}
      </Stack>
      <Flex direction="column" p={4}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

BrowseLayout.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default BrowseLayout;
