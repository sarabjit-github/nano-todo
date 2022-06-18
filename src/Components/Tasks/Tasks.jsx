import React from "react";
import "./Scss/tasks.css";

export const Tasks = (props) => {
  let triggerHam = () => {
    props.getChildData("I am ham button");
  };
  return (
    <section className="section tasks-section">
      <div className="day-time">
        <h1>Planned</h1>
        <div className="hamburger-menu" title="Menu" onClick={triggerHam}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="working">
        <h1>website is Under construction</h1>
      </div>
    </section>
  );
};
