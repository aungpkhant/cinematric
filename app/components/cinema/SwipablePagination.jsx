import React from "react";
import { Box, Flex, Button, Stack } from "@chakra-ui/react";

const SwipablePagination = ({ numOfDots, currentIndex, handleClickDot }) => {
  return (
    <Stack
      direction="row"
      position="absolute"
      top="16px"
      right="24px"
      zIndex="20"
    >
      {Array(numOfDots)
        .fill()
        .map((_, i) => (
          <Box
            as="button"
            key={i}
            bg={
              i === currentIndex
                ? "rgba(229,26,26, 0.8)"
                : "rgba(226, 232, 240,0.8)"
            }
            borderRadius="50%"
            h="16px"
            w="16px"
            onClick={() => {
              handleClickDot(i);
            }}
          ></Box>
        ))}
    </Stack>
  );
};

{
  /* <Box
  as="button"
  bg="rgba(229,26,26, 0.8)"
  borderRadius="50%"
  h="16px"
  w="16px"
></Box>; */
}

export default SwipablePagination;
