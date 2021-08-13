import React from "react";
import PropTypes from "prop-types";
import { Flex, Stack } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const LandingLayout = ({ children }) => {
  return (
    <Flex direction="column" flexGrow="1">
      <Stack direction="column" mb={2} spacing={6} px={[4, 8]} pt={[4, 6]}>
        {/* Brand & Profile bar */}
        <Header />
      </Stack>
      {children}
      <Footer bg="elevation.200" />
    </Flex>
  );
};

LandingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LandingLayout;
