import React from "react";
import { Dimmer, Loader, Segment, Image } from "semantic-ui-react";

const LoadingPlaceholder: React.FC<{ inverted?: boolean; content?: string }> = ({
  inverted = true,
  content = "Loading..."
}) => {
  return (
    <Segment>
      <Dimmer active inverted={inverted}>
        <Loader size="large" content={content} />
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  );
};

export default LoadingPlaceholder;
