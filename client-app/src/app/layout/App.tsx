import React, { useContext, useEffect } from "react";
import SideBar from "../../features/nav/SideBar";
import TodoBoard from "../../features/appTasks/dashboard/TodoBoard";
import AppTaskStore from "../stores/appTaskStore";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";

const App = () => {
  const appTaskStore = useContext(AppTaskStore);

  useEffect(() => {
    appTaskStore.loadAppTasks();
  }, [appTaskStore]);

  return (
    <Container>
      <SideBar />
      <TodoBoard />
    </Container>
  );
};

export default observer(App);
