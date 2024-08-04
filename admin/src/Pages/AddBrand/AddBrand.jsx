
import React, { useEffect, useState } from 'react';
import './AddBrand.css';
import upload_area from '../../assets/upload_area.svg';
import { TiDeleteOutline } from "react-icons/ti";
import {useNavigate} from 'react-router-dom';
const AddBrand = () => {
    const [brand, setBrand] = useState('');
    const [posterUrl, setPosterUrl] = useState(null);
    const [errorMessage , setErrorMessage]=useState(null);

    const [allbrands , setAllBrands]=useState([]);
    const [showConfirmDialog , setShowConfgDialog]=useState(false);
     const [deleteId, setDeleteId] = useState(null);
   
      const [succesfully , setSuccesfully]=useState(false);
        const fetchallbrand=async ()=>{
            await fetch('http://localhost:5000/allbrands')
            .then((res)=>res.json())
            .then((data)=>{setAllBrands(data) });
        };
        useEffect(()=>{
          fetchallbrand();
        }, [])
    const imageHandler = (e) => {
        setPosterUrl(e.target.files[0]);
    };

    const Add_Brand = async () => {
        if (!brand || !posterUrl) {
            setErrorMessage("Please fill all the fields");
            return;
        }

        let responseData;
        let formData = new FormData();
        formData.append('posterUrl', posterUrl); // Ensure the field name matches the one expected by multer

        try {
            const uploadResponse = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            responseData = await uploadResponse.json();
            if (!responseData.success) {
                alert("Failed to upload image");
                return;
            }

            const addBrandResponse = await fetch('http://localhost:5000/addbrand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    brand: brand,
                    posterUrl: responseData.image_url, // Use the image URL returned by the upload endpoint
                }),
            });

            const data = await addBrandResponse.json();
            if (data.success) {
                alert("Brand added");
                setBrand('');
                setPosterUrl(null);
                setErrorMessage("");
                fetchallbrand(); 
               window.location.reload('');
            } else {
                // alert(data.message || "Failed to add brand");
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Error adding brand:", error);
            alert("An error occurred. Please try again.");
        }
    };


  

const removehandler=async(id)=>{
  setShowConfgDialog(true);
  setDeleteId(id);
};

        const confirmDelete=async(id)=>{
setShowConfgDialog(false);
            await fetch('http://localhost:5000/removebrand' ,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                  },
                  body:JSON.stringify({id:deleteId})
            })
           
            setSuccesfully(true);
               await fetchallbrand();

            
            
            
        }
        const cancelDelete=()=>
        {
            setShowConfgDialog(false);
            setDeleteId(null);
        }
        const okHandler=()=>{
            setSuccesfully(false)
        }
    return (
        <div className='addbrand'>
            <div className="add">
            <h2>Add Brand</h2>
           
            <div className="addproduct-itemfield">
                <input
                    className='inputfield'
                    type="text"
                    placeholder='Add Brand (Balenciaga , Huggo ....)'
                    name='brand'
                    value={brand}
                    onChange={(e) => { setBrand(e.target.value); }}
                    required
                />
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={posterUrl ? URL.createObjectURL(posterUrl) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='posterUrl' id='file-input' hidden />
            </div>
            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
            <button className='addproduct-btn' onClick={() => { Add_Brand(); }}>Add</button>
        </div>
        <div className="addedbrand">
            <h2>All Brands</h2>
            {showConfirmDialog && (
      <div className="confirm-dialog">
      <div className="confirm-content">
        <p>Are you sure you want to delete this Brand ?</p>
        <div className="confirm-buttons">
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      </div>
    </div>
     )}
     {succesfully && (<div className="confirm-dialog">
      <div className="confirm-content">
        <p>succesfully deleted</p>
        <div className="confirm-buttons">
          <button onClick={okHandler}>Ok</button>
          
        </div>
      </div>
    </div>)}
        <table>
            <thead className='thead'>
            <tr>
                <th>id</th>
             <th>BrandName </th>
             <th>Img</th>
             <th className='remove'>Remove</th>

            </tr>
            </thead>
            <tbody>
       
                { allbrands.length>0 ?
                    allbrands.map((brand ,i)=>(

                       <tr key={i} className={deleteId === brand.id ? 'removeicondelete' : ''}>
                    <td>{brand.id}</td>
                    <td>{brand.brand}</td>
                    <td><img className='tdimg' src={brand.posterUrl} alt="" /></td>
               <td  ><TiDeleteOutline onClick={()=>removehandler(brand.id)}  className='removeicon'/></td>
                </tr>  
                    )):
                    (
                        <tr>
                            <td colSpan="3">No brand found</td>
                        </tr>
                    )
                }
               
            </tbody>
            
        </table>
        </div>
        
        </div>
    );
};

export default AddBrand;