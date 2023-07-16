import { faCheckCircle, faCircle, faFileEdit,  faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { AppContext, checkProduct, deleteProducts, getProducts } from '../app/app'
import { useNavigate } from 'react-router-dom'
import Search from './Search'

function Products() {
 /*const [products,setProduct]= useState([
    {id:1,name:"computer",price:1000,checked:false},
    {id:2,name:"keybord",price:500,checked:true},
    {id:3,name:"cable",price:200,checked:false}])*/
    //en peut ecrire "function deleteProduct(product){}"

 
/* before la centralisation du state
const [state,setState]= useState({
  products:[],
  currentPage:1,
  pageSize:4,
  keyword:"",
  totalPages:0,
});*/

//after la centralisation

const[state,setState]=useContext(AppContext);

/*le code sans pagination

const [products,setProducts]=useState([]);
useEffect(()=>{handleGetProducts();},[])
const handleGetProducts=()=>{
  getProducts().then(resp=>{
    setProduct(resp.data);
}).catch(err=>{console.log(err);})}
const deleteProduct =(product)=>{
 deleteProducts(product).then(resp=>{
const newProducts=products.filter((p)=>p.id!=product.id);
setProduct(newProducts);
 });
}
const handleCheckedProduct=(product)=>{
  checkProduct(product).then(resp=>{
   const newProducts=products.map((p)=>{
    if(p.id==product.id){p.checked = !p.checked;}
    return p;});
    setProduct(newProducts);
     });
}

*/ 

useEffect(()=>{handleGetProducts(state.keyword,state.currentPage,state.pageSize);},[])

//get
const handleGetProducts=(keyword,page,size)=>{
  getProducts(keyword,page,size).then(resp=>{
   //"x-total-cont" varibale dans jason qui contient le nombre total des elements elle se trouve dans headers
    const totalElement=resp.headers['x-total-count'];
    // floor pour supprimer la virgule
    let totalPages=Math.floor(totalElement/size);
    if(totalElement % size !=0) ++totalPages;
    setState({
      products:resp.data,
      keyword:keyword,
      currentPage:page,
      pageSize:size,
      totalPages:totalPages});
}).catch(err=>{console.log(err);})}  

//delete
const deleteProduct =(product)=>{
 deleteProducts(product).then(resp=>{
const newProducts=state.products.filter((p)=>p.id!=product.id);
setState({...state,products:newProducts});
 });
}

//patch
const handleCheckedProduct=(product)=>{
  checkProduct(product).then(resp=>{
   const newProducts=state.products.map((p)=>{
    if(p.id==product.id){p.checked = !p.checked;}
    return p;});
    setState({...state,products:newProducts});
     });
}
const handleGoToPage=(page)=>{
  handleGetProducts(state.keyword,page,state.pageSize)

};
   //to navigate to another js page 
   const navigate=useNavigate();


  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card m-2'>
          <div className='card-body'>
            <Search handleGetProducts={handleGetProducts}></Search>
          </div>

          </div>
         <div className='card m-1'>
         
          <div className='card-body'>
            
            <table className='table ' >
              <thead>
              <tr>
                 <th>ID</th> <th>Name</th><th>Price</th><th>Checked</th><th>Delete</th><th>Edit</th>
              </tr>  
              </thead>
              <tbody>
                
                {
                  state.products.map(product=>(
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button onClick={()=>handleCheckedProduct(product)} className='btn btn-outline-success'>
                          <FontAwesomeIcon icon={product.checked? faCheckCircle : faCircle}>
                          </FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        
                        <button onClick={()=>deleteProduct(product)} className="btn btn-outline-danger">
                          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        
                        <button onClick={()=>navigate(`/editProduct/${product.id}`)} className="btn btn-outline-info">
                          <FontAwesomeIcon icon={faFileEdit}></FontAwesomeIcon>
                        </button>
                      </td>

                      
                    </tr> ) )}
               </tbody>
             </table>
             <ul className='nav nav-pills'>
              {
                (new Array(state.totalPages).fill(0)).map((v,index)=>(
                  <li key={index+1}>
                  <button onClick={()=>handleGoToPage(index+1)} className={state.currentPage==index+1?"btn btn-info ms-1":'btn btn-outline-info ms-1'}>{index+1}</button>
                   </li>

                ))
              }
    
             </ul>
         </div>
        </div>
       </div>
      </div>
     </div>
  )
}

export default Products