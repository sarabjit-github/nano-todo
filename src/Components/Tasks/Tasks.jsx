import React, { useContext, useState } from "react";
import "./Scss/tasks.css";
import { AddTodo } from "../AddTodo/AddTodo";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { AllTodos } from "../../App";

export const Tasks = (props) => {

  const contextTodos = useContext(AllTodos);
  let allTodos = contextTodos.allTodos;
  let setAllTodos = contextTodos.setAllTodos;

  const [todoTitle, setTodoTitle] = useState("")

  // handle for addTodo
  let handleAddTodo =()=>{
    if (todoTitle !== "") {
      let newTodo = {
        id: allTodos.length + 1,
        task: todoTitle,
        complete: false,
        isImportant: false,
        isDay: false,
      };

      // let localTodo = localStorage.getItem("todo");
      // let newDayTodos = [...dayTodos, newTodo]
      let newAllTodos = [...allTodos, newTodo];
      // console.log(localTodo)
      // setDayTodos(newDayTodos);
      setAllTodos(newAllTodos);
      setTodoTitle("");
      // console.log(getLocalData())
    } else {
      alert("Please fill the input value first");
    }
  }

  let triggerHam = () => {
    props.getChildData("I am ham button");
  };
  return (
    <section className="section tasks-section">
      <div className="day-time">
        <h1>Tasks</h1>
        <div className="hamburger-menu" title="Menu" onClick={triggerHam}>
          <div></div>
          <div></div>
          <div></div>
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
                          // onClick={() => toggleCompleteTask(todo)}
                        />
                      </div>
                      <div className="todo-title">
                        <p className={todo.complete === true ? "strike" : ""}>
                          {todo.task.slice(0, 155)}
                        </p>
                      </div>
                    </div>

                    <div className="todo-opt">
                      <FaStar className={todo.isImportant ? "option star-opt-active":"option star-opt"}
                      //  onClick={()=>toggleImportantTask(todo)}
                        />
                      <AiOutlineDelete
                        className="option delete-opt"
                        title="Delete task"
                        // onClick={() => deleteTodo(todo)}
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
        </div>

    </section>
  );
};
