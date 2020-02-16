import React, { useContext, Fragment } from "react";
import { Segment, Divider, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProjectList } from "../../app/models/project";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProjectList from "./ProjectList";

const ProjectTimeline: React.FC<{ projectLists: IProjectList[] }> = ({
  projectLists
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial } = rootStore.projectStore;

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Fragment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="calendar alternate outline" />
          Timeline
        </Header>
      </Divider>
      <Segment className="timeline">
        {projectLists.map(list => (
          <ProjectList list={list} />
        ))}
      </Segment>
    </Fragment>
  );
};

export default observer(ProjectTimeline);
