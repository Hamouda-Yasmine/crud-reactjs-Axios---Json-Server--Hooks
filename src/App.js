
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Home from './components/Home';
import NewProduct from './components/NewProduct';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import Stats from './components/Stats';
import EditProduct from './components/EditProduct';
import { AppContext, useAppState } from './app/app';
function App() {
  //react hooks
 const [currentRoute, setCurrentRoute]= useState();
 useEffect(()=>{
    const path=window.location.pathname;
    setCurrentRoute(path.slice(1,path.length));
  },[]);

 return (
    <AppContext.Provider value={useAppState()} >
      <BrowserRouter>
    
    <nav className='m-1 p-1 border border-info navbar navbar-expand-lg navbar-light bg-light'>
      <ul className='nav na-pills'>
        <li>
          <Link onClick={()=>setCurrentRoute("home")}className={currentRoute=="home"?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/home"}> Home</Link>
        </li>
        <li>
          <Link onClick={()=>setCurrentRoute("products")}className={currentRoute=="products"?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/products"}> Products</Link>
        </li>
        <li>
          <Link onClick={()=>setCurrentRoute("newProduct")}className={currentRoute=="newProduct"?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/newProduct"}> New Product</Link>
        </li>
      </ul>
      <ul className='nav navbar-nav'>
        <li className='nav-item'><Stats></Stats></li>
        
          
        
      </ul>
      </nav>
    <Routes>
    
      <Route path="/home"element={<Home/>}></Route>
      <Route path="/products"element={<Products/>}></Route>
      <Route path="/newProduct"element={<NewProduct/>}></Route>
      <Route path="/editProduct/:id"element={<EditProduct/>}></Route>
    </Routes>

    </BrowserRouter>
    </AppContext.Provider>
    
  );
}

export default App;
