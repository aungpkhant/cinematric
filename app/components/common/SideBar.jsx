import React from "react";
import NextLink from "next/link";
import { Divider, Box, Flex, Stack, Link, Text, Icon } from "@chakra-ui/react";

import { BsBarChartFill } from "react-icons/bs";
import { HiFire } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";

const SubLinkWithIcon = ({ icon, href, text }) => {
  return (
    <NextLink href={href} passHref>
      <Link _hover={{ textDecoration: "none" }}>
        <Flex
          alignItems="center"
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

const ShowMore = ({ handleShowMoreClick, text }) => {
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
        <Icon as={FaChevronDown} w={5} h={5} />
      </Box>
      <Box as="span" fontSize="lg" ml="2" color="gray.500">
        {text}
      </Box>
    </Flex>
  );
};

const SideBar = () => {
  return (
    <Flex
      w="240px"
      as="nav"
      p={8}
      position="sticky"
      top="0"
      alignSelf="flex-start"
    >
      <Stack direction="column" spacing={4} color="gray.100" w="full">
        <NextLink href={"/"} passHref>
          <Link fontSize="2xl" fontWeight="medium">
            Home
          </Link>
        </NextLink>
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
            <ShowMore text="Show Genres" />
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
            <ShowMore text="Show Genres" />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SideBar;
