import { observer } from "mobx-react-lite";
import { Modal, Button, Grid, Segment, Form, Header } from "semantic-ui-react";
import React, { ReactNode, useContext } from "react";
import { IAppTask } from "../../../app/models/appTask";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { RootStoreContext } from "../../../app/stores/rootStore";

const EditModal: React.FC<{ appTask: IAppTask; trigger: ReactNode }> = ({
  appTask,
  trigger
}) => {
  const rootStore = useContext(RootStoreContext);
  const { editAppTask } = rootStore.activityStore;

  const handleFinalFormSubmit = (values: any) => {
    editAppTask({ ...appTask, ...values });
  };
  return (
    <Modal trigger={trigger}>
      <Modal.Header content={appTask.title} />
      <Modal.Content image>
        <Modal.Description>
          <Grid>
            <Grid.Column width={10}>
              <Segment clearing>
                <FinalForm
                  initialValues={appTask}
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
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(EditModal);
