import { List, Segment, Grid, Button, Container } from "semantic-ui-react";
import React from "react";
import { colors } from "../../app/common/styling/ColorPalette";
import { observer } from "mobx-react-lite";
import { IProjectTask } from "../../app/models/project";

const ProjectListTask: React.FC<{ task: IProjectTask }> = ({ task }) => {
  return (
    <List.Item className="p-0">
      <Segment className="p-2">
        <Grid>
          <Grid.Row>
            <Grid.Column stretched className="pr-0" width={3}>
              <Button
                inverted
                icon={task.isDone ? "undo" : "check"}
                color={task.isDone ? colors.negative : colors.positive}
                size="tiny"
              />
            </Grid.Column>
            <Grid.Column className="text-break" width={13}>
              <Container className="py-3" content={task.title} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </List.Item>
  );
};

export default observer(ProjectListTask);
