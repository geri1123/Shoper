import React, { useEffect, useRef } from 'react';
import './Css/ProductDetail.css'; // Ensure this file contains the required styling
import { IoMdClose } from "react-icons/io";
const Productdetail = ({ product  , setSelectedProduct}) => {
    const prodRef =useRef();
  if (!product) {
    return <p>No product selected</p>; // Provide feedback if no product is selected
  }

  const { id, productName, img_url_1, img_url_2, old_price, new_price, description , 
    brand ,
    name,
    collections,
    material , itemNumber , size } = product;
    const sizeString = size.map(s => s.size).join(', ');
    const close = () => {
        setSelectedProduct(null);
      };
      

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (prodRef.current && !prodRef.current.contains(event.target)) {
            close();
          }
        };
    
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handledeleteprod = async (id) => {
        // Show a confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        
        if (confirmed) {
         
          try {
            await fetch('http://localhost:5000/removeproduct', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            
           
            
            window.location.reload();
          } catch (error) {
        
            console.error('Error deleting product:', error);
          }
        } else {
      
          console.log('Product deletion cancelled');
        }
      };
  return (
    <div className='productdetail'>
        <div className="prodd" ref={prodRef}>
         <h1 className='h1proddet'>Product Detail</h1>
        <div className="proddetailcard">
      
      <div className='productdetail-images'>
        {/* Display primary image */}
        <img src={img_url_1} alt={productName} className='main-image' />
       
        
      </div>
      <div className="proddesc">
        <IoMdClose className='closeProduct' onClick={close}/>
      <h2 className='h2proddet'>{productName}</h2>
      <p className='pprdocuctdetail'>ID: <span >{id}</span></p>
      <p className='pprdocuctdetail'>itemNumber: <span>{itemNumber}</span></p>
      <div className="priceprodd"><p className='pprdocuctdetail'>Old Price:<span> {old_price}€</span></p>
      <p className='pprdocuctdetail'>New Price: <span>{new_price}€</span></p>
      </div>
      <p className='pprdocuctdetail'>Brand: <span>{brand}</span></p>
      <p className='pprdocuctdetail'>Name:<span>{name}</span> </p>
      <p className='pprdocuctdetail'>Collection:<span>{collections}</span> </p>
      <p className='pprdocuctdetail'>Material: <span>{material}</span></p>
    
        <p className='pprdocuctdetail'>size: <span >{sizeString}</span></p>
   
      {description && <p className='pprdocuctdetail'>Description: <span>{description}</span></p>} {/* Display description if available */}
      {/* Add more details if needed */}
      
      </div>
      <button onClick={()=>handledeleteprod(id)} type='button' >Delete this Product</button>
    </div>
   
    </div>
    
    </div>
  );
};

export default Productdetail;