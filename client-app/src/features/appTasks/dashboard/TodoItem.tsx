import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";
import { Button, List, Transition, Segment } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import { RootStoreContext } from "../../../app/stores/rootStore";
import EditTaskForm from "./EditTaskForm";

const TodoItem: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    completeAppTask,
    restoreAppTask,
    deleteAppTask
  } = rootStore.activityStore;
  const { openModal } = rootStore.modalStore;
  const [hoverItemId, setHoverItemId] = useState("");

  return (
    <List.Item className="p-0">
      <Segment
        className="p-2"
        onMouseEnter={() => setHoverItemId(appTask.id)}
        onMouseLeave={() => setHoverItemId("")}
      >
        <Button
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

        <big className="pl-3">{appTask.title}</big>
        <Transition
          visible={hoverItemId === appTask.id}
          animation="scale"
          duration={0}
        >
          <Button.Group floated="right" compact>
            <Button
              inverted
              disabled={appTask.isDone}
              color={colors.positive}
              icon="edit"
              size="tiny"
              onClick={() => {
                openModal(<EditTaskForm appTask={appTask} />);
                setHoverItemId("");
              }}
            />
            <Button
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
