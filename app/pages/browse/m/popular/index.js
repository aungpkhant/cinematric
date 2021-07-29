import { useEffect, useCallback } from "react";
import { Center, Stack } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import BrowseLayout from "@/layouts/browse";
import useAsync from "@/hooks/useAsync";
import { getPopularMovies } from "@/services/tmdb/movies";
import MovieCard from "@/components/cinema/MovieCard";
import MovieCardSkeleton from "@/components/skeletons/MovieCardSkeleton";
import Pagination from "@/components/common/Pagination";

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
    <BrowseLayout title="Popular Movies">
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
        {status === "pending" &&
          new Array(4).fill().map((_, i) => <MovieCardSkeleton key={i} />)}
        {status === "success" &&
          value.data.results.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
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