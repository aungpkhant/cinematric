import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

const AvatarMenu = () => {
  const { user, signout } = useAuth();

  return (
    <Menu>
      <MenuButton
        height="100%"
        px={0}
        variant="ghost"
        display={["none", "none", "block"]}
      >
        <Avatar name={user.username} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            signout();
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
