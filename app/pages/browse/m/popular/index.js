import { useEffect, useCallback } from "react";
import { Heading, Center, Stack } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import BrowseLayout from "@/layouts/browse";
import useAsync from "@/hooks/useAsync";
import { getPopularMovies } from "@/services/tmdb/movies";
import Pagination from "@/components/common/Pagination";
import MovieCategoryBar from "@/components/cinema/movies/MovieCategoryBar";
import CardList from "@/components/cinema/CardList";

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
      categoryBar={<MovieCategoryBar />}
    >
      {status === "success" && (
        <Center mb={6}>
          <Pagination
            currentPage={value.data.page}
            totalPages={value.data.total_pages}
            handlePrevPageClick={handlePageChange}
            handleNextPageClick={handlePageChange}
          />
        </Center>
      )}
      <Stack direction="column" spacing={4}>
        {status === "pending" && <CardList loading />}
        {status === "success" && (
          <CardList type="movie" items={value.data.results} />
        )}
      </Stack>
      {status === "success" && (
        <Center mt={6}>
          <Pagination
            currentPage={value.data.page}
            totalPages={value.data.total_pages}
            handlePrevPageClick={handlePageChange}
            handleNextPageClick={handlePageChange}
          />
        </Center>
      )}
    </BrowseLayout>
  );
}
