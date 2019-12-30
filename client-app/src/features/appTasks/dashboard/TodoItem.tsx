import React, { useContext } from "react";
import {
  Checkbox,
  Item,
  Button,
  Icon,
  Grid,
  Container
} from "semantic-ui-react";
import AppTaskStore from "../../../app/stores/appTaskStore";
import { observer } from "mobx-react-lite";
import { IAppTask } from "../../../app/models/appTask";

const TodoItem: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const appTaskStore = useContext(AppTaskStore);

  const { markAppTask } = appTaskStore;

  return (
    <Item>
      <Item.Content>
        <Grid>
          <Grid.Column width={5}>
            <Checkbox
              label={appTask.title}
              defaultChecked={appTask.isDone}
              onClick={(e, cb) => markAppTask(appTask.id, cb.checked === true)}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Container>
              <Button icon size="tiny">
                <Icon name="pencil alternate" />
              </Button>
            </Container>
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>
  );
};

export default observer(TodoItem);
