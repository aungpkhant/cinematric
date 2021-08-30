import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Stack, Link, Text } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import Footer from "@/components/common/Footer";

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
      <Flex
        w="240px"
        as="nav"
        p={8}
        position="sticky"
        top="0"
        alignSelf="flex-start"
      >
        <Stack direction="column" spacing={4} color="gray.200">
          <Link fontSize="2xl" fontWeight="medium">
            Home
          </Link>
          <Link fontSize="2xl" fontWeight="medium">
            Popular
          </Link>
          <Link fontSize="2xl" fontWeight="medium">
            Upcoming
          </Link>
          <Text fontSize="2xl" fontWeight="medium">
            Genres
          </Text>
        </Stack>
      </Flex>
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
        <SearchBar />
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
