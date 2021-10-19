import { useCallback } from "react";
import { Heading, Center, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import BrowseLayout from "@/layouts/BrowseLayout";
import useAsync from "@/hooks/useAsync";
import { getPopularMovies } from "@/services/tmdb/movies";

export default function PopularMoviesPage() {
  const { pathname, query, isReady, push } = useRouter();

  const memoizedGetPopularMovies = useCallback(() => {
    const { page = 1 } = query;
    return getPopularMovies(page);
  }, [query]);

  const { execute, status, value, error } = useAsync(
    memoizedGetPopularMovies,
    isReady
  );

  const handlePageChange = (newPage) => {
    push({ pathname, query: { page: newPage } });
  };

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          Popular Movies
        </Heading>
      }
      status={status}
      response={value}
      handlePageChange={handlePageChange}
    ></BrowseLayout>
  );
}
