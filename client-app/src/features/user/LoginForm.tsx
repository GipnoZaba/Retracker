import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Button,
  Label,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";
import { TextInput } from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { observer } from "mobx-react-lite";
import { registerPath } from "../../app/common/utils/paths";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              content="Log-in to your account"
            />
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Field
                  name="email"
                  component={TextInput}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Field
                  name="password"
                  component={TextInput}
                  placeholder="Password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                />
                {submitError && !dirtySinceLastSubmit && (
                  <Label color="red" basic content={submitError.statusText} />
                )}
                <br />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  loading={submitting}
                  positive
                  content="Login"
                />
              </Segment>
            </Form>
            <Message>
              New to us? <a href={registerPath}>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      )}
    />
  );
};

export default observer(LoginForm);
