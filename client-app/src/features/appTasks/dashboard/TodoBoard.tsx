import React, { useContext, useEffect } from "react";
import TodoList from "./TodoList";
import { Header, Segment, Grid } from "semantic-ui-react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";

const TodoBoard = () => {
  const appTaskStore = useContext(AppTaskStore);
  const { appTasksRegistry } = appTaskStore;

  useEffect(() => {
    appTaskStore.loadAppTasks();
  }, [appTaskStore]);

  return (
    <Segment attached style={{ marginLeft: "160px" }}>
      <Header as="h2">Today</Header>
      <Grid>
        <Grid.Column width={4}>
          <TodoList
            appTasks={Array.from(appTasksRegistry.values()).filter(
              appTask => !appTask.isDone
            )}
            completed={false}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <TodoList
            appTasks={Array.from(appTasksRegistry.values()).filter(
              appTask => appTask.isDone
            )}
            completed={true}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TodoBoard);
