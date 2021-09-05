import React from "react";
import PropTypes from "prop-types";
import { Heading, Stack } from "@chakra-ui/react";

import CastCard from "@/components/cinema/CastCard";

const Cast = ({ cast }) => {
  return (
    <Stack spacing="4">
      <Heading as="h6" size="md">
        Cast
      </Heading>
      <Stack direction="row" spacing={4} overflowX="auto" pb={8} w="100%">
        {cast.map((cast_obj) => (
          <CastCard key={cast_obj.id} {...cast_obj} />
        ))}
      </Stack>
    </Stack>
  );
};

Cast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default Cast;
