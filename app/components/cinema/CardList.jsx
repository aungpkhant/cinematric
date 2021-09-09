import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stack, Grid, Skeleton } from "@chakra-ui/react";

import TvCard from "./tv/TvCard";
import CardSkeleton from "../skeletons/CardSkeleton";

import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { useIsoMediaQuery } from "@/hooks/useMediaQuery";

import theme from "@/styles/theme";
import MovieCard from "./movies/MovieCard";

const CardColumnWrapper = ({ children }) => {
  return (
    <Stack direction="column" spacing={"16px"}>
      {children}
    </Stack>
  );
};

const CardColumn = ({ items }) => {
  return (
    <CardColumnWrapper>
      {items.map((item) => {
        const CardToRender = item.media_type === "movie" ? MovieCard : TvCard;
        return <CardToRender key={item.id} {...item} />;
      })}
    </CardColumnWrapper>
  );
};

const CardColumns = ({ items, numOfColumns }) => {
  const deepClonedItems = JSON.parse(JSON.stringify(items));

  const minPerColumn = Math.floor(items.length / numOfColumns);
  const lastColumnWithExtra = items.length % numOfColumns;

  let columns = new Array(numOfColumns)
    .fill(minPerColumn)
    .map((minPerColumn, i) => minPerColumn + (i < lastColumnWithExtra ? 1 : 0));

  return (
    <>
      {columns.map((numOfItems, i) => (
        <CardColumn items={deepClonedItems.splice(0, numOfItems)} key={i} />
      ))}
    </>
  );
};

const LoadingCardColumns = ({ numOfColumns }) => {
  const numOfLoadingCardsPerColumn = 3;

  // Heights for masonry skeletons 2 cols
  const skeletonHeights = [
    {
      0: "360px",
      1: "220px",
      2: "280px",
    },
    {
      0: "220px",
      1: "280px",
      2: "360px",
    },
  ];

  return (
    <>
      {Array(numOfColumns)
        .fill()
        .map((_, colNo) => (
          <CardColumnWrapper key={colNo}>
            {Array(numOfLoadingCardsPerColumn)
              .fill()
              .map((_, rowNo) => {
                return (
                  <Skeleton
                    w="full"
                    h={skeletonHeights[colNo % skeletonHeights.length][rowNo]}
                    rounded="lg"
                    key={rowNo}
                  />
                );
              })}
          </CardColumnWrapper>
        ))}
    </>
  );
};

const CardList = ({ type, loading, items = [] }) => {
  const largerThanMd = useIsoMediaQuery(theme.breakpoints.md);
  const [numOfColumns, setNumOfColumns] = useState(null);
  const masonryBoxRef = useRef(null);
  const masonryBoxDimensions = useContainerDimensions(masonryBoxRef);

  useEffect(() => {
    // https://stackoverflow.com/a/55243400
    const minColWidth = 220;
    const gap = 16;

    const cols = Math.floor(
      (masonryBoxDimensions.width + gap) / (minColWidth + gap)
    );
    setNumOfColumns(cols);
  }, [masonryBoxDimensions]);

  if (largerThanMd) {
    if (loading) {
      return (
        <Grid
          gridGap={"16px"}
          gridTemplateColumns="repeat(auto-fill, minmax(220px,1fr))"
          ref={masonryBoxRef}
        >
          <LoadingCardColumns numOfColumns={numOfColumns} />
        </Grid>
      );
    }
    return (
      <Grid
        gridGap={"16px"}
        gridTemplateColumns="repeat(auto-fill, minmax(220px,1fr))"
        ref={masonryBoxRef}
      >
        <CardColumns items={items} numOfColumns={numOfColumns} />
      </Grid>
    );
  }

  if (loading) {
    <Stack direction="column" spacing={4}>
      {Array(4)
        .fill()
        .map((_, i) => (
          <CardSkeleton key={i} />
        ))}
    </Stack>;
  }

  return (
    <Stack direction="column" spacing={4}>
      {items.map((item) => {
        const CardToRender = item.media_type === "movie" ? MovieCard : TvCard;
        return <CardToRender key={item.id} {...item} />;
      })}
    </Stack>
  );
};

CardList.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool,
  items: PropTypes.array,
};

export default CardList;
