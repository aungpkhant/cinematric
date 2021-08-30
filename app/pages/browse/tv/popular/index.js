import { useEffect, useCallback } from "react";
import { Heading, Center } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import BrowseLayout from "@/layouts/browse";
import useAsync from "@/hooks/useAsync";
import { getPopularTv } from "@/services/tmdb/tv";
import TvCard from "@/components/cinema/tv/TvCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import Pagination from "@/components/common/Pagination";
import TvCategoryBar from "@/components/cinema/tv/TvCategoryBar";
import CardList from "@/components/cinema/CardList";

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
      categoryBar={<TvCategoryBar />}
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

      {status === "pending" && <CardList loading />}
      {status === "success" && <CardList items={value.data.results} />}
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
