import React from "react";
import PropTypes from "prop-types";
import { Badge, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { MOVIE_CATEGORIES } from "@/constants/tmdb";

const CategoryBadge = ({ isActive, href, children }) => {
  return (
    <NextLink href={href}>
      <a>
        <Badge
          fontSize="md"
          px={2}
          py={1}
          borderRadius="md"
          textTransform="initial"
          colorScheme={isActive ? "apple" : "gray"}
        >
          {children}
        </Badge>
      </a>
    </NextLink>
  );
};

CategoryBadge.propTypes = {
  isActive: PropTypes.bool,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const MovieCategoryBar = () => {
  const router = useRouter();

  let currentCategory = null;

  if (router.pathname === "/browse/m/genre/[slug]") {
    currentCategory = router.query.slug;
  } else if (router.pathname === "/browse/m/popular") {
    currentCategory = "popular";
  }

  const currentCategoryObj = MOVIE_CATEGORIES.find(
    ({ slug }) => slug === currentCategory
  );

  return (
    <Stack
      direction="row"
      overflowX="auto"
      // TODO test different browsers
      css={{
        "&::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
      }}
    >
      {
        <CategoryBadge isActive href={currentCategoryObj.path}>
          {currentCategoryObj.value}
        </CategoryBadge>
      }
      {MOVIE_CATEGORIES.filter(({ slug }) => slug !== currentCategory).map(
        (category) => (
          <CategoryBadge key={category.slug} href={category.path}>
            {category.value}
          </CategoryBadge>
        )
      )}
    </Stack>
  );
};

export default MovieCategoryBar;
