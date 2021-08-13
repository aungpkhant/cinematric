import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";

import CastCard from "@/components/cinema/CastCard";

const Cast = ({ cast }) => {
  return (
    <Stack direction="row" spacing={4} overflowX="scroll" pb={8}>
      {cast.map((cast_obj) => (
        <CastCard key={cast_obj.cast_id} {...cast_obj} />
      ))}
    </Stack>
  );
};

Cast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default Cast;
