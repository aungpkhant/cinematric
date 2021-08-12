import React from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import { Flex, Stack } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Flex direction="row">
      <Skeleton w="45%" h="100px" flexShrink="0" />
      <Stack direction="column" w="full" pl={3} py={1} spacing={3}>
        <Skeleton h="10px" w="60%" />
        <Skeleton h="10px" w="100%" />
        <Skeleton h="10px" w="100%" />
        <Skeleton h="10px" w="100%" />
      </Stack>
    </Flex>
  );
};

export default CardSkeleton;
