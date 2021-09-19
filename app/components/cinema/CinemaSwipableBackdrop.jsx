import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import SwipeableViews from "react-swipeable-views";

import { TMDB_IMG_BASE_URL, TMDB_BACKDROP_SIZES } from "@/constants/tmdb";
import SwipablePagination from "@/components/cinema/SwipablePagination";

const CinemaSwipableBackdrop = ({ backdrops }) => {
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const handleChangeBackdropIndex = (dotIndex) => {
    setCurrentBackdropIndex(dotIndex);
  };

  if (backdrops.length === 0 || !backdrops) {
    return <></>;
  }

  return (
    <>
      <SwipeableViews
        enableMouseEvents
        index={currentBackdropIndex}
        onChangeIndex={handleChangeBackdropIndex}
      >
        {backdrops.map(({ file_path }) => (
          <Backdrop key={file_path} backdrop_path={file_path} />
        ))}
      </SwipeableViews>
      <SwipablePagination
        numOfDots={backdrops.length}
        currentIndex={currentBackdropIndex}
        handleClickDot={handleChangeBackdropIndex}
      />
    </>
  );
};

const Backdrop = ({ backdrop_path }) => {
  return (
    <Box position="relative">
      <Image
        w="full"
        src={`${TMDB_IMG_BASE_URL}/${TMDB_BACKDROP_SIZES.original}${backdrop_path}`}
        htmlWidth={780}
        htmlHeight={439}
        objectFit="cover"
        minHeight={["400px", "480px", "600px"]}
        maxHeight={["initial", "initial", "initial", "calc(100vh - 64px)"]}
      ></Image>
    </Box>
  );
};

export default CinemaSwipableBackdrop;
