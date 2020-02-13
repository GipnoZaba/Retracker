import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { List, Segment, Label } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import LoadingPlaceholder from "../../../app/layout/LoadingPlaceholder";
import { IAppTask } from "../../../app/models/appTask";

const DoneList: React.FC<{ appTasks: IAppTask[] }> = ({ appTasks }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial } = rootStore.appTaskStore;

  if (loadingInitial) {
    return (
      <Segment clearing secondary color={colors.positive}>
        <LoadingPlaceholder />
      </Segment>
    );
  }

  return (
    <Segment clearing secondary color={colors.negative}>
      <Label
        size="large"
        color={colors.negative}
        attached="top"
        content="Done"
      />
      <List>
        {appTasks.map(appTask => (
          <TodoItem appTask={appTask} key={appTask.id} />
        ))}
      </List>
    </Segment>
  );
};

export default observer(DoneList);
