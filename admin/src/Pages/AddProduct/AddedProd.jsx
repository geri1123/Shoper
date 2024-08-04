import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import { TiDeleteOutline } from 'react-icons/ti';
const AddedProd = () => {
  const [allproduct , setAllProducts]=useState([]);
  const [showConfirmDialog , setShowConfgDialog]=useState(false);
  const[deleteId , setDeleteId]=useState(null);
    
        const fetchallprod=async()=>{
            try{
                const res=await fetch('http://localhost:5000/allproducts');
                if(!res.ok){
                    throw new Error('failed to fetch data');

                }
                const data=await res.json();
                setAllProducts(data);


            } catch (error){
                console.log('error fetching data:', error);
            }

        };
        useEffect(()=>{
            fetchallprod();
        } ,[])
    
    const sortbydate=allproduct.sort((a,b)=>new Date(b.date)-new Date(a.date));
    
    const removehandler=async (id)=>{
        setShowConfgDialog(true);
        setDeleteId(id);
    }
    const confirmDelete=async(id)=>{
        setShowConfgDialog(false);
        await fetch('http://localhost:5000/removeproduct', {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:deleteId})
        })
       await fetchallprod();

    }
    const cancelDelete=()=>{
        setShowConfgDialog(false);
        setDeleteId(null);
    }

  return (
    <div className='addedproducts'>
        <h2>Added product</h2>
        {showConfirmDialog && (
      <div className="confirm-dialog">
      <div className="confirm-content">
        <p>Are you sure you want to delete this Product ?</p>
        <div className="confirm-buttons">
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      </div>
    </div>
     )}
        <table>
            <thead className='thead'>
                <tr>
                    <th>Id</th>
                    <th>Gender</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Image</th>
                    <th>Remove</th>
                    
                </tr>
            </thead>
            <tbody>
  {
    
    sortbydate.length > 0 ? sortbydate.map((prod , i)=>(
        <tr key={i} className={deleteId===prod.id ? 'removeicondelete':''} >
            <td>{prod.id}</td>
            <td>{prod.gender}</td>
            <td>{prod.brand}</td>
            <td>{prod.category}</td>
            <td>{prod.name}</td>
            <td>{prod.type}</td>
            <td><img className='prodimg' src={prod.img_url_1} alt="" /></td>
            <td  ><TiDeleteOutline onClick={()=>removehandler(prod.id)}  className='removeicon'/></td>
        </tr>
    )) : (
       <tr>
        <td colSpan={7}> No product found</td>
       </tr>      
    )

  

  }
                
            </tbody>
        </table>
      
    </div>
  )
}

export default AddedProd
