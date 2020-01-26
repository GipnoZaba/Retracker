import React, { useContext, useState, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { Button, Transition, Container, Form } from "semantic-ui-react";
import { colors } from "../../../app/common/styling/ColorPalette";
import { IAppTaskFormValues } from "../../../app/models/appTask";
import uuid from "uuid";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { focusOnElementById } from "../../../app/common/utils/utilities";

const TodoAddTaskForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { createAppTask } = rootStore.activityStore;

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [formValues, setFormValues] = useState<IAppTaskFormValues>({
    id: uuid(),
    title: ""
  });

  const handleformValuesChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !formValues.title ||
      (formValues.title && formValues.title.trim() === "")
    ) {
      setIsAddingTask(false);
      setFormValues({ ...formValues, title: "" });
      return;
    }

    createAppTask(formValues);

    setFormValues({
      id: uuid(),
      title: ""
    });

    focusOnElementById("inputTitle", document);
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
        onStart={() => focusOnElementById("titleInput", document)}
        fluid
        visible={isAddingTask}
        animation="slide down"
        duration={{ hide: 0, show: 300 }}
      >
        <Form>
          <Form.Input
            id="titleInput"
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
        </Form>
      </Transition>
    </Container>
  );
};

export default observer(TodoAddTaskForm);
