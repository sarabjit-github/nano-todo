import React from 'react';
import "./Scss/navbar.css";
import { NavLink } from 'react-router-dom';
import todoLogo from "../../Img/ms-todosLogo.svg";
import { CgMonday } from "react-icons/cg";
import { AiOutlineStar, AiOutlineHome } from "react-icons/ai";
import { BsCalendar2, BsSearch } from "react-icons/bs";

export const Navbar = () => {
  return (
      <>
        <nav className="navbar">
            <div className="n-comp1">
                <div className="n-logo">
                    <img src={todoLogo} alt="Micro todo logo" />
                    <p>Nano Todo</p>
                </div>
            </div>
            <div className="n-comp2">
                <div className="n-search"><input type="text" name="search" id="search" placeholder='Search here ...' /><BsSearch className='search-icon'/></div>
            </div>
            <div className="n-comp3">
                <div className="n-menus">
                    <ul>
                    <NavLink to="/" className='a-tag day'><li><CgMonday className='menu-logo'/>My Day</li></NavLink>
                    <NavLink to="/important" className='a-tag important'><li><AiOutlineStar className='menu-logo'/>Important</li></NavLink>
                    <NavLink to="/planned" className='a-tag planned'><li><BsCalendar2 className='menu-logo'/>Planned</li></NavLink>
                    <NavLink to="/tasks" className='a-tag tasks'><li><AiOutlineHome className='menu-logo'/>Tasks</li></NavLink>
                    </ul>
                </div>
            </div>
        </nav>
      </>

  )
}
