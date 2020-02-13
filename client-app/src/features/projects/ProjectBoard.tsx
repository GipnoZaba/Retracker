import React, { useContext, useState, useEffect } from "react";
import { Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProject, ProjectFormValues } from "../../app/models/project";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface ProjectParams {
  id: string;
}

const ProjectSelectionBoard: React.FC<RouteComponentProps<ProjectParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProject, loadingInitial } = rootStore.projectStore;
  const [project, setProject] = useState(new ProjectFormValues());

  useEffect(() => {
    loadProject(match.params.id);
  }, [loadProject, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  if (!project) return <h2>Activity not found</h2>;

  return (
    <Segment attached>
      <Label>{project.title}</Label>
    </Segment>
  );
};

export default observer(ProjectSelectionBoard);
