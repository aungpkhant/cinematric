import React from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import { Flex, Stack } from "@chakra-ui/react";

const MediaListSkeleton = () => {
  return (
    <Stack direction="column" w="full" spacing={4}>
      <Skeleton h="16px" w="60%" />
      <Skeleton h="16px" w="100%" />
      <Skeleton h="16px" w="100%" />
      <Skeleton h="16px" w="100%" />
    </Stack>
  );
};

export default MediaListSkeleton;
