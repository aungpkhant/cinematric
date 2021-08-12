import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Center,
  Flex,
  Heading,
  VStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { formatRuntime } from "@/utils/movies";
import Cast from "@/components/cinema/Cast";
import { mapMovieGenreIdToGenre } from "@/utils/movies";

const MovieDetail = ({
  title,
  tagline,
  overview,
  vote_average,
  genres,
  release_date,
  runtime,
  credits,
}) => {
  return (
    <Box>
      <Stack direction="column" spacing={4}>
        <Heading fontSize="1.4rem" textAlign="center">
          {title}
        </Heading>
        <Text textAlign="center" color="gray.500">
          {`${release_date.split("-")[0]}  •  ${formatRuntime(
            runtime
          )}  •  Rated ${vote_average} / 10`}
        </Text>
        <Text textAlign="center" color="gray.500">
          {genres.map(({ name }) => name).join(", ")}
        </Text>
      </Stack>
      <Stack spacing={6} pt={3}>
        <Text fontWeight="semibold" fontSize="lg" color="gray.500">
          {tagline}
        </Text>
        <Stack spacing={4}>
          <Heading as="h6" size="md">
            Plot Summary
          </Heading>
          <Text color="gray.500">{overview}</Text>
        </Stack>
        <Stack spacing={4}>
          <Heading as="h6" size="md">
            Cast
          </Heading>
          <Cast cast={credits.cast.slice(0, 10)} />
        </Stack>
        {/* <Stack spacing={4}>
          <Heading as="h6" size="md">
            Trailers & Teasers
          </Heading>
        </Stack> */}
      </Stack>
    </Box>
  );
};

MovieDetail.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.array,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
};

export default MovieDetail;
