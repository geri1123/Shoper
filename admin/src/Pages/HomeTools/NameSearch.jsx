import React, { useContext, useEffect, useRef, useState } from 'react'
import './HomeTools.css'
import { IoIosArrowForward } from "react-icons/io";
import { ShoperContext } from '../../Context/ShoperContext';
import { ClothingCategories } from '../AddProduct/Name';
const NameSearch = ({selectedbrand , searchCategory }) => {
    const {AllBrand}=useContext(ShoperContext);
    const brandListref =useRef(null);

    const brandref=useRef(null);
    const names=useRef(null);
    
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
   
         const filteritems=ClothingCategories.find(ite=>ite.name===searchCategory);
       
         useEffect(() => {
            if (isVisible) {
                // Force reflow before measuring heights
                names.current.offsetHeight; // Trigger reflow
                const nameHeight = names.current.scrollHeight; // Total content height
                const brandListHeight = brandListref.current.offsetHeight;
    
                if (nameHeight > brandListHeight) {
                    names.current.style.overflowY = "scroll";
                   
                } else {
                    names.current.style.overflowY = "hidden";
                    
                }
            }
        }, [isVisible]);
  return (
    <div className='productssearch'>

<div className="brand" ref={brandref}>
            <h4 onClick={handleclick}>Select a Name <IoIosArrowForward className={isVisible ?'arrow down':'arrow'} /></h4>
          <div className='NameList'  ref={brandListref}>
            
            <div className="names" ref={names}>
           
 
            {filteritems && filteritems.items.map((srch)=>(     <div className="checkbox" key={srch.id} >
            <input
               type="checkbox"
               id={srch.id}
               className='inputcheck'
               checked=''
               onChange=''
               
               />
             
            <label htmlFor={srch.id}  className='labelcheck' >{srch.name}</label>
            </div>
           )) }
           
            </div>
           
           <button  className='addproductbtn' type='button'>Apply</button>
          </div>
          

        </div>
    </div>
  )
}

export default NameSearch
