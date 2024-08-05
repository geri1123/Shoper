import React, { useContext, useState } from 'react'
import './Home.css'
import { ClothingCategories } from './AddProduct/Name'
import  { ShoperContext } from '../Context/ShoperContext'
import Items from '../Components/Items/Items'
import BrandSearch from './HomeTools/BrandSearch'
import { TiDeleteOutline } from 'react-icons/ti'
import ReactPaginate from "react-paginate";
import {useLocation , useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
  const {allProducts}=useContext(ShoperContext);
  const [searchCategory , setSearchCategory]=useState('');
 
  const allproductlength=allProducts.length;
  const [selectedbrand, setSelectedBrand] = useState([]);
const [searchproductName  , setSearchProductName]=useState('');


  //Count all products with the same  category 
  const countByCategory = (categoryName) => {
    return allProducts.filter((product) => product.category === categoryName).length;
  };
  






   const filterCategory=()=>{
   
     if(searchCategory){
      return   allProducts.filter((product)=>product.category===searchCategory);
     }
   
     return allProducts;
   }
   const filterByBrands = (products) => {
     if (selectedbrand.length === 0) return products;
     return products.filter((product) => selectedbrand.includes(product.brand));
 };
//  const filterproductbyname=(products)=>{
//   if(searchproductName.length===0) return products;
//   return products.filter((product)=>searchproductName.includes(product.productName));
//  };
 const filterproductbyname = (products) => {
  if (searchproductName.length === 0) return products;
  const lowerCaseSearchProductName = searchproductName.toLowerCase();
  return products.filter((product) =>
    product.productName.toLowerCase().includes(lowerCaseSearchProductName)
  );
};

   const filteredCategory=filterCategory();
   const filteredBrand = filterByBrands(filteredCategory);
 const filteredProducts=filterproductbyname(filteredBrand);


const handleRemoveBrand = (brandToRemove) => {
  setSelectedBrand(prevSelectedBrands =>
    prevSelectedBrands.filter(brand => brand !== brandToRemove)
  );
};
const countProductsByBrandAndCategory = (brand) => {
  
  return filteredCategory.filter((prod) => prod.brand === brand).length;
};
const handleCategoryChange = (categoryName) => {
  setSearchCategory(categoryName);
  setSelectedBrand([]); // Clear selected brands when category changes
  setSearchProductName('');
};
const handleRemoveprodname=()=>{
  setSearchProductName('');
}
const clearSearchProductName = () => {
  setSearchProductName('');
};



////pagination

const navigate=useNavigate();
const location=useLocation();
// Read the current page number from the URL

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage =10; // Number of movies per page
const query = new URLSearchParams(location.search);
const currentPageFromUrl = parseInt(query.get('page') || '1', 10);
useEffect(() => {
  // Reset to page 1 when filters change
  setCurrentPage(1);
  
  navigate(`/?page=1`);
}, [searchCategory, selectedbrand, searchproductName]);




// Calculate total number of pages
const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

// Calculate the index of the first and last movie to display
const startIndex = (currentPage - 1)* itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

// Slice the movies array to get movies for the current page
const currentProduct = filteredProducts.slice(startIndex, endIndex);
//router

// Handle page change




const handlePageChange = ({ selected }) => {
  const newPage = selected +1;
    setCurrentPage(newPage);
  
 navigate(`/?page=${newPage}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


////end pagination
  return (
    <div className='Home'>
      <div className="menuhome">
        <div className="categoryhome">
        <h2 className='h2home'>Category</h2>
    <ul className='ulAllproducthome'>
      <li className={searchCategory==='' ?'click':'liallproducthome'}  onClick={()=>{  handleCategoryChange('');}}>All <span className='count'>({allproductlength})</span></li>
      {
       ClothingCategories.map((clothing)=>(
        
        <li 
        className={countByCategory(clothing.name) === 0 ? 'liallproducthome disabled' : searchCategory !== clothing.name ? 'liallproducthome' : 'click' }
         key={clothing.id}
         onClick={()=>handleCategoryChange(clothing.name)}
          
         >
          { clothing.name }<span className='count'>({countByCategory(clothing.name)})</span>

          
          </li>
       ))
      }
    </ul>
   
</div>
<div className="brandhome">
  <h2 className='h2home'>Brand</h2>

<BrandSearch clearSearchProductName={clearSearchProductName} selectedbrand={selectedbrand} setSearchProductName={setSearchProductName} setSelectedBrand={setSelectedBrand}  countProductsByBrandAndCategory={countProductsByBrandAndCategory}  />
 </div>
 <div className="brandhome">

  <h2 className='h2home'>ProductName</h2>

  <input type="text" value={searchproductName} onChange={(e)=>setSearchProductName(e.target.value)} className='serachproductName' placeholder='Search productName .....' />
  <TiDeleteOutline onClick={handleRemoveprodname} className={searchproductName.length > 0 ? 'Tideleteautline active' : 'Tideleteautline inactive'}/>
 </div>

</div>

<div className="bodyhome">
  <div className="searchedproducts">
  <p className='phome'>List product by category: <span className='searchspan'>{searchCategory==="" ? 'All': searchCategory}</span></p>
 {selectedbrand.map((sel , i)=>(
  <h5 className='hhome' key={i}>{sel}<TiDeleteOutline onClick={()=>handleRemoveBrand(sel)} className='tdelete'/></h5>
 ))}
{ searchproductName && <h5 className="hhome">{searchproductName}<TiDeleteOutline onClick={handleRemoveprodname}  className='tdelete'/>  </h5>}
  </div>
  <div className="productlisthome">
  {currentProduct.length > 0 ? currentProduct.map((product, i) => (
            <Items
              key={i}
              id={product.id}
              brand={product.brand}
              collection={product.collection}
              name={product.name}
              img_url_1={product.img_url_1}
              img_url_2={product.img_url_2}
              old_price={product.old_price}
              new_price={product.new_price}
            />
          )): (<p>No product</p>)}
  </div>
</div>
 {/* Pagination */}
 {filteredProducts.length>itemsPerPage &&(
      <ReactPaginate
      
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"

       
        disableInitialCallback // Disable initial pagination callback
      />
)}
      {/* Manually trigger pagination change */}
    </div>
  )
}

export default Home
//   const filterCategory=()=>{
   
//     if(searchCategory){
//      return   allProducts.filter((product)=>product.category===searchCategory);
//     }
   
//     return allProducts;
//   }
//   const filterByBrands = (products) => {
//     if (selectedbrand.length === 0) return products;
//     return products.filter((product) => selectedbrand.includes(product.brand));
// };
//   const filteredCategory=filterCategory();
//   const filteredProducts = filterByBrands(filteredCategory);

// const filter=()=>{
//   let filteredprod=allProducts;
//   if(searchCategory){
//     filteredprod=filteredprod.filter((prod)=>prod.category===searchCategory);
//   }
//   if (selectedbrand.length > 0) {
//     filteredprod = filteredprod.filter((prod) => selectedbrand.includes(prod.brand));
//   }
 
//   return filteredprod;
// }

// const filteredprod=filter();