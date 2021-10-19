import BaseLayout from "@/layouts/BaseLayout";
import { Image, Button, Flex, Stack, Heading, Box } from "@chakra-ui/react";
import NextLink from "next/link";

import LandingCards from "@/components/landing/LandingCards";
import Features from "@/components/landing/Features";

export default function LandingPage({ children }) {
  return (
    <BaseLayout>
      <Flex direction="column" as="main" flexGrow="1">
        <Flex direction="column" p={[4, 8]}>
          <LandingCards />
          <Stack direction="column" spacing={8}>
            <Heading as="h2" textAlign="center">
              Plan your Friday nights
              <br /> with Cinematric
            </Heading>
            <Flex justifyContent="center">
              <Stack direction="row" spacing={4} w="fit-content">
                <NextLink href="/sign-up" passHref>
                  <Button colorScheme="blue" as="a">
                    Join Cinematric Free
                  </Button>
                </NextLink>
                <NextLink href="/browse/m/popular" passHref>
                  <Button colorScheme="blue" variant="outline" as="a">
                    Browse
                  </Button>
                </NextLink>
              </Stack>
            </Flex>
          </Stack>
        </Flex>

        <Box bg="elevation.200" flexGrow="1" h="100%">
          <img
            style={{
              marginTop: "-4px",
              width: "100%",
              minHeight: "60px",
              objectFit: "cover",
              objectPosition: "left top",
            }}
            src={"/landing-wave.svg"}
          />
          <Box mt={4} p={4} mb={12}>
            <Features />
          </Box>
        </Box>
      </Flex>
    </BaseLayout>
  );
}
