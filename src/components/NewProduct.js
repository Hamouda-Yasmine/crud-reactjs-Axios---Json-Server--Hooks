import React, { useState } from 'react'
import { saveProduct } from '../app/app';
import { json } from 'react-router-dom';

function NewProduct() {
  const[name,setName]=useState("");
  const[price,setPrice]=useState(0);
  const[checked,setChecked]=useState(false);


  const handalSaveProduct=(event)=>{
    console.log("helllooo"+name);
    //pour ne pas reafrichir la page une fois le formulaire recupere les donnees
    event.preventDefault();
    let products={name,price,checked};
     saveProduct(products).then(resp=>{
     alert(JSON.stringify(resp.data));
     }).catch(err=>{console.log(err);});
    };
  
  return (
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
        <div className='card-body'>
          <form onSubmit={handalSaveProduct}>
            <div className='mb-3'>
               <label className='form-label'>Name :</label>
               <input onChange={(e)=>setName(e.target.value)} 
               value={name} className='form-control' type='text'></input>
            </div>
            <div className='mb-3'>
               <label className='form-label' >price:</label>
               <input onChange={(e)=>setPrice(e.target.value)} 
               value={price} className='form-control' type='number'></input>
            </div>
            <div className="form-check">
            <label className="form-check-label" >
    Checked 
           </label>
            <input onChange={(e)=>setChecked(e.target.value)} 
               checked={checked}
            className="form-check-input" type="checkbox" />
 
          </div>
          <button  className='btn btn-success'>Save</button>
       
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct