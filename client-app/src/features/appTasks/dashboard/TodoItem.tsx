import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";
import {
  Button,
  List,
  Transition,
  Segment,
  Grid,
  Container,
  Label
} from "semantic-ui-react";
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
        <Grid>
          <Grid.Row>
            <Grid.Column stretched className="pr-0" width={2}>
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
            </Grid.Column>
            <Grid.Column className="text-break" width={11}>
              <Container className="py-3" content={appTask.title} />
            </Grid.Column>
            <Grid.Column width={3} verticalAlign="top" textAlign="right">
              <Fragment>
                <Transition
                  visible={hoverItemId === appTask.id}
                  animation="scale"
                  duration={0}
                >
                  <div>
                    <Button
                      circular
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
                      circular
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
                  </div>
                </Transition>
              </Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </List.Item>
  );
};

export default observer(TodoItem);
