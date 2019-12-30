import React from "react";
import { Menu, Icon } from "semantic-ui-react";

const menuStyle = {
  height: "100%",
  position: "fixed",
  width: "160px",
  maxWidth: "160px"
}

const SideBar = () => {
  return (
    <Menu
      vertical
      inverted
      style={menuStyle}
    >
      <Menu.Item>
        <Menu.Header>Workspace</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item name="gamepad" active={true}>
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item name="video camera">
          <Icon name="video camera" />
          Channels
        </Menu.Item>
        <Menu.Item name="video play">
          <Icon name="video play" />
          Videos
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item>
        <Menu.Header>Analyze</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item name="gamepad" active={true}>
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item name="video camera">
          <Icon name="video camera" />
          Channels
        </Menu.Item>
        <Menu.Item name="video play">
          <Icon name="video play" />
          Videos
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default SideBar;
