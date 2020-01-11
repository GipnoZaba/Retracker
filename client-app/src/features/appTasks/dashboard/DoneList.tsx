import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import FlipMove from "react-flip-move";
import AppTaskStore from "../../../app/stores/appTaskStore";

const animationSettings = {
  duration: 350,
  delay: 0,
  easing: "ease",
  enterAnimation: "accordionVertical" as any,
  leaveAnimation: "accordionVertical" as any
};

const DoneList = () => {
  const appTaskStore = useContext(AppTaskStore);
  const { doneTasksByOrder } = appTaskStore;

  return (
    <FlipMove
      typeName={null}
      duration={animationSettings.duration}
      delay={animationSettings.delay}
      easing={animationSettings.easing}
      enterAnimation={animationSettings.enterAnimation}
      leaveAnimation={animationSettings.leaveAnimation}
    >
      {doneTasksByOrder.map(appTask => (
        <div key={appTask.id}>
          <TodoItem appTask={appTask} />
        </div>
      ))}
    </FlipMove>
  );
};

export default observer(DoneList);
