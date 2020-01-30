import React, { useContext, useEffect } from "react";
import TodoList from "./TodoList";
import { Header, Segment, Grid, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DoneList from "./DoneList";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TodoBoard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAppTasks, appTasksRegistryKey } = rootStore.activityStore;
  const { isLoggedIn } = rootStore.userStore;

  useEffect(() => {
    loadAppTasks();

    window.onbeforeunload = function() {
      window.localStorage.removeItem(appTasksRegistryKey);
    };
  }, [loadAppTasks, appTasksRegistryKey]);

  if (isLoggedIn === false) {
    return <Label content="Not logged in" />;
  }

  return (
    <Segment attached>
      <Grid stackable>
        <Grid.Column width={8}>
          <Header as="h2" content="Todo" />
          <TodoList />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h2" content="Done" />
          <DoneList />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TodoBoard);
