import React from "react";
import SideBar from "../../features/nav/SideBar";
import TodoBoard from "../../features/appTasks/dashboard/TodoBoard";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <div>
      <SideBar />
      <TodoBoard />
    </div>
  );
};

export default observer(App);
