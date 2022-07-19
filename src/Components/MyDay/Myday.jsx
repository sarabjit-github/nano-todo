import React, { useState, useEffect, useContext } from "react";
import "./Scss/myday.css";
import { AddTodo } from "../AddTodo/AddTodo";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import { AllTodos } from "../../App";

// function for get Local data
// const getLocalData = () => {
//   let todos = localStorage.getItem("todos");
//   // console.log(todos);
//   if (todos) {
//     return JSON.parse(localStorage.getItem("todos"));
//   } else {
//     return [];
//   }
// };


export const Myday = (props) => {

  const contextTodos = useContext(AllTodos);
  let allTodos = contextTodos.allTodos;
  let setAllTodos = contextTodos.setAllTodos;
  let allDayTodos = allTodos.filter((todo)=>{
    return todo.isDay === true;
  })

  const [todoTitle, setTodoTitle] = useState("");
  const [dayTodos, setDayTodos] = useState(allDayTodos);
  // const [allTodos, setAllTodos] = useState(getLocalData());

  // console.log(dayTodos);

  // console.log(allTodos)



  // Handle for addTodo
  const handleAddTodo = () => {
    if (todoTitle !== "") {
      let newTodo = {
        id: Date.now(),
        task: todoTitle,
        complete: false,
        isImportant: false,
        isDay: true,
      };

      // let localTodo = localStorage.getItem("todo");
      let newDayTodos = [...dayTodos, newTodo]
      let newAllTodos = [...allTodos, newTodo];
      // console.log(localTodo)
      setDayTodos(newDayTodos);
      setAllTodos(newAllTodos);
      setTodoTitle("");
      // console.log(getLocalData())
    } else {
      alert("Please fill the input value first");
    }
  };

  // Toggle between complete task
  let toggleCompleteTask = (myTodo) => {
    let mapped = allTodos.map((todo) => {
      return myTodo.id === todo.id
        ? { ...todo, complete: !todo.complete }
        : { ...todo };
    });
    let newDayTodos = mapped.filter((todo)=>{
      return todo.isDay === true;
    })
    setDayTodos(newDayTodos);
    setAllTodos(mapped);
    // console.log(mapped);
  };
  // Toggle b/w important task
  let toggleImportantTask = (myTodo)=>{
    let mapped = allTodos.map((todo)=>{
      return myTodo.id === todo.id
      ? { ...todo, isImportant: !todo.isImportant }
      : { ...todo };
    });
    // let newDayTodos = [...mapped, ...dayTodos ];
    let newDayTodos = mapped.filter((todo)=>{
      return todo.isDay === true;
    })
    // let newAllTodos = [...all]
    setDayTodos(newDayTodos);
    setAllTodos(mapped);
  }
  // clear completed todos with one click
  let clearCompletedTodos = () => {
    let inCompleteTodos = allTodos.filter((myTodo) => {
      return myTodo.complete === false;
    });
    let newDayTodos = inCompleteTodos.filter((todo)=>{
      return todo.isDay === true;
    })
    setDayTodos(newDayTodos);
    setAllTodos(inCompleteTodos);
  };
  // Delete particular todo
  let deleteTodo = (todo) => {
    let notDeletedTodos = allTodos.filter((myTodo) => {
      return todo.id !== myTodo.id;
    });
    let newDayTodos = notDeletedTodos.filter((todo)=>{
      return todo.isDay === true;
    })
    // console.log(notDeletedTodos)
    if (window.confirm("Are you really want to delete this task?")) {
      setDayTodos(newDayTodos);
      setAllTodos(notDeletedTodos);
    } else {
      // setAllTodos(!notDeletedTodos)
    }
  };


  // let onTrigger = (e) => {
  //   if (e.keyCode === 13) {
  //     handleAddTodo();
  //   }
  // };

  // add Todos into localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);


  let inCompleteTodos = dayTodos.filter((myTodo) => {
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
            {dayTodos.length !== 0 ? (
              dayTodos.map((todo) => {
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
                          onClick={() => toggleCompleteTask(todo)}
                        />
                      </div>
                      <div className="todo-title">
                        <p className={todo.complete === true ? "strike" : ""}>
                          {todo.task.slice(0, 155)}
                        </p>
                      </div>
                    </div>

                    <div className="todo-opt">
                      <FaStar className={todo.isImportant ? "option star-opt-active":"option star-opt"} onClick={()=>toggleImportantTask(todo)} />
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
          <AddTodo getTodoTitle={setTodoTitle} addTodoFn={handleAddTodo} />
          {/* <section className="addtodo-sec">
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
          </section> */}
        </div>
      </section>
    </>
  );
};
