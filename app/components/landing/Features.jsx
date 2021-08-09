import { VStack, Icon, Grid, Heading } from "@chakra-ui/react";
import { FaStarHalfAlt } from "react-icons/fa";
import { RiMovieLine } from "react-icons/ri";
import { BiUpvote } from "react-icons/bi";

const Features = () => {
  return (
    <Grid templateColumns="1fr" gap={12}>
      <VStack spacing={6}>
        <Icon w={12} h={12} as={FaStarHalfAlt} color="apple.300" />
        <Heading as="h6" size="md">
          Browse Community Ratings
        </Heading>
      </VStack>
      <VStack spacing={6}>
        <Icon w={12} h={12} as={RiMovieLine} color="apple.300" />
        <Heading as="h6" size="md">
          Watch Teasers and Trailers
        </Heading>
      </VStack>
      <VStack spacing={6}>
        <Icon w={12} h={12} as={BiUpvote} color="apple.300" />
        <Heading as="h6" size="md">
          Vote on the Weekly Polls
        </Heading>
      </VStack>
    </Grid>
  );
};

export default Features;
