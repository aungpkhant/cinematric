import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";

import CastCard from "@/components/cinema/CastCard";

const TvCast = ({ cast }) => {
  return (
    <Stack direction="row" spacing={4} overflowX="scroll" pb={8}>
      {cast.map((cast_obj) => (
        <CastCard key={cast_obj.id} {...cast_obj} />
      ))}
    </Stack>
  );
};

TvCast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default TvCast;
