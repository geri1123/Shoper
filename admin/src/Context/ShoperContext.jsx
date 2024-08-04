import React, { createContext, useEffect, useState } from "react";
export const ShoperContext = createContext(null);

const ShoperContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [AllBrand , setAllBrand]=useState([]);
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/allproducts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
 const fetchBrand=async ()=>{
   try { 
    const res=await fetch('http://localhost:5000/allbrands');
    if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`)
    }
     const data =await res.json();
     setAllBrand(data);

} catch(error){
        console.log('error fetching brand' , error)
    } 
    
 }
  useEffect(() => {
    fetchProduct();
    fetchBrand();
  }, []);

  const contextValue = { allProducts, loading, error , AllBrand };

  return (
    <ShoperContext.Provider value={contextValue}>
      {props.children}
    </ShoperContext.Provider>
  );
};

export default ShoperContextProvider;