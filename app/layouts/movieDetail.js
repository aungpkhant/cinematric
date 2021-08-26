import React from "react";
import PropTypes from "prop-types";
import { Flex, Stack } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import Footer from "@/components/common/Footer";

const MovieDetailLayout = ({ backdrop, children }) => {
  return (
    <Flex direction="column" flexGrow="1">
      {/* Brand & Profile bar */}
      <Stack p={[4, 8]}>
        <Header />
      </Stack>
      {backdrop}
      <Flex direction="column" p={[4, 8]}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

MovieDetailLayout.propTypes = {
  backdrop: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default MovieDetailLayout;
