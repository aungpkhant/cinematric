import React, { useCallback } from "react";
import BrowseLayout from "@/layouts/BrowseLayout";
import { useRouter } from "next/router";
import { Heading, Center, Stack } from "@chakra-ui/react";

import useAsync from "@/hooks/useAsync";
import { MOVIE_GENRES } from "@/constants/tmdb";
import { getMoviesByGenre } from "@/services/tmdb/movies";

export default function BrowseMovieGenrePage({ genre }) {
  const { asPath, query, isReady, push } = useRouter();

  const memoizedGetMoviesByGenre = useCallback(() => {
    const { page = 1 } = query;
    return getMoviesByGenre(genre.id, page);
  }, [query, genre]);

  const { execute, status, value, error } = useAsync(
    memoizedGetMoviesByGenre,
    isReady
  );

  const handlePageChange = (newPage) => {
    push({ pathname: asPath.split("?")[0], query: { page: newPage } });
  };

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          {genre.value} Movies
        </Heading>
      }
      status={status}
      response={value}
      handlePageChange={handlePageChange}
    ></BrowseLayout>
  );
}

export async function getStaticProps(context) {
  const genre_key = Object.keys(MOVIE_GENRES).find((genre_key) => {
    return MOVIE_GENRES[genre_key].slug === context.params.slug;
  });

  return {
    props: {
      genre: MOVIE_GENRES[genre_key],
    },
  };
}

export function getStaticPaths() {
  const paths = Object.keys(MOVIE_GENRES).map((genre_key) => ({
    params: { slug: MOVIE_GENRES[genre_key].slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
