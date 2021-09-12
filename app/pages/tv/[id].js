import { useEffect, useCallback } from "react";
import { Box, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";

import MovieDetailLayout from "@/layouts/movieDetail";
import TvDetail from "@/components/cinema/tv/TvDetail";
import Cast from "@/components/cinema/Cast";
import MovieDetailBackdrop from "@/components/cinema/movies/MovieDetailBackdrop";
import MovieBackdropSkeleton from "@/components/skeletons/MovieBackdropSkeleton";
import useAsync from "@/hooks/useAsync";
import { getTvDetail } from "@/services/tmdb/tv";
import FourOFour from "@/components/common/FourOFour";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

import { useIsoMediaQuery } from "@/hooks/useMediaQuery";

export default function TVDetailPage({ tvData }) {
  // ! Use this instead of NextJs default 404?
  // if (error) {
  //   return (
  //     <MovieDetailLayout backdrop={null}>
  //       {error?.response?.status === 404 ? (
  //         <FourOFour />
  //       ) : (
  //         <SomethingWentWrong />
  //       )}
  //     </MovieDetailLayout>
  //   );
  // }

  const backdrops = tvData?.images?.backdrops;

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
      aside={<TvDetail {...tvData} />}
    >
      <Box mt={6}>
        <Cast cast={tvData?.credits.cast.slice(0, 10)} />
      </Box>
    </MovieDetailLayout>
  );
}

export async function getStaticProps({ params }) {
  try {
    const res = await getTvDetail(params.id);
    if (res.error || !res.data) {
      return { notFound: true };
    }
    return { props: { tvData: res.data } };
  } catch (error) {
    // TODO should return something else if TMDB Api is down?
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: "blocking" };
}
