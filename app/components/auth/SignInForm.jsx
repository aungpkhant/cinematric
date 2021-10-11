import {
  chakra,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAuth } from "@/hooks/useAuth";

const SignInForm = (props) => {
  const toast = useToast();
  const { push } = useRouter();
  const { signin } = useAuth();

  const [authError, setAuthError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    setAuthError(null);
    const { email, password } = data;
    return signin(email, password)
      .then((user) => {
        toast({
          title: `Welcome, ${user.username}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        push("/browse/m/popular");
      })
      .catch((e) => {
        setAuthError(
          e?.response?.data?.message ||
            "Server is down. Please try again later."
        );
      });
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="4">
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Flex justifyContent="space-between">
            <FormLabel>Password</FormLabel>
            <chakra.a color="blue.200" fontWeight="semibold" fontSize="sm">
              Forgot Password?
            </chakra.a>
          </Flex>
          <Input
            name="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length should be 6" },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        {authError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription display="block" whiteSpace="pre-wrap">
              {authError}
            </AlertDescription>
          </Alert>
        ) : null}
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default SignInForm;
