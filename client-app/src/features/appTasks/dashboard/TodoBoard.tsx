import React, { useContext, useEffect } from "react";
import TodoList from "./TodoList";
import { Header, Segment, Grid, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { colors } from "../../../app/common/styling/ColorPalette";
import DoneList from "./DoneList";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TodoBoard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAppTasks } = rootStore.activityStore;
  const { isLoggedIn } = rootStore.userStore;

  useEffect(() => {
    loadAppTasks();
  }, [loadAppTasks]);

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
          <Segment clearing secondary color={colors.positive}>
            <DoneList />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TodoBoard);
