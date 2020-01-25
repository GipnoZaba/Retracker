import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const ProjectCard = () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        22 Friends
      </Card.Content>
    </Card>
  );
};

export default observer(ProjectCard);
