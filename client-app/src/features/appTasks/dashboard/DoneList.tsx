import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { List } from "semantic-ui-react";

const DoneList = () => {
  const rootStore = useContext(RootStoreContext);
  const { doneTasksByOrder } = rootStore.activityStore;

  return (
    <List>
      {doneTasksByOrder.map(appTask => (
        <TodoItem appTask={appTask} key={appTask.id} />
      ))}
    </List>
  );
};

export default observer(DoneList);
