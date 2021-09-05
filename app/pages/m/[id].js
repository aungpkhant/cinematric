import { useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";

import Cast from "@/components/cinema/Cast";
import MovieDetailLayout from "@/layouts/movieDetail";
import MovieDetail from "@/components/cinema/movies/MovieDetail";
import MovieDetailBackdrop from "@/components/cinema/movies/MovieDetailBackdrop";
import { getMovieDetail } from "@/services/tmdb/movies";
import FourOFour from "@/components/common/FourOFour";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

export default function MovieDetailPage({ movieData }) {
  const backdrops = movieData?.images?.backdrops;

  return (
    <MovieDetailLayout
      backdrop={
        <Box w="full">
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
        </Box>
      }
      aside={<MovieDetail {...movieData} />}
    >
      <Box mt={6}>
        <Cast cast={movieData?.credits.cast.slice(0, 10)} />
      </Box>
    </MovieDetailLayout>
  );
}

export async function getStaticProps({ params }) {
  try {
    const res = await getMovieDetail(params.id);
    if (res.error || !res.data) {
      return { notFound: true };
    }
    return { props: { movieData: res.data } };
  } catch (error) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: "blocking" };
}
