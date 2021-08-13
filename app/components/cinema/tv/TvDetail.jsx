import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import TvCast from "@/components/cinema/tv/TvCast";

const MovieDetail = ({
  title,
  tagline,
  overview,
  vote_average,
  genres,
  first_air_date,
  episode_run_time,
  credits,
}) => {
  return (
    <Box>
      <Stack direction="column" spacing={4}>
        <Heading fontSize="1.4rem" textAlign="center">
          {title}
        </Heading>
        <Text textAlign="center" color="gray.500">
          {`${first_air_date}  •  ${episode_run_time?.[0]} min/ep  •  Rated ${vote_average} / 10`}
        </Text>
        <Text textAlign="center" color="gray.500">
          {genres.map(({ name }) => name).join(", ")}
        </Text>
      </Stack>
      <Stack spacing={6} pt={6}>
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
          <TvCast cast={credits.cast.slice(0, 10)} />
        </Stack>
      </Stack>
    </Box>
  );
};

MovieDetail.propTypes = {
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.array,
  first_air_date: PropTypes.string,
  vote_average: PropTypes.number.isRequired,
  episode_run_time: PropTypes.array.isRequired,
};

export default MovieDetail;
