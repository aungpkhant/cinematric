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
import AvatarMenu from "./AvatarMenu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
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
        {user ? (
          <AvatarMenu />
        ) : (
          <NextLink href={"/sign-in"} passHref>
            <Button as="a" display={["none", "none", "inline-flex"]}>
              Sign In
            </Button>
          </NextLink>
        )}
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
