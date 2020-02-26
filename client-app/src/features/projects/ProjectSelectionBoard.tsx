import React, { useEffect, useContext } from "react";
import { Segment, Card, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";
import { RootStoreContext } from "../../app/stores/rootStore";
import { colors } from "../../app/common/styling/ColorPalette";
import ProjectForm from "./ProjectForm";

const ProjectSelectionBoard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProjects, projectsByOrder } = rootStore.projectStore;
  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <Segment attached>
      <Header size="huge" content="Projects" />
      <Segment secondary color={colors.positive}>
        <Card.Group stackable itemsPerRow={4}>
          {projectsByOrder.map(project => (
            <ProjectCard project={project} key={project.id} />
          ))}

          <Card className="project-card">
            <Button
              inverted
              color={colors.positive}
              style={{ height: "100%" }}
              icon="plus"
              onClick={() => openModal(<ProjectForm />, "mini")}
            />
          </Card>
        </Card.Group>
      </Segment>
    </Segment>
  );
};

export default observer(ProjectSelectionBoard);
