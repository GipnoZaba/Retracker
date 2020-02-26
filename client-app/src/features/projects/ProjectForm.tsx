import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { combineValidators, isRequired } from "revalidate";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IProjectFormValues } from "../../app/models/project";
import { Button, Header, Form } from "semantic-ui-react";
import { TextInput } from "../../app/common/form/TextInput";

const ProjectFrom = () => {
  const rootStore = useContext(RootStoreContext);
  const { createProject, submitting } = rootStore.projectStore;
  const { closeModal } = rootStore.modalStore;

  const validate = combineValidators({
    title: isRequired({ message: "The title is required" })
  });

  const handleFinalFormSubmit = (values: IProjectFormValues) => {
    closeModal();
    createProject(values);
  };

  return (
    <FinalForm
      validate={validate}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Header size="small" content="Title" />
          <Field name="title" placeholder="Title" component={TextInput} />
          <Button
            loading={submitting}
            disabled={invalid || pristine}
            positive
            type="submit"
            content="Submit"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProjectFrom);
