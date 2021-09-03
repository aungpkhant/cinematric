import React from "react";
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
import { mapTvGenreIdToGenre } from "@/utils/tv";
import Poster404 from "@/assets/FourOFour/poster-404.jpg";

const TvCard = ({
  id,
  name,
  genre_ids,
  overview,
  vote_average,
  poster_path,
}) => {
  return (
    <NextLink href={`/tv/${id}`}>
      <a>
        <Flex direction={["row", "row", "column"]}>
          <Box
            w={["45%", "45%", "100%"]}
            flexShrink="0"
            borderRadius={["12px", "12px", "12px 12px 0 0"]}
            overflow="hidden"
          >
            <Image
              src={
                poster_path
                  ? `${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}${poster_path}`
                  : Poster404.src
              }
              htmlWidth={342}
              htmlHeight={513}
              alt=""
            />
          </Box>
          <Flex
            direction="column"
            w="full"
            pl={3}
            pr={(0, 0, 3)}
            py={3}
            bg={["initial", "initial", "elevation.200"]}
            borderRadius={["0", "0", "0 0 12px 12px"]}
          >
            <Box flexGrow="1">
              <Heading as="h3" fontSize={["sm", "sm", "xl"]} noOfLines={2}>
                {name}
              </Heading>
              <Stack mt={3}>
                <Text
                  fontSize={["xs", "sm", "md"]}
                  color="gray.400"
                  noOfLines={2}
                >
                  {genre_ids.map(mapTvGenreIdToGenre).join(", ")}
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
            <Box flexShrink="0" display={["initial", "initial", "none"]}>
              <Button
                isFullWidth
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                }}
                colorScheme="apple"
                color="apple.800"
              >
                Watch Trailer
              </Button>
            </Box>
          </Flex>
        </Flex>
      </a>
    </NextLink>
  );
};

export default TvCard;