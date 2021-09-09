import { useCallback } from "react";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import BrowseLayout from "@/layouts/BrowseLayout";
import useAsync from "@/hooks/useAsync";
import { getPopularTv } from "@/services/tmdb/tv";
import TvCategoryBar from "@/components/cinema/tv/TvCategoryBar";

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
          Popular TV Shows
        </Heading>
      }
      categoryBar={<TvCategoryBar />}
      status={status}
      response={value}
      handlePageChange={handlePageChange}
    ></BrowseLayout>
  );
}
