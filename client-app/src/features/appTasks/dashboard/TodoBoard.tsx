import React, { useContext, useEffect, Fragment } from "react";
import TodoList from "./TodoList";
import { Segment, Grid, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DoneList from "./DoneList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import OverdueList from "./OverdueList";

const TodoBoard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadAppTasks,
    appTasksRegistryKey,
    appTasksByDate,
    doneTasks,
    overdueTasks
  } = rootStore.activityStore;
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
          <Fragment>
            {appTasksByDate.map(([group, appTasks]) => (
              <Fragment key={group}>
                <TodoList appTasks={appTasks} group={group} />
              </Fragment>
            ))}
          </Fragment>
        </Grid.Column>
        <Grid.Column width={8}>
          <OverdueList appTasks={overdueTasks} />
          <DoneList appTasks={doneTasks} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TodoBoard);
