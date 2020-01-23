import React, { useContext } from "react";
import { Menu, Icon, Segment, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "../../app/layout/styles.css";
import { RootStoreContext } from "../../app/stores/rootStore";

const menuStyle = {
  height: "100%",
  position: "fixed",
  width: "160px",
  maxWidth: "160px"
};

const SideBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;

  return (
    <Menu vertical secondary pointing style={menuStyle}>
      <Menu.Item>
        <Menu.Header className="menuFont">Workspace</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item as={NavLink} to="/apptasks" name="gamepad">
          <Icon size="large" name="gamepad" />
          <div className="menuFont">Today</div>
        </Menu.Item>
        <Menu.Item name="video camera">
          <Icon size="large" name="video camera" />
          <div className="menuFont">7 Days</div>
        </Menu.Item>
        <Menu.Item name="video play">
          <Icon size="large" name="video play" />
          <div className="menuFont">Projects</div>
        </Menu.Item>
      </Menu.Menu>

      <Segment attached></Segment>

      <Menu.Item>
        <Menu.Header className="menuFont">Analyze</Menu.Header>
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item name="gamepad">
          <Icon size="large" name="gamepad" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
        <Menu.Item name="video camera">
          <Icon size="large" name="video camera" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
        <Menu.Item name="video play">
          <Icon size="large" name="video play" />
          <div className="menuFont">Stats</div>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Item>
        <Button onClick={logout} content="Logout" />
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
