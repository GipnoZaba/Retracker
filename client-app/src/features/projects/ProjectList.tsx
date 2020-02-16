import React from "react";
import { List, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProjectList } from "../../app/models/project";
import { colors } from "../../app/common/styling/ColorPalette";

const ProjectList: React.FC<{ list: IProjectList }> = ({ list }) => {
  return (
    <Segment
      className="project-list"
      clearing
      secondary
      color={colors.positive}
    >
      <Label
        size="large"
        color={colors.positive}
        attached="top"
        content={new Date(list.deadline).toISOString().split("T")[0]}
      />
      <List selection>
        {list.tasks.map(task => (
          <List.Item key={task.id}>
            <Label content={task.title} />
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default observer(ProjectList);
