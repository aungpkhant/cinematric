import React from "react";
import { Box, Flex } from "@chakra-ui/react";

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

const AppLayout = ({ title, children }) => {
  return (
    <Flex direction="column" flexGrow="1">
      <Box direction="column" mb={2} px={[4, 8]} pt={[4, 6]}>
        <Header />
      </Box>
      <ScreenLayoutWrapper title={title}>{children}</ScreenLayoutWrapper>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
