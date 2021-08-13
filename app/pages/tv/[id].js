import { useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";

import MovieDetailLayout from "@/layouts/movieDetail";
import TvDetail from "@/components/cinema/tv/TvDetail";
import MovieDetailBackdrop from "@/components/cinema/movies/MovieDetailBackdrop";
import MovieBackdropSkeleton from "@/components/skeletons/MovieBackdropSkeleton";
import useAsync from "@/hooks/useAsync";
import { getTvDetail } from "@/services/tmdb/tv";

export default function TVDetailPage() {
  const { pathname, query, isReady, push } = useRouter();

  const memoizedGetTvDetail = useCallback(() => {
    const { id } = query;
    return getTvDetail(id);
  }, [query]);

  const { execute, status, value, error } = useAsync(
    memoizedGetTvDetail,
    isReady
  );

  const backdrops = value?.data?.images?.backdrops;

  return (
    <MovieDetailLayout
      backdrop={
        status === "success" ? (
          <>
            {backdrops.length > 0 ? (
              <SwipeableViews enableMouseEvents>
                {backdrops.map(({ file_path }) => (
                  <MovieDetailBackdrop
                    key={file_path}
                    backdrop_path={file_path}
                  />
                ))}
              </SwipeableViews>
            ) : (
              <MovieDetailBackdrop />
            )}
          </>
        ) : (
          <MovieBackdropSkeleton />
        )
      }
    >
      {status === "success" && (
        <Box marginTop="-60px" zIndex="10">
          <TvDetail {...value.data} />
        </Box>
      )}
    </MovieDetailLayout>
  );
}
