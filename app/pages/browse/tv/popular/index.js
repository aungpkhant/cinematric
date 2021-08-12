import { useEffect, useCallback } from "react";
import { Heading, Center, Stack } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import BrowseLayout from "@/layouts/browse";
import useAsync from "@/hooks/useAsync";
import { getPopularTv } from "@/services/tmdb/tv";
import TvCard from "@/components/cinema/TvCard";
import MovieCardSkeleton from "@/components/skeletons/MovieCardSkeleton";
import Pagination from "@/components/common/Pagination";

export default function PopularTvPage() {
  const { pathname, query, isReady, push } = useRouter();

  const memoizedGetPopularTv = useCallback(() => {
    const { page = 1 } = query;
    return getPopularTv(page);
  }, [query]);

  const { execute, status, value, error } = useAsync(
    memoizedGetPopularTv,
    isReady
  );

  const handlePageChange = (newPage) => {
    push({ pathname, query: { page: newPage } });
  };

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          Popular Tv Shows
        </Heading>
      }
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
        {status === "pending" &&
          new Array(4).fill().map((_, i) => <MovieCardSkeleton key={i} />)}
        {status === "success" &&
          value.data.results.map((tv) => <TvCard key={tv.id} {...tv} />)}
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
