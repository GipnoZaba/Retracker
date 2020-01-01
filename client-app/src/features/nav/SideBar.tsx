import React from "react";
import { Menu, Icon, Segment } from "semantic-ui-react";

const menuStyle = {
  height: "100%",
  position: "fixed",
  width: "160px",
  maxWidth: "160px"
};

const menuItemStyle = {
  fontSize: "18px"
};

const SideBar = () => {
  return (
    <Menu vertical secondary pointing style={menuStyle}>
      <Menu.Item>
        <Menu.Header style={menuItemStyle}>Workspace</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item as="a" name="gamepad">
          <Icon size="large" name="gamepad" />
          <div style={menuItemStyle}>Today</div>
        </Menu.Item>
        <Menu.Item as="a" name="video camera">
          <Icon size="large" name="video camera" />
          <div style={menuItemStyle}>7 Days</div>
        </Menu.Item>
        <Menu.Item as="a" name="video play">
          <Icon size="large" name="video play" />
          <div style={menuItemStyle}>Projects</div>
        </Menu.Item>
      </Menu.Menu>

      <Segment attached></Segment>

      <Menu.Item>
        <Menu.Header style={menuItemStyle}>Analyze</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item as="a" name="gamepad">
          <Icon size="large" name="gamepad" />
          <div style={menuItemStyle}>Stats</div>
        </Menu.Item>
        <Menu.Item as="a" name="video camera">
          <Icon size="large" name="video camera" />
          <div style={menuItemStyle}>Stats</div>
        </Menu.Item>
        <Menu.Item as="a" name="video play">
          <Icon size="large" name="video play" />
          <div style={menuItemStyle}>Stats</div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default SideBar;
