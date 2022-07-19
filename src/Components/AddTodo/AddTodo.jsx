import React, { useState, useEffect } from "react";
import "../AddTodo/Scss/addtodo.css";

export const AddTodo = ({getTodoTitle, addTodoFn}) => {
  const [todoTitle, setTodoTitle] = useState("");

  let onTrigger = (e) => {
    if (e.keyCode === 13) {
      addTodoFn();
      setTodoTitle("");
      // console.log(e.target.value);
    }
  };
  useEffect(() => {
    getTodoTitle(todoTitle);
  }, [todoTitle,getTodoTitle])
  

  // Add todo
  // const handleAddTodo = () => {
  //   if (todoTitle !== "") {
  //     let newTodo = {
  //       id: allTodos.length + 1,
  //       task: todoTitle,
  //       complete: false,
  //     };

  //     // let localTodo = localStorage.getItem("todo");
  //     let newAllTodos = [...allTodos, newTodo];
  //     // console.log(localTodo)
  //     setAllTodos(newAllTodos);
  //     setTodoTitle("");
  //     // console.log(getLocalData())
  //   } else {
  //     alert("Please fill the input value first");
  //   }
  // };


  return (
    <>
      <section className="addtodo-sec">
        {/* <h1>Add a Task</h1> */}
        <div className="addtodo-container">
          <div className="t-circle"></div>
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            onKeyDown={onTrigger}
            placeholder="Add a Task"
          />
          <div className="t-add" onClick={addTodoFn}>
            +
          </div>
        </div>
      </section>
    </>
  );
};
