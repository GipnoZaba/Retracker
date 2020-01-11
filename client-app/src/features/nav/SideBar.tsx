import React from "react";
import { Menu, Icon, Segment } from "semantic-ui-react";
import "../../app/layout/styles.css";

const menuStyle = {
  height: "100%",
  position: "fixed",
  width: "160px",
  maxWidth: "160px"
};

const SideBar = () => {
  return (
    <Menu vertical secondary pointing style={menuStyle}>
      <Menu.Item>
        <Menu.Header className="menuFont">Workspace</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item as="a" name="gamepad">
          <Icon size="large" name="gamepad" />
          <div className="menuFont">Today</div>
        </Menu.Item>
        <Menu.Item as="a" name="video camera">
          <Icon size="large" name="video camera" />
          <div className="menuFont">7 Days</div>
        </Menu.Item>
        <Menu.Item as="a" name="video play">
          <Icon size="large" name="video play" />
          <div className="menuFont">Projects</div>
        </Menu.Item>
      </Menu.Menu>

      <Segment attached></Segment>

      <Menu.Item>
        <Menu.Header className="menuFont">Analyze</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item as="a" name="gamepad">
          <Icon size="large" name="gamepad" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
        <Menu.Item as="a" name="video camera">
          <Icon size="large" name="video camera" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
        <Menu.Item as="a" name="video play">
          <Icon size="large" name="video play" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default SideBar;
