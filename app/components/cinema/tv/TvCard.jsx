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
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import { parseISO, format } from "date-fns";

import { TMDB_IMG_BASE_URL, TMDB_POSTER_SIZES } from "@/constants/tmdb";
import { mapTvGenreIdToGenre } from "@/utils/tv";
import Poster404 from "@/assets/FourOFour/poster-404.jpg";

const TvCard = ({
  id,
  name,
  genre_ids,
  overview,
  first_air_date,
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
              srcSet={
                poster_path
                  ? `${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}${poster_path}, ${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w500}${poster_path} 1.5x, ${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w780}${poster_path} 2x`
                  : Poster404.src
              }
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
            <Flex direction="column" flexGrow="1">
              <Heading as="h3" fontSize={["md", "md", "xl"]} noOfLines={2}>
                {name}
              </Heading>
              <Stack mt={3}>
                <Text fontSize={["sm", "md"]} color="gray.400" noOfLines={2}>
                  {genre_ids.map(mapTvGenreIdToGenre).join(", ")}
                </Text>
              </Stack>
              {first_air_date ? (
                <Box my={3}>
                  <Text color="gray.400" fontSize={["sm", "md"]}>
                    <Tooltip label="Date when the show first aired">
                      <span>
                        <Icon
                          as={FaInfoCircle}
                          display="inline"
                          mr="2"
                          color="gray.400"
                          fontSize="md"
                          position="relative"
                          top="-1px"
                        ></Icon>
                      </span>
                    </Tooltip>
                    {format(parseISO(first_air_date), "PP")}
                  </Text>
                </Box>
              ) : null}
              <Flex direction="row" w="100%" marginTop="auto" pb={[4, 4, 0]}>
                <Text fontWeight="semibold" fontSize="md" color="gray.400">
                  <Icon
                    as={FaStar}
                    display="inline"
                    mr="2"
                    color="yellow.400"
                    fontSize="md"
                    position="relative"
                    top="-2px"
                  ></Icon>
                  {vote_average ? vote_average : "-"}
                </Text>
                <Badge
                  position="relative"
                  ml="auto"
                  fontSize="inherit"
                  bg="inherit"
                  variant="outline"
                  fontSize="md"
                  colorScheme="gray"
                  px={1.5}
                  top="-2px"
                >
                  TV
                </Badge>
              </Flex>
            </Flex>
            <Box flexShrink="0" display={["initial", "initial", "none"]}>
              <Button
                isFullWidth
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                }}
                colorScheme="blue"
                color="blue.800"
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
