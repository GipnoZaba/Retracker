import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { workspacePath } from "../common/utils/paths";

const NotFound = () => {
  return (
    <Segment placeholder className="main">
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to={workspacePath} primary>
          Return to Workspace page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
