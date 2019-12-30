import React, { useContext, Fragment } from "react";
import { Item, List } from "semantic-ui-react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const appTaskStore = useContext(AppTaskStore);

  const { appTasks } = appTaskStore;

  return (
    <List>
      <Item.Group divided>
        {appTasks.map(appTask => (
          <TodoItem key={appTask.id} appTask={appTask} />
        ))}
      </Item.Group>
    </List>
  );
};

export default observer(TodoList);
