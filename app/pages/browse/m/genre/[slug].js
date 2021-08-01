import React from "react";
import BrowseLayout from "@/layouts/browse";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

import { MOVIE_GENRES } from "@/constants/tmdb";

export default function BrowseMovieGenrePage({ genre }) {
  const router = useRouter();

  return (
    <BrowseLayout
      title={
        <Heading as="h2" size="lg">
          {genre.value} Movies
        </Heading>
      }
    >
      Hello
    </BrowseLayout>
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
