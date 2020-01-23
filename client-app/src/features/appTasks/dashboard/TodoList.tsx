import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { List, Segment } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import TodoAddTaskForm from "./TodoAddTaskForm";

const TodoList = () => {
  const rootStore = useContext(RootStoreContext);
  const { todoTasksByOrder, loadingInitial } = rootStore.activityStore;

  return (
    <Segment
      clearing
      secondary
      color={colors.positive}
      loading={loadingInitial}
    >
      <List>
        {todoTasksByOrder.map(appTask => (
          <TodoItem appTask={appTask} key={appTask.id} />
        ))}
      </List>
      <TodoAddTaskForm />
    </Segment>
  );
};

export default observer(TodoList);
