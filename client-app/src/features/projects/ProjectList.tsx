import React from "react";
import { List, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProjectList } from "../../app/models/project";
import { colors } from "../../app/common/styling/ColorPalette";
import ProjectListTask from "./ProjectListTask";

const ProjectList: React.FC<{ list: IProjectList }> = ({ list }) => {
  return (
    <Segment
      clearing
      secondary
      color={colors.positive}
      className="timeline-element"
    >
      <Label
        size="large"
        color={colors.positive}
        attached="top"
        content={new Date(list.deadline).toISOString().split("T")[0]}
      />
      <List selection className="scroll-vertical project-list">
        {list.tasks.map(task => (
          <ProjectListTask task={task} key={task.id} />
        ))}
      </List>
    </Segment>
  );
};

export default observer(ProjectList);
