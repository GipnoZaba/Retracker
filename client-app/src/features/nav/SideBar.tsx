import React, { useContext } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import {
  workspacePath,
  tasksPath,
  projectsPath,
  dashboardPath
} from "../../app/common/utils/paths";

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
      <Menu.Menu>
        <Menu.Item as={NavLink} to={workspacePath}>
          <Icon size="large" name="gamepad" />
          <div className="menuFont">Workspace</div>
        </Menu.Item>
        <Menu.Item as={NavLink} to={tasksPath}>
          <Icon size="large" name="clipboard list" />
          <div className="menuFont">Tasks</div>
        </Menu.Item>
        <Menu.Item as={NavLink} to={projectsPath}>
          <Icon size="large" name="video play" />
          <div className="menuFont">Projects</div>
        </Menu.Item>
        <Menu.Item as={NavLink} to={dashboardPath}>
          <Icon size="large" name="video camera" />
          <div className="menuFont">Dashboard</div>
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item>
        <Button onClick={logout} content="Logout" />
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
