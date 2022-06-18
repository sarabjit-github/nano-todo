import "./Scss/App.css";
import { Navbar, Myday, Important, Planned, Tasks } from "./Components";
import { Routes, Route } from "react-router";
import { useState, useLayoutEffect  } from "react";

function App() {

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
    </>
  );
}

export default App;
