import React from 'react';
import "../AddTodo/Scss/addtodo.css";

export const AddTodo = (props) => {
  let onTrigger = (e)=>{
    if(e.keyCode === 13){
       props.parentCallback(e.target.value)
       console.log(e.target.value)
    }
  }
  return (
      <>
    <section className='addtodo-sec'>
        {/* <h1>Add a Task</h1> */}
        <div className="addtodo-container">
            <div className="t-circle"></div>
            <input type="text" placeholder='Add a Task' onKeyDown={onTrigger} />
        </div>
    </section>
    </>
  )
}
