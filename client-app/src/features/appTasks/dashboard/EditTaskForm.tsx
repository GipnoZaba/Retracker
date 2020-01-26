import { observer } from "mobx-react-lite";
import { Button, Segment, Form, Header } from "semantic-ui-react";
import React, { useContext } from "react";
import { IAppTask, IAppTaskFormValues } from "../../../app/models/appTask";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";

const EditTaskForm: React.FC<{ appTask: IAppTask }> = ({ appTask }) => {
  const rootStore = useContext(RootStoreContext);
  const { editAppTask, submitting } = rootStore.activityStore;

  const validate = combineValidators({
    title: isRequired({ message: "The title is required" })
  });

  const handleFinalFormSubmit = (values: IAppTaskFormValues) => {
    editAppTask({ ...appTask, ...values });
  };

  return (
    <Segment clearing>
      <FinalForm
        initialValues={appTask}
        validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Header content="Title" />
            <Field
              name="title"
              placeholder="Title"
              value={appTask.title}
              component={TextInput}
            />
            <Header content="Description" />
            <Field
              name="description"
              placeholder="Description"
              rows={3}
              value={appTask.description}
              component={TextAreaInput}
            />
            <Button
              loading={submitting}
              floated="right"
              disabled={invalid || pristine}
              positive
              type="submit"
              content="Submit"
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(EditTaskForm);
