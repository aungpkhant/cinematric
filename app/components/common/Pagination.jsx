import React from "react";
import { Stack, Button, IconButton, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPageClick,
  handleNextPageClick,
}) => {
  return (
    <Stack direction="row" spacing={6} alignItems="center">
      <IconButton
        size="sm"
        icon={<FaChevronLeft />}
        disabled={currentPage === 1}
        onClick={() => handlePrevPageClick(currentPage - 1)}
      />
      <Text fontSize="sm" fontWeight="semibold">
        Page {currentPage} / {totalPages}
      </Text>
      <IconButton
        size="sm"
        icon={<FaChevronRight />}
        disabled={currentPage === totalPages}
        onClick={() => handleNextPageClick(currentPage + 1)}
      />
    </Stack>
  );
};

export default Pagination;
