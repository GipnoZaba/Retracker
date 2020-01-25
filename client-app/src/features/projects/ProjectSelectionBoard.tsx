import React from "react";
import { Segment, Card } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";

const ProjectSelectionBoard = () => {
  return (
    <Segment attached>
      <Card.Group centered stackable>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Card.Group>
    </Segment>
  );
};

export default observer(ProjectSelectionBoard);
