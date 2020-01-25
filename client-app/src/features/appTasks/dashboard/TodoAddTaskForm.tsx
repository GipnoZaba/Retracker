import React, { useContext, useState, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { Button, Transition, Container, Form } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import { IAppTask, IAppTaskFormValues } from "../../../app/models/appTask";
import uuid from "uuid";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TodoAddTaskForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { createAppTask } = rootStore.activityStore;

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [formValues, setFormValues] = useState<IAppTaskFormValues>({
    id: uuid()
  });

  const handleformValuesChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setIsAddingTask(false);

    if (formValues.title && formValues.title.trim() === "") {
      formValues.title = "";
      return;
    }

    createAppTask(formValues);

    setFormValues({
      id: uuid(),
      title: ""
    });
  };

  return (
    <Container textAlign="center">
      <Transition visible={!isAddingTask} duration={0}>
        <div>
          <Button
            inverted
            circular
            color={colors.positive}
            icon="plus"
            onClick={() => setIsAddingTask(true)}
          />
        </div>
      </Transition>
      <Transition
        fluid
        visible={isAddingTask}
        animation="slide down"
        duration={{ hide: 0, show: 300 }}
      >
        <Container>
          <Form.Input
            fluid
            name="title"
            placeholder="Add new task"
            value={formValues.title}
            onChange={handleformValuesChange}
          />
          <Button.Group floated="left">
            <Button
              icon="check"
              color={colors.positive}
              content="Save"
              labelPosition="left"
              type="submit"
              onClick={() => handleSubmit()}
            />
            <Button
              icon="close"
              color={colors.negative}
              onClick={() => {
                setIsAddingTask(false);
                setFormValues({ ...formValues, title: "" });
              }}
            />
          </Button.Group>
        </Container>
      </Transition>
    </Container>
  );
};

export default observer(TodoAddTaskForm);
