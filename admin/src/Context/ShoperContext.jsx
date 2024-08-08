import React, { createContext, useEffect, useState } from "react";
export const ShoperContext = createContext(null);

const ShoperContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [menProducts, setmenAllProducts] = useState([]);
  const [womenProducts, setwomenAllProducts] = useState([]);
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


 const fetchemenProduct = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/men');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setmenAllProducts(data);
  } catch (error) {
    setError(error.message);
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
const fetchewomenProduct = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/women');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setwomenAllProducts(data);
  } catch (error) {
    setError(error.message);
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchProduct();
    fetchBrand();
    fetchemenProduct();
    fetchewomenProduct();
  }, []);

  const contextValue = { allProducts, loading, error , AllBrand , menProducts , womenProducts };

  return (
    <ShoperContext.Provider value={contextValue}>
      {props.children}
    </ShoperContext.Provider>
  );
};

export default ShoperContextProvider;