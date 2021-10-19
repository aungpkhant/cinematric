import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import MovieRow from "@/components/media-lists/MovieRow";
import EditListingModal from "@/components/media-lists/EditListingModal";
import {
  deleteFromMediaList,
  editMediaListing,
} from "@/services/backend/mediaLists";

const MovieListTable = ({ listings, refresh }) => {
  const toast = useToast();

  // Delete Listing
  const [itemToDelete, setItemToDelete] = useState(null);
  const cancelDeleteButtonRef = useRef();
  const {
    isOpen: deleteConfirmationIsOpen,
    onOpen: openDeleteConfirmation,
    onClose: closeDeleteConfirmation,
  } = useDisclosure();

  const handleDeleteIconClicked = (title, listingId) => {
    setItemToDelete({ title, id: listingId });
    openDeleteConfirmation();
  };

  const handleDelete = () => {
    closeDeleteConfirmation();
    deleteFromMediaList(itemToDelete.id)
      .then(() => {
        toast({
          title: `Successfully deleted ${itemToDelete.title}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setItemToDelete(null);

        // Fetch latest movie list state from backend
        refresh();
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `Something went wrong!`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // Edit Listing
  const [itemToEdit, setItemToEdit] = useState(null);
  const cancelEditButtonRef = useRef();
  const {
    isOpen: editModalIsOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();

  const handleEditIconClicked = (title, listingId, status, remark) => {
    setItemToEdit({ title, id: listingId, status, remark });
    openEditModal();
  };

  const handleEdit = (listingId, status, remark) => {
    editMediaListing(listingId, status, remark)
      .then(() => {
        toast({
          title: `Successfully edited ${itemToEdit.title}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setItemToEdit(null);
        closeEditModal();

        // Fetch latest movie list state from backend
        refresh();
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `Something went wrong!`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Box overflowX="auto">
        <Table variant="simple">
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Movie Title</Th>
              <Th>Status</Th>
              <Th>Updated At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody color="gray.200">
            {listings.map((listing) => (
              <MovieRow
                key={listing.id}
                listingId={listing.id}
                listingStatus={listing.status}
                listingRemark={listing.remark}
                listingUpdatedAt={listing.updated_at}
                {...listing.media_item}
                handleDeleteIconClicked={handleDeleteIconClicked}
                handleEditIconClicked={handleEditIconClicked}
              />
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Delete Listing Confirmation */}
      <AlertDialog
        isOpen={deleteConfirmationIsOpen}
        leastDestructiveRef={cancelDeleteButtonRef}
        onClose={closeDeleteConfirmation}
      >
        <AlertDialogOverlay>
          {itemToDelete != null && (
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {itemToDelete.title} ?
              </AlertDialogHeader>

              <AlertDialogBody>
                You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelDeleteButtonRef}
                  onClick={closeDeleteConfirmation}
                >
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Edit Listing Confirmation */}
      {itemToEdit && (
        <EditListingModal
          itemToEdit={itemToEdit}
          editModalIsOpen={editModalIsOpen}
          closeEditModal={closeEditModal}
          cancelEditButtonRef={cancelEditButtonRef}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default MovieListTable;
