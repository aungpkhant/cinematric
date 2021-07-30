import { useEffect, useCallback } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  VStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import MovieDetailLayout from "@/layouts/movieDetail";
import useAsync from "@/hooks/useAsync";
import { getMovieDetail } from "@/services/tmdb/movies";
import { TMDB_IMG_BASE_URL, TMDB_BACKDROP_SIZES } from "@/constants/tmdb";

export default function MovieDetailPage() {
  const { pathname, query, isReady, push } = useRouter();

  const memoizedGetMovieDetail = useCallback(() => {
    const { id } = query;
    return getMovieDetail(id);
  }, [query]);

  const { execute, status, value, error } = useAsync(
    memoizedGetMovieDetail,
    isReady
  );

  return (
    <MovieDetailLayout
      backdrop={
        <Box
          w="full"
          h="400px"
          backgroundImage={
            value?.data?.backdrop_path
              ? `url('${TMDB_IMG_BASE_URL}/${TMDB_BACKDROP_SIZES.w780}${value.data.backdrop_path}')`
              : ""
          }
          backgroundSize="cover"
          backgroundPosition="center"
        ></Box>
      }
    >
      {status === "success" && (
        <>
          <Stack direction="column" spacing={4}>
            <Heading fontSize="1.4rem" textAlign="center">
              {value.data.title}
            </Heading>
            <Text textAlign="center" color="gray.500">
              2020 | Action, Fantasy | 2h 40m
            </Text>
          </Stack>
          <Stack spacing={6} pt={8}>
            <Text fontWeight="semibold" fontSize="lg" color="gray.500">
              {value.data.tagline}
            </Text>
            <Stack spacing={4}>
              <Heading as="h6" size="md">
                Plot Summary
              </Heading>
              <Text color="gray.500">{value.data.overview}</Text>
            </Stack>
            <Stack spacing={4}>
              <Heading as="h6" size="md">
                Cast
              </Heading>
            </Stack>
          </Stack>
        </>
      )}
    </MovieDetailLayout>
  );
}
