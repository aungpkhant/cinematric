import React from "react";
import { Select } from "@chakra-ui/react";

import { LISTING_STATUS_ENUM } from "@/constants/cinematric";

const StatusSelect = ({ ...props }) => {
  return (
    <Select {...props}>
      <option value={"all"}>All</option>
      {Object.values(LISTING_STATUS_ENUM).map((statusObj) => (
        <option key={statusObj.value} value={statusObj.value}>
          {statusObj.text}
        </option>
      ))}
    </Select>
  );
};

export default StatusSelect;
