import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { List, Segment, Label } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import TodoAddTaskForm from "./TodoAddTaskForm";
import LoadingPlaceholder from "../../../app/layout/LoadingPlaceholder";
import { IAppTask } from "../../../app/models/appTask";

const TodoList: React.FC<{ appTasks: IAppTask[]; group: string }> = ({
  appTasks,
  group
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial } = rootStore.activityStore;

  if (loadingInitial) {
    return (
      <Segment clearing secondary color={colors.positive}>
        <LoadingPlaceholder />
      </Segment>
    );
  }

  return (
    <Segment clearing secondary color={colors.positive}>
      <Label
        size="large"
        color={colors.positive}
        attached="top"
        content={group}
      />
      <List selection>
        {appTasks.map(appTask => (
          <TodoItem appTask={appTask} key={appTask.id} />
        ))}
      </List>
      <TodoAddTaskForm />
    </Segment>
  );
};

export default observer(TodoList);
