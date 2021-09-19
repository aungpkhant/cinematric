import { Box } from "@chakra-ui/react";
import SwipeableViews from "react-swipeable-views";

import Cast from "@/components/cinema/Cast";
import MovieDetailLayout from "@/layouts/movieDetail";
import MovieDetail from "@/components/cinema/movies/MovieDetail";
import MovieDetailBackdrop from "@/components/cinema/movies/MovieDetailBackdrop";
import { getMovieDetail } from "@/services/tmdb/movies";
import FourOFour from "@/components/common/FourOFour";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import CinemaSwipableBackdrop from "@/components/cinema/CinemaSwipableBackdrop";

export default function MovieDetailPage({ movieData }) {
  const backdrops = movieData?.images?.backdrops;

  return (
    <MovieDetailLayout
      backdrop={
        <Box
          w="full"
          position="relative"
          _after={{
            content: `""`,
            position: "absolute",
            bottom: "-4px",
            left: 0,
            right: 0,
            height: "60px",
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0) 100%);",
          }}
        >
          <CinemaSwipableBackdrop backdrops={backdrops} />
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
