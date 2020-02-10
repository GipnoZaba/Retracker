import React, { useContext, Fragment } from "react";
import { Segment, Button, Container, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import RegisterForm from "../user/RegisterForm";
import LoginForm from "../user/LoginForm";
import { Link } from "react-router-dom";
import { workspacePath } from "../../app/common/utils/paths";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical>
      <Container>
        <Header as="h1" inverted content="Retracker" />
        <Fragment>
          <Header as="h2" inverted content="Welcome to Retracker" />
          {isLoggedIn ? (
            <Fragment>
              <Button
                as={Link}
                to={workspacePath}
                size="huge"
                inverted
                content="Open tasks"
              />
              <Button onClick={logout} size="huge" inverted content="Logout" />
            </Fragment>
          ) : (
            <Fragment>
              <Button
                onClick={() => openModal(<LoginForm />)}
                size="huge"
                inverted
                content="Login"
              />
              <Button
                onClick={() => openModal(<RegisterForm />)}
                size="huge"
                inverted
                content="Register"
              />
            </Fragment>
          )}
        </Fragment>
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
