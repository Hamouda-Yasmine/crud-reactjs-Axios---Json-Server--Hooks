import React , { useState,useContext } from 'react'
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../app/app';
function Search({handleGetProducts}) {
    const[state,setState]=useContext(AppContext);
    const [searched,setSearched]=useState("");
    const handleSearch=(event)=>{
        event.preventDefault();
        handleGetProducts(searched,1,state.pageSize);
      }
  return (
    <form onSubmit={handleSearch}>
    <div className=' row g-2'>
      <div className='col-auto'>
        <input onChange={(e)=>setSearched(e.target.value)} 
        value={searched} className='form-control'></input>

      </div>
      <di className='col-auto'>
        <button  className='btn btn-success'>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
       </di>
    </div>
  </form>
  )
}

export default Search