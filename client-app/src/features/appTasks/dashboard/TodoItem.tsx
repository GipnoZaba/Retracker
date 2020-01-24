import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";
import { Button, List, Transition, Segment, Icon } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TodoItem: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    completeAppTask,
    restoreAppTask,
    deleteAppTask,
    submitting
  } = rootStore.activityStore;

  const [hoverItemId, setHoverItemId] = useState("");

  return (
    <List.Item style={{ padding: "0 0 0 0" }}>
      <Segment
        style={{ padding: "5px 5px 5px 5px" }}
        onMouseEnter={() => setHoverItemId(appTask.id)}
        onMouseLeave={() => setHoverItemId("")}
      >
        <Button
          loading={submitting}
          inverted
          icon={appTask.isDone ? "undo" : "check"}
          color={appTask.isDone ? colors.negative : colors.positive}
          size="tiny"
          onClick={
            appTask.isDone
              ? () => {
                  restoreAppTask(appTask.id);
                  setHoverItemId("");
                }
              : () => {
                  completeAppTask(appTask.id);
                  setHoverItemId("");
                }
          }
        />

        <big className="paddingLeft small">{appTask.title}</big>
        <Transition
          visible={hoverItemId === appTask.id}
          animation="scale"
          duration={0}
        >
          <Button.Group floated="right" compact>
            <Button
              loading={submitting}
              inverted
              disabled={appTask.isDone}
              color={colors.positive}
              icon="edit"
              size="tiny"
              onClick={() => setHoverItemId("")}
            />
            <Button
              loading={submitting}
              inverted
              disabled={appTask.isDone}
              icon="ban"
              color={colors.negative}
              size="tiny"
              onClick={() => {
                deleteAppTask(appTask.id);
                setHoverItemId("");
              }}
            />
          </Button.Group>
        </Transition>
      </Segment>
    </List.Item>
  );
};

export default observer(TodoItem);
