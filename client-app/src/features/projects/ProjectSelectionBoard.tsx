import React, { useEffect, useContext } from "react";
import { Segment, Card, List, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";
import { RootStoreContext } from "../../app/stores/rootStore";

const ProjectSelectionBoard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProjects, projectsByOrder } = rootStore.projectStore;
  const { isLoggedIn } = rootStore.userStore;

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (isLoggedIn === false) {
    return <Label content="Not logged in" />;
  }

  return (
    <Segment attached>
      <Card.Group centered stackable>
        <List selection>
          {projectsByOrder.map(project => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </List>
      </Card.Group>
    </Segment>
  );
};

export default observer(ProjectSelectionBoard);
