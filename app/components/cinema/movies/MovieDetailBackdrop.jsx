import React from "react";
import { Box } from "@chakra-ui/react";
import { TMDB_IMG_BASE_URL, TMDB_BACKDROP_SIZES } from "@/constants/tmdb";

const MovieDetailBackdrop = ({ backdrop_path }) => {
  return (
    <Box
      position="relative"
      w="full"
      h={["400px", "480px", "600px", "calc(100vh - 64px)"]}
      backgroundImage={
        backdrop_path
          ? `url('${TMDB_IMG_BASE_URL}/${TMDB_BACKDROP_SIZES.w780}${backdrop_path}')`
          : ""
      }
      backgroundSize="cover"
      backgroundPosition="center"
      overflowY="hidden"
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
    ></Box>
  );
};

export default MovieDetailBackdrop;
