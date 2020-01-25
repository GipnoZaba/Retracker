import React, { Fragment, useContext, useEffect } from "react";
import SideBar from "../../features/nav/SideBar";
import TodoBoard from "../../features/appTasks/dashboard/TodoBoard";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import "../layout/styles.css";
import { RootStoreContext } from "../stores/rootStore";
import RegisterForm from "../../features/user/RegisterForm";
import LoadingComponent from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
import NotFound from "./NotFound";
import ProjectSelectionBoard from "../../features/projects/ProjectSelectionBoard";
import Dashboard from "../../features/dashboard/Dashboard";
import HomePage from "../../features/home/HomePage";
import ModalContainer from "../common/modal/ModalContainer";
import LoginForm from "../../features/user/LoginForm";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, appLoaded, token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <SideBar />
            <div className="main">
              <Switch>
                <Route path="/today" component={TodoBoard} />
                <Route path="/projects" component={ProjectSelectionBoard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
