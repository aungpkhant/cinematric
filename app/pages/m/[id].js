import { useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import MovieDetailLayout from "@/layouts/movieDetail";
import MovieDetail from "@/components/cinema/MovieDetail";
import MovieDetailBackdrop from "@/components/cinema/MovieDetailBackdrop";
import MovieBackdropSkeleton from "@/components/skeletons/MovieBackdropSkeleton";
import useAsync from "@/hooks/useAsync";
import { getMovieDetail } from "@/services/tmdb/movies";

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
        status === "success" ? (
          <MovieDetailBackdrop backdrop_path={value.data.backdrop_path} />
        ) : (
          <MovieBackdropSkeleton />
        )
      }
    >
      {status === "success" && (
        <Box marginTop="-60px" zIndex="10">
          <MovieDetail {...value.data} />
        </Box>
      )}
    </MovieDetailLayout>
  );
}
