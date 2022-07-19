import "./Scss/App.css";
import { Navbar, Myday, Important, Planned, Tasks } from "./Components";
import { Routes, Route } from "react-router";
import { useState, useLayoutEffect, createContext  } from "react";

  // function for get Local data
  const getLocalData = () => {
    let todos = localStorage.getItem("todos");
    // console.log(todos);
    if (todos) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  };

export const AllTodos = createContext();

function App() {

  const [allTodos, setAllTodos] = useState(getLocalData())


  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [navDisplay, setNavDisplay] = useState(false);

useLayoutEffect(() => {
  function updateWindowSize(){
    setWindowSize(window.innerWidth);
  }
  window.addEventListener('resize', updateWindowSize)
  updateWindowSize();
  // return () => {
  //   second
  // };
}, [])

  let getChildData = (data) => {
    setNavDisplay(!navDisplay)
  };



  return (
    <>
    <AllTodos.Provider value={{allTodos, setAllTodos}}>
      <div className="App">
        <nav className="side-nav"
         style={{ left:  windowSize > 1024 || navDisplay ? "0":"-28rem" }}
        >
          <Navbar />
        </nav>
        <main
          className="main-content"
          //  style={{left: navDisplay ? "0": "0"}}
        >
          <div className="routes">
            <Routes>
              <Route
                exact
                path="/"
                element={<Myday getChildData={getChildData} />}
              />
              <Route exact path="/important" element={<Important getChildData={getChildData}/>} />
              <Route exact path="/planned" element={<Planned getChildData={getChildData}/>} />
              <Route exact path="/tasks" element={<Tasks getChildData={getChildData}/>} />
            </Routes>
          </div>
        </main>
      </div>
      </AllTodos.Provider>
    </>
  );
}

export default App;
