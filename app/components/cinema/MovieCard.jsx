import React from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Stack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import NextLink from "next/link";

import { TMDB_IMG_BASE_URL, TMDB_POSTER_SIZES } from "@/constants/tmdb";
import { mapGenreIdToGenre } from "@/utils/movies";

const MovieCard = ({
  id,
  title,
  genre_ids,
  overview,
  vote_average,
  poster_path,
}) => {
  return (
    <NextLink href={`/m/${id}`}>
      <a>
        <Flex direction="row">
          <Box w="45%" flexShrink="0">
            <Image
              src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}${poster_path}`}
              htmlWidth={342}
              htmlHeight={513}
              borderRadius={8}
            />
          </Box>
          <Flex direction="column" w="full" pl={3} py={3}>
            <Box flexGrow="1">
              <Heading as="h3" size="xs" noOfLines={2}>
                {title}
              </Heading>
              <Stack mt={3}>
                <Text fontSize="xs" color="gray.400" noOfLines={2}>
                  {genre_ids.map(mapGenreIdToGenre).join(", ")}
                </Text>
              </Stack>
              {vote_average ? (
                <Flex direction="row" mt={3}>
                  <Icon as={FaStar} mr="2" color="yellow.400"></Icon>
                  <Text fontSize="xs" fontWeight="semibold">
                    {vote_average}
                  </Text>
                </Flex>
              ) : null}
            </Box>
            <Box flexShrink="0">
              <Button isFullWidth size="sm">
                Watch Trailer
              </Button>
            </Box>
          </Flex>
        </Flex>
      </a>
    </NextLink>
  );
};

export default MovieCard;
