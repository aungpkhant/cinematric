import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Center,
  Image,
  Flex,
  Heading,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";

import { TMDB_PROFILE_SIZES, TMDB_IMG_BASE_URL } from "@/constants/tmdb";

const CastCard = ({ name, character, profile_path }) => (
  <VStack spacing={4}>
    <Box w="140px" overflow="hidden" borderRadius="lg">
      <Image
        htmlWidth="185"
        htmlHeight="278"
        src={
          profile_path
            ? `${TMDB_IMG_BASE_URL}/${TMDB_PROFILE_SIZES.w185}${profile_path}`
            : ""
        }
      ></Image>
    </Box>
    <Box textAlign="center">
      <Text fontSize="1.1rem" fontWeight="semibold">
        {name}
      </Text>
      <Text mt={2} color="gray.500">
        {character}
      </Text>
    </Box>
  </VStack>
);

CastCard.propTypes = {
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  profile_path: PropTypes.string,
};

const Cast = ({ cast }) => {
  return (
    <Stack direction="row" spacing={4} overflowX="scroll" pb={8}>
      {cast.map((cast_obj) => (
        <CastCard key={cast_obj.cast_id} {...cast_obj} />
      ))}
    </Stack>
  );
};

Cast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default Cast;
