import React, { useState } from 'react'
import './Sidebar.css'
import {Link, NavLink} from 'react-router-dom';
import { RiHome4Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa"
const SideBar = () => {
  
  return (
    <div className='sidebar'>
      <div  className="sidebar-items"><NavLink exact to={'/'} activeClassName='active'><RiHome4Line  className='reacticons'/><h2>Home</h2></NavLink></div>
      <div className="sidebar-items"><NavLink to={'/Dashboard'} activeClassName='active'><RxDashboard className='reacticons'/><h2>Dashboard</h2></NavLink></div>
      <div className="sidebar-items"><NavLink to={'/AddProduct'} activeClassName='active'><IoAddCircleOutline className='reacticons'/><h2>Add Product</h2></NavLink></div>
      <div className="sidebar-items"><NavLink to={'/AddBrand'} activeClassName='active'><IoAddCircleOutline className='reacticons'/><h2>Add Brand</h2></NavLink></div>
      
      <div className="sidebar-items"><NavLink to={'/Edit'} activeClassName='active' ><FaRegEdit className='reacticons'/><h2>Edit Product</h2></NavLink></div>
   
    </div>
    
  )
}

export default SideBar
