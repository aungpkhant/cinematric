import React, { useCallback } from "react";
import BrowseLayout from "@/layouts/BrowseLayout";
import { useRouter } from "next/router";
import { Heading, Center, Stack } from "@chakra-ui/react";

import useAsync from "@/hooks/useAsync";
import { TV_GENRES } from "@/constants/tmdb";
import { getTvByGenre } from "@/services/tmdb/tv";

export default function BrowseTvGenrePage({ genre }) {
  const { asPath, query, isReady, push } = useRouter();

  const memoizedGetTvByGenre = useCallback(() => {
    const { page = 1 } = query;
    return getTvByGenre(genre.id, page);
  }, [query, genre]);

  const { execute, status, value, error } = useAsync(
    memoizedGetTvByGenre,
    isReady
  );

  const handlePageChange = (newPage) => {
    push({ pathname: asPath.split("?")[0], query: { page: newPage } });
  };

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          {genre.value} TV Shows
        </Heading>
      }
      status={status}
      response={value}
      handlePageChange={handlePageChange}
    ></BrowseLayout>
  );
}

export async function getStaticProps(context) {
  const genre_key = Object.keys(TV_GENRES).find((genre_key) => {
    return TV_GENRES[genre_key].slug === context.params.slug;
  });

  return {
    props: {
      genre: TV_GENRES[genre_key],
    },
  };
}

export function getStaticPaths() {
  const paths = Object.keys(TV_GENRES).map((genre_key) => ({
    params: { slug: TV_GENRES[genre_key].slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
