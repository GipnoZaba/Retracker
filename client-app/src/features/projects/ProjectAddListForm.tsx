import React, { useContext, useState, FormEvent, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Button, Transition, Container, Form } from "semantic-ui-react";
import uuid from "uuid";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProjectListFormValues } from "../../app/models/project";
import { focusOnElementById } from "../../app/common/utils/utilities";
import { colors } from "../../app/common/styling/ColorPalette";

const ProjectAddListForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { createProjectList } = rootStore.projectStore;

  const [isAddingList, setIsAddingList] = useState(false);
  const [formValues, setFormValues] = useState<IProjectListFormValues>({
    id: uuid(),
    title: "",
    dateCreated: new Date(),
    deadline: new Date()
  });

  const handleformValuesChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const cancelAdding = () => {
    setIsAddingList(false);
    setFormValues({ ...formValues, title: "" });
  };

  const handleSubmit = () => {
    if (
      !formValues.title ||
      (formValues.title && formValues.title.trim() === "")
    ) {
      cancelAdding();
      return;
    }

    createProjectList(formValues);

    setFormValues({
      id: uuid(),
      title: "",
      dateCreated: new Date(),
      deadline: new Date()
    });

    focusOnElementById("inputTitle", document);
  };

  return (
    <Fragment>
      <Transition visible={!isAddingList} duration={0}>
        <Container className="timeline-element">
          <Button
            fluid
            size="large"
            inverted
            color={colors.positive}
            icon="plus"
            content="Add new list"
            onClick={() => setIsAddingList(true)}
          />
        </Container>
      </Transition>
      <Transition
        onStart={() => focusOnElementById("titleInput", document)}
        fluid
        visible={isAddingList}
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
                setIsAddingList(false);
                setFormValues({ ...formValues, title: "" });
              }}
            />
          </Button.Group>
        </Form>
      </Transition>
    </Fragment>
  );
};

export default observer(ProjectAddListForm);
