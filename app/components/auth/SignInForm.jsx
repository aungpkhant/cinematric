import {
  chakra,
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";

const SignInForm = (props) => {
  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault(); // your login logic here
      }}
      {...props}
    >
      <Stack spacing="4">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" autoComplete="email" required />
        </FormControl>
        <FormControl id="password">
          <Flex justifyContent="space-between">
            <FormLabel>Password</FormLabel>
            <chakra.a color="blue.200" fontWeight="semibold" fontSize="sm">
              Forgot Password?
            </chakra.a>
          </Flex>
          <Input name="password" type="password" required />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default SignInForm;
