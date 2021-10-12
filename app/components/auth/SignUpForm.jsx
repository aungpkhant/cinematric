import {
  chakra,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAuth } from "@/hooks/useAuth";

const SignUpForm = (props) => {
  const { push } = useRouter();
  const toast = useToast();

  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [authError, setAuthError] = useState(null);

  const onSubmit = (data) => {
    setAuthError(null);
    const { username, email, password } = data;
    return signup(username, email, password)
      .then((_) => {
        toast({
          title: "Account created",
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
    <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack spacing="4">
        <FormControl isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
            autoComplete="off"
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
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
            autoComplete="on"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
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
        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password.current || "Passwords do not match",
            })}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
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
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isLoading={isSubmitting}
        >
          Sign up
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default SignUpForm;
