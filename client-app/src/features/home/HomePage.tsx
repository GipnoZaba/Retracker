import React, { useContext } from "react";
import { Segment, Button } from "semantic-ui-react";
import { LoginForm } from "../user/LoginForm";
import { RootStoreContext } from "../../app/stores/rootStore";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  
  return (
    <Segment>
      <LoginForm />
      <Button onClick={logout} content="Logout" />
    </Segment>
  );
};
