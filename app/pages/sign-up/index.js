import {
  chakra,
  Box,
  Flex,
  Button,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <Flex direction="column" as="main" flexGrow="1">
      <Box maxW="md" mx="auto" py="12">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign up a new account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already have an account?</Text>
          <NextLink passHref href="/sign-in">
            <chakra.a
              marginStart="1"
              display={{ base: "block", sm: "inline" }}
              _hover={{ color: "blue.300" }}
              color="blue.200"
            >
              Sign in
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
          <SignUpForm />
        </Box>
      </Box>
    </Flex>
  );
}
