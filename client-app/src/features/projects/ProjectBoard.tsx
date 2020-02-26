import React, { useContext, useState, useEffect } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProject } from "../../app/models/project";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProjectTimeline from "./ProjectTimeline";

interface ProjectParams {
  id: string;
}

const ProjectSelectionBoard: React.FC<RouteComponentProps<ProjectParams>> = ({
  match
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProject, loadingInitial, deleteProject } = rootStore.projectStore;
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    if (match.params.id) {
      loadProject(match.params.id).then(project => {
        setProject(project);
      });
    }
  }, [loadProject, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  if (!project) return <h2>Project not found</h2>;

  return (
    <Segment attached>
      <Header content={project.title} size="huge" />
      <Button content="Edit" />
      <Button
        content="Delete"
        negative
        onClick={() => deleteProject(project.id)}
      />
      <ProjectTimeline projectLists={project.lists} />
    </Segment>
  );
};

export default observer(ProjectSelectionBoard);
