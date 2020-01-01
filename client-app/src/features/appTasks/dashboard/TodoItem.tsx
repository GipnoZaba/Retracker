import React, { useContext } from "react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";
import { Button, List, Transition } from "semantic-ui-react";

const TodoItem: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const appTaskStore = useContext(AppTaskStore);

  const {
    completeAppTask,
    recoverAppTask,
    deleteAppTask,
    handleMouseEnterItem,
    handleMouseExitItem,
    hoveredItemId
  } = appTaskStore;

  return (
    <List.Item>
      <List.Content
        onMouseEnter={() => handleMouseEnterItem(appTask.id)}
        onMouseLeave={() => handleMouseExitItem()}
      >
        <Transition
          visible={hoveredItemId === appTask.id}
          animation="scale"
          duration={300}
        >
          <List.Content>
            <Button
              disabled={appTask.isDone}
              floated="right"
              icon="ban"
              negative
              size="tiny"
              onClick={() => deleteAppTask(appTask.id)}
            />
          </List.Content>
        </Transition>
        <Button
          icon={appTask.isDone ? "undo" : "check"}
          positive={!appTask.isDone}
          negative={appTask.isDone}
          size="tiny"
          onClick={
            appTask.isDone
              ? () => recoverAppTask(appTask.id)
              : () => completeAppTask(appTask.id)
          }
        />

        <big style={{ marginLeft: "10px" }}>{appTask.title}</big>
      </List.Content>
    </List.Item>
  );
};

export default observer(TodoItem);
