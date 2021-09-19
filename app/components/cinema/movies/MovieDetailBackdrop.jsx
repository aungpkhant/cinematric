import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { TMDB_IMG_BASE_URL, TMDB_BACKDROP_SIZES } from "@/constants/tmdb";

import theme from "@/styles/theme";

console.log(theme.breakpoints);

const MovieDetailBackdrop = ({ backdrop_path }) => {
  return (
    <Box position="relative">
      <Image
        w="full"
        src={`${TMDB_IMG_BASE_URL}/${TMDB_BACKDROP_SIZES.original}${backdrop_path}`}
        htmlWidth={780}
        htmlHeight={439}
        objectFit="cover"
        minHeight={["400px", "480px", "600px"]}
      ></Image>
    </Box>
  );
};

export default MovieDetailBackdrop;
