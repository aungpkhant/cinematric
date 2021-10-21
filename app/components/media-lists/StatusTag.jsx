import React from "react";
import { Tag } from "@chakra-ui/react";

import { LISTING_STATUS_ENUM } from "@/constants/cinematric";

const StatusTag = ({ status }) => {
  const { colorScheme, text } = LISTING_STATUS_ENUM[status];

  return <Tag colorScheme={colorScheme}>{text}</Tag>;
};

export default StatusTag;
