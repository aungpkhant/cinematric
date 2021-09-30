import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Box,
  Heading,
  IconButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HiMenu } from "react-icons/hi";
import SearchBar from "./SearchBar";

import { SideBarContent } from "./SideBar";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerButtonRef = React.useRef();

  return (
    <>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <NextLink href={"/"} passHref>
          <Heading as="a" size="md">
            Cinematric
          </Heading>
        </NextLink>
        <Box w="max(40%, 300px)" mr={4} display={["none", "none", "block"]}>
          <SearchBar />
        </Box>
        <IconButton
          bg="gray.700"
          aria-label="Drawer Button"
          icon={<HiMenu />}
          onClick={onOpen}
          display={["inline-flex", "inline-flex", "none"]}
        />
        <Button
          height="100%"
          px={0}
          variant="ghost"
          display={["none", "none", "block"]}
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </Button>
      </Flex>

      {/* Drawer Content */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawerButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerHeader>
            Welcome!
            <Divider borderColor="gray.500" mt={3} />
          </DrawerHeader>

          <DrawerBody>
            <SideBarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
