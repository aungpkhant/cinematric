import React from "react";
import { Tr, Td } from "@chakra-ui/react";

const MovieRow = ({ title }) => {
  return (
    <Tr>
      <Td>inches</Td>
      <Td>{title}</Td>
      <Td>25.4</Td>
      <Td>25.4</Td>
      <Td>25.4</Td>
    </Tr>
  );
};

export default MovieRow;
