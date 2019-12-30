import React, { Fragment } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import TodoList from "./TodoList";

const TodoBoard = () => {
  return (
    <Segment style={{marginLeft: "160px"}}>
      <Header as="h2">Today</Header>
      <TodoList />
    </Segment>
  );
};

export default TodoBoard;
