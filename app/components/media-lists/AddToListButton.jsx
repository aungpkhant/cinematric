import React, { useCallback } from "react";
import { Button, useToast } from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";
import useAsync from "@/hooks/useAsync";
import { addToMediaList } from "@/services/backend/mediaLists";

const AddToListButton = ({ media_id, media_type, children }) => {
  const { user } = useAuth();
  const toast = useToast();

  const list_id = user?.lists?.find((list) => list.media_type === media_type)
    ?.id;

  const memoizedAddToMediaList = useCallback(() => {
    return addToMediaList(media_id, media_type, list_id);
  }, [media_id, media_type, list_id]);

  const { execute, status, value, error } = useAsync(
    memoizedAddToMediaList,
    false
  );

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (!user) {
      return toast({
        title: "Must be logged in first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    execute();
  };

  return (
    <Button
      _loading={status === "pending"}
      isFullWidth
      size="sm"
      onClick={handleButtonClick}
      colorScheme="blue"
      color="blue.800"
    >
      {children}
    </Button>
  );
};

export default AddToListButton;
