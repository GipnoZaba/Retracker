import React, { useContext, useState } from "react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";
import { Button, List, Transition, Segment } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import "../../../app/layout/styles.css";
import EditModal from "./EditModal";

const TodoItem: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const appTaskStore = useContext(AppTaskStore);

  const { editAppTask, deleteAppTask } = appTaskStore;

  const [hoverItemId, setHoverItemId] = useState("");

  return (
    <List.Item className="task">
      <Segment.Group>
        <List.Content
          onMouseEnter={() => setHoverItemId(appTask.id)}
          onMouseLeave={() => setHoverItemId("")}
        >
          <Transition
            visible={hoverItemId === appTask.id}
            animation="scale"
            duration={300}
          >
            <List.Content>
              <Button
                disabled={appTask.isDone}
                floated="right"
                icon="ban"
                color={colors.negative}
                size="tiny"
                onClick={() => deleteAppTask(appTask.id)}
              />
              <EditModal
                appTask={appTask}
                trigger={
                  <Button
                    disabled={appTask.isDone}
                    floated="right"
                    color={colors.positive}
                    icon="edit"
                    size="tiny"
                    onClick={() => setHoverItemId("")}
                  />
                }
              />
            </List.Content>
          </Transition>
          <Button
            icon={appTask.isDone ? "undo" : "check"}
            color={appTask.isDone ? colors.negative : colors.positive}
            size="tiny"
            onClick={
              appTask.isDone
                ? () => editAppTask({ ...appTask, isDone: false })
                : () => editAppTask({ ...appTask, isDone: true })
            }
          />

          <big className="paddingLeft small">{appTask.title}</big>
        </List.Content>
      </Segment.Group>
    </List.Item>
  );
};

export default observer(TodoItem);
