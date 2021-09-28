import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Stack, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SideBar from "@/components/common/SideBar";
import Pagination from "@/components/common/Pagination";
import CardList from "@/components/cinema/CardList";

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

const BrowseLayout = ({
  title,
  categoryBar,
  status,
  response,
  withPaginate = true,
  handlePageChange,
}) => {
  const largerThanMd = useIsoMediaQuery(theme.breakpoints.md);

  return (
    <Flex direction="column" flexGrow="1">
      <Box direction="column" mb={2} px={[4, 8]} pt={[4, 6]}>
        <Header />
      </Box>
      {largerThanMd === false && (
        <Box ml={[4, 8]} mt={4}>
          {categoryBar}
        </Box>
      )}
      <ScreenLayoutWrapper title={title}>
        {status === "success" && withPaginate && (
          <Center mb={6}>
            <Pagination
              currentPage={response.data.page}
              totalPages={response.data.total_pages}
              handlePrevPageClick={handlePageChange}
              handleNextPageClick={handlePageChange}
            />
          </Center>
        )}
        <Stack direction="column" spacing={4}>
          {status === "pending" && <CardList loading />}
          {status === "success" && <CardList items={response.data.results} />}
        </Stack>
        {status === "success" && withPaginate && (
          <Center mt={6}>
            <Pagination
              currentPage={response.data.page}
              totalPages={response.data.total_pages}
              handlePrevPageClick={handlePageChange}
              handleNextPageClick={handlePageChange}
            />
          </Center>
        )}
      </ScreenLayoutWrapper>
      <Footer />
    </Flex>
  );
};

export default BrowseLayout;
