import React, { useContext, Fragment } from "react";
import {
  Divider,
  Header,
  Icon,
  Table,
  Container,
  Button
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProjectList } from "../../app/models/project";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProjectList from "./ProjectList";
import { colors } from "../../app/common/styling/ColorPalette";

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
      <Container className="timeline">
        <Table basic="very" collapsing>
          <Table.Body>
            <Table.Row>
              {projectLists.map(list => (
                <Table.Cell className="pr-2" key={list.id}>
                  <ProjectList list={list} />
                </Table.Cell>
              ))}
              <Table.Cell className="pl-5 timeline-element">
                <Container className="timeline-element">
                  <Button
                    fluid
                    size="large"
                    inverted
                    color={colors.positive}
                    icon="plus"
                    content="Add new list"
                  />
                </Container>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </Fragment>
  );
};

export default observer(ProjectTimeline);
