import React, { useContext, useState, useEffect } from "react";
import "./Scss/important.css";
// import { IoHomeOutline } from "react-icons/io5";
// import { BiStar } from "react-icons/bi";
// import { BsCalendar2 } from "react-icons/bs";
// import { BsSun } from "react-icons/bs";
// import { AiOutlineStar, AiOutlineHome } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { AllTodos } from "../../App";
import { AddTodo } from "../AddTodo/AddTodo";
import importantIll from "../../Img/imp-ill.png";

export const Important = (props) => {
  const contextTodos = useContext(AllTodos);
  let allTodos = contextTodos.allTodos;
  // let setAlltodos = contextTodos.setAlltodos;

  let setAllTodos = contextTodos.setAllTodos;

  const importantTodos = allTodos.filter((todo) => {
    return todo.isImportant === true;
  });

  const [todoTitle, setTodoTitle] = useState("");
  const [impTodos, setImpTodos] = useState(importantTodos);

  const handleAddTodo = () => {
    if (todoTitle !== "") {
      let newTodo = {
        id: Date.now(),
        task: todoTitle,
        complete: false,
        isImportant: true,
      };
      let newImpTodos = [...impTodos, newTodo];

      let newAllTodos = [...allTodos, newTodo];

      setImpTodos(newImpTodos);
      setAllTodos(newAllTodos);
      setTodoTitle("");
    } else {
      alert("Please fill the input value first");
    }
  };

  // Toggle b/w complete task
  let completeTask = (myTodo) => {
    let mapped = allTodos.map((todo) => {
      return myTodo.id === todo.id
        ? { ...todo, complete: !todo.complete }
        : { ...todo };
    });
    let newImpTodos = mapped.filter((todo) => {
      return todo.isImportant === true;
    });
    setImpTodos(newImpTodos);
    setAllTodos(mapped);
  };

  // Toggle b/w important task
  let toggleImportantTask = (myTodo) => {
    let mapped = allTodos.map((todo) => {
      return myTodo.id === todo.id
        ? { ...todo, isImportant: !todo.isImportant }
        : { ...todo };
    });
    let newImpTodos = mapped.filter((todo) => {
      return todo.isImportant === true;
    });
    setImpTodos(newImpTodos);
    setAllTodos(mapped);
  };

  let inCompleteTodos = impTodos.filter((myTodo) => {
    return myTodo.complete === false;
  });

  let remainingTasks =
    inCompleteTodos.length === 1 || inCompleteTodos.length === 0
      ? `${inCompleteTodos.length} task remaining`
      : `${inCompleteTodos.length} tasks remaining`;

  let clearCompletedTodos = () => {
    setImpTodos(inCompleteTodos);
  };

  let deleteTodo = (myTodo) => {
    let notDeletedTodos = allTodos.filter((todo) => {
      return myTodo.id !== todo.id;
    });
    let newImpTodos = notDeletedTodos.filter((todo) => {
      return todo.isImportant === true;
    });
    if (window.confirm("Are you really want to delete this task?")) {
      setImpTodos(newImpTodos);
      setAllTodos(notDeletedTodos);
    } else {
    }
  };

  // add Todos into localStorage
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(allTodos));
  // }, [allTodos]);

  // useEffect(() => {
  //   const importantTodos = allTodos.filter((todo)=>{
  //     return todo.isImportant === true;
  //   })
  //   console.log(importantTodos)
  // }, [allTodos])

  // console.log(importantTodos)

  let triggerHam = () => {
    props.getChildData("I am ham button");
  };

  let toggleSmallMenu = () => {
    document.getElementsByClassName("child-menu")[0].classList.toggle("active");
    console.log("toggle");
  };

  return (
    <section className="section imp-section">
      <div className="day-time">
        <h1>
          <AiOutlineStar className="imp-str" />
          Important
        </h1>

        <div className="day-side">
          <p>{remainingTasks}</p>
          <div className="dot-menu">
              <ul>
                <li className="parent-menu">
                  <div className="dot-logo" onClick={toggleSmallMenu}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>

                  <ul className="child-menu">
                    <li onClick={clearCompletedTodos} title="Delete completed tasks" >Delete Completed tasks</li>
                  </ul>
                </li>
              </ul>

              {/* <button
                onClick={clearCompletedTodos}
                title="Clear completed tasks"
                className="clr-btn"
              >
                Delete Cmpl. tasks
              </button> */}
            </div>
          <div className="hamburger-menu" title="Menu" onClick={triggerHam}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="todos-section-container">
        <div className="todos-section">
          {impTodos.length !== 0 ? (
            impTodos.map((todo) => {
              return (
                <div className="todo-item" key={todo.id}>
                  <div className="todo-check-item">
                    <div className="todo-checkbox">
                      <input
                        type="checkbox"
                        defaultChecked={todo.complete === true ? true : false}
                        name="checkTodo"
                        id="checkTodo"
                        title="Complete task"
                        onClick={() => completeTask(todo)}
                      />
                    </div>
                    <div className="todo-title">
                      <p className={todo.complete === true ? "strike" : ""}>
                        {todo.task.slice(0, 155)}
                      </p>
                    </div>
                  </div>

                  <div className="todo-opt">
                    <BsStarFill
                      className={
                        todo.isImportant
                          ? "option star-opt-active"
                          : "option star-opt"
                      }
                      onClick={() => toggleImportantTask(todo)}
                    />
                    <AiOutlineDelete
                      className="option delete-opt"
                      title="Delete task"
                      onClick={() => deleteTodo(todo)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-imp-sec">
              <img src={importantIll} alt="No important tasks" width="150" />
              <p>Try starring some tasks to see them here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="addTodo-section">
        <AddTodo getTodoTitle={setTodoTitle} addTodoFn={handleAddTodo} />
      </div>
    </section>
  );
};
