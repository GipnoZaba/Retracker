import React from "react";
import { List } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import FlipMove from "react-flip-move";
import { IAppTask } from "../../../app/models/appTask";

const TodoList: React.FC<{ appTasks: IAppTask[]; completed: boolean }> = ({
  appTasks,
  completed
}) => {
  return (
    <List divided selection verticalAlign="middle">
      <FlipMove>
        {appTasks.map(
          appTask =>
            appTask.isDone === completed && (
              <div key={appTask.id}>
                <TodoItem appTask={appTask} />
              </div>
            )
        )}
      </FlipMove>
    </List>
  );
};

export default observer(TodoList);
