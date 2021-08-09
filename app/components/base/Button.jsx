import React, { forwardRef } from "react";
import { Button } from "@chakra-ui/react";

const BrandButton = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button colorScheme="apple" color="apple.800" {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default BrandButton;
