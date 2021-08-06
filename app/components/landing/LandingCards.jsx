import React from "react";
import { Flex, Image, Center } from "@chakra-ui/react";

import { TMDB_POSTER_SIZES, TMDB_IMG_BASE_URL } from "@/constants/tmdb";

const LandingCards = () => {
  return (
    <Center>
      <Flex direction="row" pt={8} pb={20}>
        <Image
          src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}/jTswp6KyDYKtvC52GbHagrZbGvD.jpg`}
          borderRadius={8}
          w="25%"
          zIndex="10"
          transform="translate(20px,10px) rotate(-10deg)"
        />
        <Image
          src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}/jTswp6KyDYKtvC52GbHagrZbGvD.jpg`}
          borderRadius={8}
          w="25%"
          zIndex="20"
          transform="translate(12px)"
        />
        <Image
          src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}/jTswp6KyDYKtvC52GbHagrZbGvD.jpg`}
          borderRadius={8}
          w="25%"
          zIndex="15"
          transform="translate(0,10px) rotate(15deg)"
        />
        <Image
          src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}/jTswp6KyDYKtvC52GbHagrZbGvD.jpg`}
          borderRadius={8}
          w="25%"
          zIndex="10"
          transform="translate(-30%,24%) rotate(22deg)"
        />
      </Flex>
    </Center>
  );
};

export default LandingCards;
