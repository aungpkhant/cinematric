import React, { useState } from "react";
import NextLink from "next/link";
import { Divider, Box, Flex, Stack, Link, Text, Icon } from "@chakra-ui/react";

import { BsBarChartFill } from "react-icons/bs";
import { HiFire, HiTag } from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { MOVIE_GENRES, TV_GENRES } from "@/constants/tmdb";
import { useAppUiState } from "@/hooks/useAppUiState";

const SubLinkWithIcon = ({ icon, href, text, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Link {...props} _hover={{ textDecoration: "none" }}>
        <Flex
          alignItems="center"
          w="full"
          _hover={{
            "& .sidebar__icon-container__hover": {
              color: "gray.700",
              bg: "gray.100",
            },
          }}
        >
          <Box
            as="span"
            className="sidebar__icon-container__hover"
            display="flex"
            alignItems="center"
            bg={"gray.700"}
            p={1.5}
            borderRadius="md"
            transition="background-color 0.25s ease"
          >
            <Icon as={icon} w={5} h={5} />
          </Box>
          <Box as="span" fontSize="lg" ml="2">
            {text}
          </Box>
        </Flex>
      </Link>
    </NextLink>
  );
};

const ShowHideButton = ({ shouldShowMore, handleShowHideClick, text }) => {
  return (
    <Flex
      alignItems="center"
      role="button"
      _hover={{
        "& .sidebar__icon-container__hover": {
          color: "gray.700",
          bg: "gray.100",
        },
      }}
      onClick={handleShowHideClick}
    >
      <Box
        as="span"
        className="sidebar__icon-container__hover"
        display="flex"
        alignItems="center"
        bg={"gray.700"}
        p={1.5}
        borderRadius="md"
        color="gray.500"
        transition="background-color 0.25s ease"
      >
        <Icon as={shouldShowMore ? FaChevronUp : FaChevronDown} w={5} h={5} />
      </Box>
      <Box as="span" fontSize="lg" ml="2" color="gray.500">
        {text}
      </Box>
    </Flex>
  );
};

const MovieGenreButtons = ({ shouldDisplay }) => {
  return (
    <>
      <Divider
        borderColor="gray.500"
        display={shouldDisplay ? "block" : "none"}
      />
      {Object.values(MOVIE_GENRES).map(({ id, slug, value }) => (
        <SubLinkWithIcon
          key={id}
          href={`/browse/m/genre/${slug}`}
          text={value}
          icon={HiTag}
          display={shouldDisplay ? "block" : "none"}
        />
      ))}
    </>
  );
};

const TvGenreButtons = ({ shouldDisplay }) => {
  return (
    <>
      <Divider
        borderColor="gray.500"
        display={shouldDisplay ? "block" : "none"}
      />
      {Object.values(TV_GENRES).map(({ id, slug, value }) => (
        <SubLinkWithIcon
          key={id}
          href={`/browse/tv/genre/${slug}`}
          text={value}
          icon={HiTag}
          display={shouldDisplay ? "block" : "none"}
        />
      ))}
    </>
  );
};

const SideBar = () => {
  const {
    appUiState,
    toggleSidebarMovieGenresExpansion,
    toggleSidebarTvGenresExpansion,
  } = useAppUiState();

  return (
    <Flex
      minW="240px"
      w="240px"
      as="nav"
      p={8}
      position="sticky"
      alignSelf="flex-start"
    >
      <Stack direction="column" spacing={4} color="gray.100" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="medium">
            Movies
          </Text>
          <Stack pt={2} spacing={3} w="full">
            <SubLinkWithIcon
              href="/browse/m/popular"
              text="Popular"
              icon={BsBarChartFill}
            />
            <SubLinkWithIcon href="/" text="Upcoming" icon={HiFire} />
            <MovieGenreButtons
              shouldDisplay={appUiState.sidebarMovieGenresExpanded}
            />
            <ShowHideButton
              text={
                appUiState.sidebarMovieGenresExpanded ? "Hide" : "Show Genres"
              }
              shouldShowMore={appUiState.sidebarMovieGenresExpanded}
              handleShowHideClick={toggleSidebarMovieGenresExpansion}
            />
          </Stack>
        </Box>
        <Divider borderColor="gray.500" />
        <Box>
          <Text fontSize="2xl" fontWeight="medium">
            TV Shows
          </Text>
          <Stack pt={2} spacing={3} w="full">
            <SubLinkWithIcon
              href="/browse/tv/popular"
              text="Popular"
              icon={BsBarChartFill}
            />
            <SubLinkWithIcon href="/" text="Upcoming" icon={HiFire} />
            <TvGenreButtons
              shouldDisplay={appUiState.sidebarTvGenresExpanded}
            />
            <ShowHideButton
              text={appUiState.sidebarTvGenresExpanded ? "Hide" : "Show Genres"}
              shouldShowMore={appUiState.sidebarTvGenresExpanded}
              handleShowHideClick={toggleSidebarTvGenresExpansion}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SideBar;
