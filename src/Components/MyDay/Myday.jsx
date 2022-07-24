import React, { useState, useEffect, useContext } from "react";
import "./Scss/myday.css";
import { AddTodo } from "../AddTodo/AddTodo";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import { AllTodos } from "../../App";
// import theme4Pic from "../../Img/black-texture-bg.jpg";

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

  // Change Backgrounds
  let allBackgrounds = [
    "linear-gradient(to right bottom, rgb(65, 145, 253), rgb(70, 198, 222))",
    "linear-gradient(to right bottom, #e037a5, #cd49c1, #b25cda, #8b6cee, #4f7bfd)",
    "linear-gradient(to right bottom, #ff6300, #ff8100, #ff9d00, #ffb800, #ffd200)",
    "linear-gradient(135deg, rgb(60, 173, 191), rgb(120, 255, 194))",
    "linear-gradient(to right bottom, #ff5bb8, #ea85d2, #d6a4de, #cdbddd, #d1d1d1)",
    "linear-gradient(to right bottom, #369446, #53ae61, #70c87d, #8ce39a, #a8ffb7)",
    "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
  ];

  //Get local storage theme
  let getLocalTheme = ()=>{
    let currentTheme = localStorage.getItem("currentTheme");
    if(currentTheme){
      return JSON.parse(localStorage.getItem("currentTheme"));
    }
    else{
       return allBackgrounds[0];
    }
  }

export const Myday = (props) => {
  const contextTodos = useContext(AllTodos);
  let allTodos = contextTodos.allTodos;
  let setAllTodos = contextTodos.setAllTodos;
  let allDayTodos = allTodos.filter((todo) => {
    return todo.isDay === true;
  });

  // let theme4Url = "url(../../Img/black-texture-bg.jpg)";



  const [todoTitle, setTodoTitle] = useState("");
  const [dayTodos, setDayTodos] = useState(allDayTodos);


  const [secBackground, setSecBackground] = useState(allBackgrounds[0]);

  // useEffect(()=>{
  //   localStorage.setItem("currentTheme", JSON.stringify(secBackground));
  //   // setCurrentTheme(JSON.parse(localStorage.getItem("currentTheme")));
  // },[secBackground])




  // console.log(JSON.parse(localStorage.getItem("currentTheme")));

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
      let newDayTodos = [...dayTodos, newTodo];
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
    let newDayTodos = mapped.filter((todo) => {
      return todo.isDay === true;
    });
    setDayTodos(newDayTodos);
    setAllTodos(mapped);
    // console.log(mapped);
  };
  // Toggle b/w important task
  let toggleImportantTask = (myTodo) => {
    let mapped = allTodos.map((todo) => {
      return myTodo.id === todo.id
        ? { ...todo, isImportant: !todo.isImportant }
        : { ...todo };
    });
    // let newDayTodos = [...mapped, ...dayTodos ];
    let newDayTodos = mapped.filter((todo) => {
      return todo.isDay === true;
    });
    // let newAllTodos = [...all]
    setDayTodos(newDayTodos);
    setAllTodos(mapped);
  };
  // clear completed todos with one click
  let clearCompletedTodos = () => {
    let inCompleteTodos = allTodos.filter((myTodo) => {
      return myTodo.complete === false;
    });
    let newDayTodos = inCompleteTodos.filter((todo) => {
      return todo.isDay === true;
    });
    setDayTodos(newDayTodos);
    setAllTodos(inCompleteTodos);
  };
  // Delete particular todo
  let deleteTodo = (todo) => {
    let notDeletedTodos = allTodos.filter((myTodo) => {
      return todo.id !== myTodo.id;
    });
    let newDayTodos = notDeletedTodos.filter((todo) => {
      return todo.isDay === true;
    });
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

  let toggleSmallMenu = () => {
    document.getElementsByClassName("child-menu")[0].classList.toggle("active");
  };

  // let currentBackground = allBackgrounds[0];

  let changeTheme = (theme) => {
    switch (theme) {
      case "theme1":
        setSecBackground(allBackgrounds[0]);
        // setSecBackground(getLocalTheme(allBackgrounds[0]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[0]));
        break;
      case "theme2":
        setSecBackground(allBackgrounds[1]);
        // setSecBackground(getLocalTheme(allBackgrounds[1]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[1]));
        break;
      case "theme3":
        setSecBackground(allBackgrounds[2]);
        // setSecBackground(getLocalTheme(allBackgrounds[2]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[2]));
        break;
      case "theme4":
        setSecBackground(allBackgrounds[3]);
        // setSecBackground(getLocalTheme(allBackgrounds[3]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[3]));
        break;
      case "theme5":
        setSecBackground(allBackgrounds[4]);
        // setSecBackground(getLocalTheme(allBackgrounds[4]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[4]));
        break;
      case "theme6":
        setSecBackground(allBackgrounds[5]);
        // setSecBackground(getLocalTheme(allBackgrounds[5]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[5]));
        break;
      case "theme7":
        setSecBackground(allBackgrounds[6]);
        // setSecBackground(getLocalTheme(allBackgrounds[6]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[6]));
        break;
      default:
        setSecBackground(allBackgrounds[0]);
        // setSecBackground(getLocalTheme(allBackgrounds[0]))
        // localStorage.setItem("currentTheme", JSON.stringify(allBackgrounds[0]));
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("currentTheme", secBackground)
  //   console.log(secBackground);
  // }, [secBackground])
  

  let showThemeBar = () => {
    document
      .getElementsByClassName("themes-container")[0]
      .classList.toggle("active");
  };

  return (
    <>
      <section
        className="section day-section"
        style={{ background: secBackground }}
      >
        <div className="day-time">
          <div>
            <h1>My Day</h1>
            {/* <p>{day}, {new Date().getDate()} {month}</p> */}
            <p>{moment().format("dddd, DD MMM")}</p>
          </div>

          <div className="day-side">
          <p>{remainingTasks}</p>
            <div className="change-theme">
              <div
                className="t-btn"
                style={{ background: secBackground }}
                onClick={showThemeBar}
              >
                T
              </div>
              <div className="themes-container">
                <div
                  className="theme theme1"
                  onClick={() => changeTheme("theme1")}
                ></div>
                <div
                  className="theme theme2"
                  onClick={() => changeTheme("theme2")}
                ></div>
                <div
                  className="theme theme3"
                  onClick={() => changeTheme("theme3")}
                ></div>
                <div
                  className="theme theme4"
                  onClick={() => changeTheme("theme4")}
                ></div>
                <div
                  className="theme theme5"
                  onClick={() => changeTheme("theme5")}
                ></div>
                <div
                  className="theme theme6"
                  onClick={() => changeTheme("theme6")}
                ></div>
                <div
                  className="theme theme7"
                  onClick={() => changeTheme("theme7")}
                ></div>
              </div>
            </div>
            <div className="dot-menu">
              <ul>
                <li className="parent-menu">
                  <div className="dot-logo" onClick={toggleSmallMenu}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>

                  <ul className="child-menu">
                    <li
                      onClick={clearCompletedTodos}
                      title="Delete completed tasks"
                    >
                      Delete Completed tasks
                    </li>
                    {/* <li className="danger-li">Delete All tasks</li> */}
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
                      <FaStar
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
