import React from "react";
import { Statistic, Icon, Image, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  return (
    <Segment attached>
      <Statistic.Group widths="four">
        <Statistic>
          <Statistic.Value>22</Statistic.Value>
          <Statistic.Label>Saves</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value text>
            Three
            <br />
            Thousand
          </Statistic.Value>
          <Statistic.Label>Signups</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            <Icon name="plane" />5
          </Statistic.Value>
          <Statistic.Label>Flights</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            <Image className="circular inline" />
            42
          </Statistic.Value>
          <Statistic.Label>Team Members</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
};

export default observer(Dashboard);
