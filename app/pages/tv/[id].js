import { useEffect, useCallback } from "react";
import { Box, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";

import MovieDetailLayout from "@/layouts/movieDetail";
import TvDetail from "@/components/cinema/tv/TvDetail";
import MovieDetailBackdrop from "@/components/cinema/movies/MovieDetailBackdrop";
import MovieBackdropSkeleton from "@/components/skeletons/MovieBackdropSkeleton";
import useAsync from "@/hooks/useAsync";
import { getTvDetail } from "@/services/tmdb/tv";
import FourOFour from "@/components/common/FourOFour";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

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
        <>
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
        </>
      }
    >
      <Box marginTop="-60px" zIndex="10">
        <TvDetail {...tvData} />
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
