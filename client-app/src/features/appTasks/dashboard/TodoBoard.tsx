import React, { useContext, useEffect } from "react";
import TodoList from "./TodoList";
import { Header, Segment, Grid } from "semantic-ui-react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";
import { colors } from "../../../app/common/styling/ColorPalette";
import TodoAddTaskForm from "./TodoAddTaskForm";
import DoneList from "./DoneList";

const TodoBoard = () => {
  const appTaskStore = useContext(AppTaskStore);

  useEffect(() => {
    appTaskStore.loadAppTasks();
  }, [appTaskStore]);

  return (
    <Segment attached style={{ marginLeft: "160px" }}>
      <Grid>
        <Grid.Column width={4}>
          <Header as="h2" content="Today" />
          <Segment clearing secondary color={colors.positive}>
            <TodoList />
            <TodoAddTaskForm />
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h2" content="Done" />
          <Segment secondary color={colors.negative}>
            <DoneList />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TodoBoard);
