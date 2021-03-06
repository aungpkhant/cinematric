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
import { format, parseISO } from "date-fns";

import { TMDB_IMG_BASE_URL, TMDB_POSTER_SIZES } from "@/constants/tmdb";
import { mapMovieGenreIdToGenre } from "@/utils/movies";
import Poster404 from "@/assets/FourOFour/poster-404.jpg";
import AddToListButton from "@/components/media-lists/AddToListButton";

const MovieCard = ({
  id,
  title,
  genre_ids,
  overview,
  vote_average,
  poster_path,
  release_date,
  media_type,
}) => {
  return (
    <NextLink href={`/m/${id}`}>
      <a>
        <Flex direction={["row", "row", "column"]}>
          <Box
            w={["45%", "45%", "100%"]}
            flexShrink="0"
            borderRadius={8}
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
                {title}
              </Heading>
              <Stack mt={3}>
                <Text fontSize={["sm", "md"]} color="gray.400" noOfLines={2}>
                  {genre_ids.map(mapMovieGenreIdToGenre).join(", ")}
                </Text>
              </Stack>
              {release_date ? (
                <Box my={3}>
                  <Text color="gray.400" fontSize={["sm", "md"]}>
                    {format(parseISO(release_date), "PP")}
                  </Text>
                </Box>
              ) : null}
              <Flex direction="row" mt={3} marginTop="auto" pb={[4, 4, 0]}>
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
              </Flex>
            </Flex>
            <Box flexShrink="0" display={["initial", "initial", "none"]}>
              <AddToListButton media_id={id} media_type={media_type}>
                Add to Movie List
              </AddToListButton>
            </Box>
          </Flex>
        </Flex>
      </a>
    </NextLink>
  );
};

export default MovieCard;
