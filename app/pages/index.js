import LandingLayout from "@/layouts/landing";
import { Button, Flex, Stack, Heading, Box } from "@chakra-ui/react";
import NextLink from "next/link";

import LandingCards from "@/components/landing/LandingCards";

export default function LandingPage({ children }) {
  return (
    <LandingLayout>
      <Flex direction="column" as="main" flexGrow="1">
        <Flex direction="column" p={4}>
          <LandingCards />
          <Stack direction="column" spacing={8}>
            <Heading as="h2" textAlign="center">
              Plan your Friday nights
              <br /> with Cinematric
            </Heading>
            <Flex justifyContent="center">
              <Stack direction="row" spacing={4} w="fit-content">
                <NextLink href="/browse/m/popular">
                  <Button colorScheme="apple">Browse Movies</Button>
                </NextLink>
                <NextLink href="/browse/m/popular">
                  <Button colorScheme="apple">Browse TV</Button>
                </NextLink>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
        <Box bg="elevation.200" flexGrow="1" h="100%">
          <Box>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="black"
                fillOpacity="1"
                d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </Box>
          <Box mt={4} p={4}>
            {/* <Heading as="h2" textAlign="center">
              Read Reviews
            </Heading> */}
          </Box>
        </Box>
      </Flex>
    </LandingLayout>
  );
}
