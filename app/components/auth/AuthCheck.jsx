import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertIcon, Center, Spinner } from "@chakra-ui/react";

const AuthCheck = ({ children }) => {
  const { user, fetchingUser } = useAuth();

  // Fetching user
  if (fetchingUser) {
    return (
      <Center h="200px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  // User is logged in
  if (!fetchingUser && user) {
    return children;
  }

  // User not logged in / session expired
  if (!fetchingUser && !user) {
    return (
      <Alert status="info">
        <AlertIcon />
        You must sign in first
      </Alert>
    );
  }

  // This should not happen
  throw Error("Auth Check failed. This should not happen");
};

export default AuthCheck;
