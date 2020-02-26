import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProject } from "../../app/models/project";
import { Link } from "react-router-dom";
import { projectsPath } from "../../app/common/utils/paths";

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  return (
    <Card className="project-card">
      <Card.Content>
        <Card.Header
          as={Link}
          to={projectsPath + `/${project.id}`}
          content={project.title}
        />
        <Card.Meta>
          <span className="date">
            {new Date(project.dateCreated).toLocaleDateString()}
          </span>
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
