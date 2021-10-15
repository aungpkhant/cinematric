import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { LISTING_STATUS_ENUM } from "@/constants/cinematric";

const EditListingModal = ({
  editModalIsOpen,
  closeEditModal,
  itemToEdit,
  cancelEditButtonRef,
  handleEdit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remark: itemToEdit?.remark,
      status: itemToEdit?.status,
    },
  });

  const onSubmit = (data) => {
    const { status, remark } = data;
    handleEdit(itemToEdit.id, status, remark);
  };

  return (
    <Modal isOpen={editModalIsOpen} onClose={closeEditModal}>
      <ModalOverlay />
      {itemToEdit && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{itemToEdit.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <FormControl isInvalid={errors.status}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Choose status"
                    {...register("status", {
                      required: "Must choose a status",
                    })}
                  >
                    {Object.values(LISTING_STATUS_ENUM).map(
                      ({ value, text }) => (
                        <option key={value} value={value}>
                          {text}
                        </option>
                      )
                    )}
                  </Select>
                  <FormErrorMessage>
                    {errors.status && errors.status.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <FormControl isInvalid={errors.remark}>
                <FormLabel>Remark</FormLabel>
                <Textarea name="remark" {...register("remark")} />
                <FormErrorMessage>
                  {errors.remark && errors.remark.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={closeEditModal} ref={cancelEditButtonRef}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="green">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      )}
    </Modal>
  );
};

export default EditListingModal;
