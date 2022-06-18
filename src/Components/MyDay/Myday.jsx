import React, { useState, useEffect } from "react";
import "./Scss/myday.css";
import { AddTodo } from "../AddTodo/AddTodo";
import { AiOutlineDelete } from "react-icons/ai";
import { BiStar } from "react-icons/bi";
import moment from "moment";

// function for get Local data
const getLocalData = () => {
  let todos = localStorage.getItem("todos");
  console.log(todos);
  if (todos) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

export const Myday = (props) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [allTodos, setAllTodos] = useState(getLocalData());

  // let handleCallback = (todo) => {
  //   setTodoTitle(todo);
  // //  let newTodo = {
  // //   id: allTodos.length +1,
  // //   task: todoTitle,
  // //   complete: false
  // //  }
  // //  let newTodos = allTodos.push(newTodo);
  // //  console.log(newTodos)
  // console.log(todoTitle)
  // };

  let completeTask = (myTodo) => {
    let mapped = allTodos.map((todo) => {
      return myTodo.id === todo.id
        ? { ...todo, complete: !todo.complete }
        : { ...todo };
    });
    setAllTodos(mapped);
    // console.log(mapped);
  };
  let clearCompletedTodos = () => {
    let inCompleteTodos = allTodos.filter((myTodo) => {
      return myTodo.complete === false;
    });
    setAllTodos(inCompleteTodos);
  };

  let deleteTodo = (todo) => {
    let notDeletedTodos = allTodos.filter((myTodo) => {
      return todo.id !== myTodo.id;
    });
    // console.log(notDeletedTodos)
    if (window.confirm("Are you really want to delete this task?")) {
      setAllTodos(notDeletedTodos);
    } else {
      // setAllTodos(!notDeletedTodos)
    }
  };
  const handleAddTodo = () => {
    if (todoTitle !== "") {
      let newTodo = {
        id: allTodos.length + 1,
        task: todoTitle,
        complete: false,
      };

      // let localTodo = localStorage.getItem("todo");
      let newAllTodos = [...allTodos, newTodo];
      // console.log(localTodo)
      setAllTodos(newAllTodos);
      setTodoTitle("");
      // console.log(getLocalData())
    } else {
      alert("Please fill the input value first");
    }
  };
  let onTrigger = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  // add Todos into localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);

  let inCompleteTodos = allTodos.filter((myTodo) => {
    return myTodo.complete === false;
  });

  let remainingTasks =
    inCompleteTodos.length === 1 || inCompleteTodos.length === 0
      ? `${inCompleteTodos.length} task remaining`
      : `${inCompleteTodos.length} tasks remaining`;

  let triggerHam = () => {
    props.getChildData("I am ham button");
  };

  return (
    <>
      <section className="section day-section">
        <div className="day-time">
          <div>
            <h1>My Day</h1>
            {/* <p>{day}, {new Date().getDate()} {month}</p> */}
            <p>{moment().format("dddd, DD MMM")}</p>
          </div>
          <div className="day-side">
            <p>{remainingTasks}</p>
            <button onClick={clearCompletedTodos} title="Clear completed tasks">
              Clear completed
            </button>
            <div className="hamburger-menu" title="Menu" onClick={triggerHam}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="todos-section-container">
          <div className="todos-section">
            {allTodos.length !== 0 ? (
              allTodos.map((todo) => {
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
                      <BiStar className="option star-opt" />
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
              <div className="focus-day empty-list">
                <div className="notepad">
                  <div className="notepad-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="notepad-bottom">
                    <hr />
                    <hr />
                    <hr />
                    {/* <hr /> */}
                  </div>
                </div>
                <div className="focusDay-heading">
                  <h1>Focus on your day</h1>
                  <p>
                    Get things done with My Day, a list that refreshes every
                    day.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="addTodo-section">
          {/* <AddTodo parentCallback={handleCallback} /> */}
          <section className="addtodo-sec">
            {/* <h1>Add a Task</h1> */}
            <div className="addtodo-container">
              <div className="t-circle"></div>
              <input
                type="text"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                placeholder="Add a Task"
                onKeyDown={onTrigger}
              />
              <div className="t-add" onClick={handleAddTodo}>
                +
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
