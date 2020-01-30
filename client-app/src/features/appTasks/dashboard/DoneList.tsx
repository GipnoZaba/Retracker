import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { List, Segment } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";

const DoneList = () => {
  const rootStore = useContext(RootStoreContext);
  const { doneTasksByOrder } = rootStore.activityStore;

  return (
    <Segment clearing secondary color={colors.negative}>
      <List>
        {doneTasksByOrder.map(appTask => (
          <TodoItem appTask={appTask} key={appTask.id} />
        ))}
      </List>
    </Segment>
  );
};

export default observer(DoneList);
