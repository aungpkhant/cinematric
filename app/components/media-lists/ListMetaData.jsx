import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { formatDateTimeToHumanReadable } from "@/utils/functions";

const ListMetaData = ({ updatedAt, count }) => {
  return (
    <Box mb={6}>
      <Text mb={2} color="gray.400">
        Updated {formatDateTimeToHumanReadable(updatedAt)}
      </Text>
      <Text color="gray.400">{count} listings</Text>
    </Box>
  );
};

export default ListMetaData;
