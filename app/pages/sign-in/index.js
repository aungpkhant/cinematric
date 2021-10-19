import { chakra, Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <Flex direction="column" as="main" flexGrow="1">
      <Box maxW="md" mx="auto" py="12">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <NextLink passHref href="/sign-up">
            <chakra.a
              marginStart="1"
              display={{ base: "block", sm: "inline" }}
              _hover={{ color: "blue.300" }}
              color="blue.200"
            >
              Sign up for free
            </chakra.a>
          </NextLink>
        </Text>
        <Box
          bg="gray.700"
          py="8"
          px={{
            base: "4",
            md: "10",
          }}
          shadow="base"
          rounded="lg"
        >
          <SignInForm />
        </Box>
      </Box>
    </Flex>
  );
}
