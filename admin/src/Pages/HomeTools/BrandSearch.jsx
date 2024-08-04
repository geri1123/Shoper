import React, { useContext, useEffect, useRef, useState } from 'react'
import './HomeTools.css'
import { IoIosArrowForward } from "react-icons/io";
import { ShoperContext } from '../../Context/ShoperContext';

const BrandSearch = ({selectedbrand , setSelectedBrand ,countProductsByBrandAndCategory}) => {
    const {AllBrand }=useContext(ShoperContext);
    const brandListref =useRef(null);
    const brands=useRef(null);
    const brandref=useRef(null);
    const [localSelectedBrands, setLocalSelectedBrands] = useState([]);
    const [isVisible , setIsVisible ]=useState(false);
    const[searchbrand , setsearchbrand]=useState('');
    const handleclick=()=>{

        
       
           const showbr= brandListref.current.classList.toggle('show');
            
  
    setIsVisible(showbr);
   
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

      //    const handleCheckboxChange = (e) => {
      //     const { id, checked } = e.target;
      //     setLocalSelectedBrands(prev =>
      //         checked ? [...prev, id] : prev.filter(brand => brand !== id)
      //     );
      // };
      const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setLocalSelectedBrands(prev => [...prev, id]); 
           
        } else {
            setLocalSelectedBrands(prev => prev.filter(brand => brand !== id));
        }
    };
    const handleBrandClick = (brand) => {
      // Remove brand from local selection
      setLocalSelectedBrands(prev => prev.filter(b => b !== brand));
  };
        const handleApplyClick = () => {
            setSelectedBrand(localSelectedBrands);
            remove(); // Hide the dropdown
            setsearchbrand("");
           
        };
        useEffect(() => {
            setLocalSelectedBrands(selectedbrand);
        }, [selectedbrand]);
        useEffect(() => {
          if (isVisible) {
              const brandsElement = brands.current;
              brandsElement.style.overflowY = 'auto'; // Enable scrolling if needed
          }
      }, [isVisible]);
    
      const changesearchbrand=(e)=>{
        
        setsearchbrand(e.target.value);

      }
      const filteredBrands = AllBrand.filter((b) =>
        b.brand.toLowerCase().includes(searchbrand.toLowerCase())
    );
  return (
    <div className='productssearch'>
        <div className="brand" ref={brandref}>
            <h4 onClick={handleclick}>Select a brand <IoIosArrowForward className={isVisible ?'arrow down':'arrow'} /></h4>
         
         
          <div className='brandList' ref={brandListref}>
            <input className='searchinputbrand' value={searchbrand} onChange={changesearchbrand} placeholder='Search brand...' type="text" />
              <div className="brands" ref={brands}>

          {filteredBrands.length >0 ? filteredBrands.map((b, i)=>(
            <div className="checkbox" key={i}>
            <input
               type="checkbox"
               id={b.brand}
               className='inputcheck'
                checked={localSelectedBrands.includes(b.brand)}
              onClick={()=>handleBrandClick(b.brand)}
               onChange={handleCheckboxChange}
               disabled={countProductsByBrandAndCategory(b.brand)===0 }
               />
              
            <label htmlFor={b.brand} disabled={countProductsByBrandAndCategory(b.brand)===0  } className='labelcheck' >{b.brand}({countProductsByBrandAndCategory(b.brand)})</label>
            </div>
           )): (<p className='noprod'>There is no brand with name "{searchbrand}" </p>) }
           
          
           
          </div>
          <button onClick={handleApplyClick} className='addproductbtn apply' type='button'>Apply</button>
          
           
          </div>
        </div>
      
    </div>
  )
}


export default BrandSearch



 //   const availableBrands = AllBrand.filter(brand =>
    //     countProductsByBrandAndCategory(brand.brand) > 0
    // );