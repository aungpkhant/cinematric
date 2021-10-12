import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const ListMetaData = ({ updatedAt }) => {
  return (
    <Box>
      <Text mb={4} color="gray.400">
        Updated {format(new Date(updatedAt), "MMM dd yyyy 'at' H:mmaaa")}
      </Text>
    </Box>
  );
};

export default ListMetaData;
