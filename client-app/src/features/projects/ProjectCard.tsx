import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProject } from "../../app/models/project";

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={project.title} />
        <Card.Meta>
          <span className="date">{project.dateCreated}</span>
        </Card.Meta>
        <Card.Description content={project.description} />
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {project.members.length}
      </Card.Content>
    </Card>
  );
};

export default observer(ProjectCard);
