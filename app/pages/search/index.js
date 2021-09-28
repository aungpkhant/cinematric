import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Stack } from "@chakra-ui/react";

import BrowseLayout from "@/layouts/BrowseLayout";
import useAsync from "@/hooks/useAsync";
import { searchTmdb } from "@/services/tmdb/common";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import MovieCard from "@/components/cinema/movies/MovieCard";
import TvCard from "@/components/cinema/tv/TvCard";

export default function SearchPage() {
  const { pathname, query } = useRouter();

  const memoizedSearchTmdb = useCallback(() => {
    return searchTmdb(query.q);
  }, [query.q]);

  const { execute, status, value, error } = useAsync(memoizedSearchTmdb, false);

  useEffect(() => {
    if (!query.q) {
      return;
    } else {
      execute();
    }
  }, [execute, query.q]);

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          Results for -{" "}
          {query.q ? (
            <Box as="span" fontStyle="italic">
              {query.q}
            </Box>
          ) : (
            ``
          )}
        </Heading>
      }
      status={status}
      response={value}
      withPaginate={false}
    ></BrowseLayout>
  );
}
