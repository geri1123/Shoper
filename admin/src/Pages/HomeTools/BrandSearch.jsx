import React, { useContext, useEffect, useRef, useState } from 'react'
import './HomeTools.css'
import { IoIosArrowForward } from "react-icons/io";
import { ShoperContext } from '../../Context/ShoperContext';

const BrandSearch = ({selectedbrand , setSelectedBrand ,countProductsByBrandAndCategory}) => {
    const {AllBrand ,filteredprod}=useContext(ShoperContext);
    const brandListref =useRef(null);
    const brandref=useRef(null);
    const [localSelectedBrands, setLocalSelectedBrands] = useState([]);
    const [isVisible , setIsVisible ]=useState(false);
    const handleclick=()=>{

        
       
           const showbr= brandListref.current.classList.toggle('show');
            
  if(showbr){
    setIsVisible(true)
  } else{
    setIsVisible(false);
  }
    



        
    };
    const remove =()=>{
        brandListref.current.classList.remove('show');
        setIsVisible(false);
    }
    useEffect(()=>{
        const handleOutsideclick=(e)=>{

        
        if(brandref.current && !brandref.current.contains(e.target)){
            remove();
           

        }
   };
   document.addEventListener("mousedown", handleOutsideclick);
    
   return () => {
       document.removeEventListener("mousedown", handleOutsideclick);
   };
         })

         
         const handleCheckboxChange = (e) => {
            const { id, checked } = e.target;
            setLocalSelectedBrands(prev =>
                checked ? [...prev, id] : prev.filter(brand => brand !== id )
            );
        };
        const handleApplyClick = () => {
            setSelectedBrand(localSelectedBrands);
            remove(); // Hide the dropdown
        };
        useEffect(() => {
            setLocalSelectedBrands(selectedbrand);
        }, [selectedbrand]);
       
  return (
    <div className='productssearch'>
        <div className="brand" ref={brandref}>
            <h4 onClick={handleclick}>Select a brand <IoIosArrowForward className={isVisible ?'arrow down':'arrow'} /></h4>
          <div className='brandList' ref={brandListref}>
            
           {AllBrand.length >0 ? AllBrand.map((b, i)=>(
            <div className="checkbox" key={i}>
            <input
               type="checkbox"
               id={b.brand}
               className='inputcheck'
               checked={localSelectedBrands.includes(b.brand)}
               onChange={handleCheckboxChange}
               disabled={countProductsByBrandAndCategory(b.brand)===0}
               />
              
            <label htmlFor={b.brand} disabled={countProductsByBrandAndCategory(b.brand)===0} className='labelcheck' >{b.brand}({countProductsByBrandAndCategory(b.brand)})</label>
            </div>
           )): (<p>There is no brand</p>) }
           
           
           {localSelectedBrands.length >0 ?<button onClick={handleApplyClick} className='addproductbtn' type='button'>Apply</button>:
           <button onClick={remove} className='addproductbtn' type='button'>Close</button>
           }
          </div>

        </div>
      
    </div>
  )
}


export default BrandSearch
