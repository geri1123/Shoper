import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css'
import AddProduct from './Pages/AddProduct/AddProduct';
import AddBrand from './Pages/AddBrand/AddBrand';

import Dashboard from './Pages/Dashboard/Dashboard';
import Edit from './Pages/Edit/Edit';

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <div className="AppComponents">
      <Sidebar/>
<Routes>
  <Route exact path='/' element={<Home/>}/>
  <Route path='/Edit' element={<Edit/>}/>
  <Route path='/Dashboard' element={<Dashboard/>}/>
  <Route path='/AddProduct' element={<AddProduct/>}/>
  <Route path='/AddBrand' element={<AddBrand/>}/>
 

</Routes>

      </div>
    
    </div>
  )
}

export default App
