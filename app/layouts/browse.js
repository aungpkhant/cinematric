import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Stack, Link, Text } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SideBar from "@/components/common/SideBar";

import theme from "@/styles/theme";
import { useIsoMediaQuery } from "@/hooks/useMediaQuery";

const ScreenLayoutWrapper = ({ title, children }) => {
  const largerThanMd = useIsoMediaQuery(theme.breakpoints.md);

  if (largerThanMd === false) {
    return (
      <Flex direction="column" p={[4, 8]} flexGrow="1">
        <Box mb={6}>{title}</Box>
        {children}
      </Flex>
    );
  }

  return (
    <Flex direction="row" m={0} flexGrow="1">
      <SideBar />
      <Flex direction="column" p={[4, 8]} flexGrow="1">
        <Box mb={6}>{title}</Box>
        {children}
      </Flex>
    </Flex>
  );
};

const BrowseLayout = ({ title, categoryBar, children }) => {
  const largerThanMd = useIsoMediaQuery(theme.breakpoints.md);

  return (
    <Flex direction="column" flexGrow="1">
      <Stack direction="column" mb={2} spacing={6} px={[4, 8]} pt={[4, 6]}>
        {/* Brand & Profile bar */}
        <Header />
      </Stack>
      {largerThanMd === false && (
        <Box ml={[4, 8]} mt={4}>
          {categoryBar}
        </Box>
      )}
      <ScreenLayoutWrapper title={title}>{children}</ScreenLayoutWrapper>
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
