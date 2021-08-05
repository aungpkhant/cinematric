import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Heading, Stack } from "@chakra-ui/react";

import BrowseLayout from "@/layouts/browse";
import useAsync from "@/hooks/useAsync";
import { searchTmdb } from "@/services/tmdb/common";
import MovieCardSkeleton from "@/components/skeletons/MovieCardSkeleton";
import MovieCard from "@/components/cinema/MovieCard";

const filterMoiveAndTvFromResults = (results) => {
  return results.filter(
    ({ media_type }) => media_type === "tv" || media_type === "movie"
  );
};

// Enum mapping & pass props
const getCard = (data) => ({
  movie: <MovieCard {...data} key={`${data.media_type}-${data.id}`} />,
  tv: <div key={`${data.media_type}-${data.id}`}>Tv SOMETHING</div>,
});

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
          {query.q ? `Results for ${query.q}` : ``}
        </Heading>
      }
    >
      <Stack direction="column" spacing={4}>
        {status === "pending" &&
          new Array(4).fill().map((_, i) => <MovieCardSkeleton key={i} />)}
        {status === "success" &&
          filterMoiveAndTvFromResults(value.data.results).map((result) => {
            return getCard(result)[result.media_type];
          })}
      </Stack>
    </BrowseLayout>
  );
}
