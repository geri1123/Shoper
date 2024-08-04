import React, { useState } from 'react'
import './Items.css'
import { Link } from 'react-router-dom';

const Items = (props) => {
    const[hovered , setHovered]=useState(false);
    const handleMouseEnter=()=>{
        setHovered(true);
    }
    const handleMouseLeave = () => {
        setHovered(false);
    };

    const calculateDiscount = () => {
        const oldPrice = parseFloat(props.old_price);
        const newPrice = parseFloat(props.new_price);
        if (oldPrice && newPrice && oldPrice > newPrice) {
          const discount = ((oldPrice - newPrice) / oldPrice) * 100;
          return discount.toFixed(2); // Limit to 2 decimal places
        }
        return 0;
      };

  return (
    <div className='items card'>
      <Link to="#" className='text-decoration-none text-dark'>
        <img className='card-img-top  img-fluid'
         src={hovered? props.img_url_2 : props.img_url_1}
          alt={props.name} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          />
        <p className='collection'>{props.collection}</p>
        <div className="card-body ">
          <h3 className='card-title'>{props.brand}--(id:{props.id})</h3>
          <h4 className='card-subtitle mb-2'>{props.name}</h4>
          <div className="discount">
          <h2 className='text-muted'>RRP {props.old_price} € </h2>
          <h5 className=' pDiscount'>-{calculateDiscount()}%</h5>
          </div>
          <h2>{props.new_price}€</h2>
          
        </div>
      </Link>
    </div>
  );
}

export default Items
