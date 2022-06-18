import React from "react";
import "./Scss/important.css";
import { IoHomeOutline } from "react-icons/io5";
import { BsStar } from "react-icons/bs";
import { BsCalendar2 } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

export const Important = (props) => {
  let triggerHam = () => {
    props.getChildData("I am ham button");
  };
  return (
    <section className="section imp-section">
      <div className="day-time">
        <h1>Important</h1>
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
