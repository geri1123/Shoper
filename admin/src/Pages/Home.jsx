import React, { useContext, useState } from 'react'
import './Home.css'
import { ClothingCategories } from './AddProduct/Name'
import  { ShoperContext } from '../Context/ShoperContext'
import Items from '../Components/Items/Items'
import BrandSearch from './HomeTools/BrandSearch'
import { TiDeleteOutline } from 'react-icons/ti'
import NameSearch from './HomeTools/NameSearch'
const Home = () => {
  const {allProducts}=useContext(ShoperContext);
  const [searchCategory , setSearchCategory]=useState('');
  const allproductlength=allProducts.length;
  const [selectedbrand, setSelectedBrand] = useState([]);
  const countByCategory = (categoryName) => {
    return allProducts.filter((product) => product.category === categoryName).length;
  };

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
const filter=()=>{
  let filteredprod=allProducts;
  if(searchCategory){
    filteredprod=filteredprod.filter((prod)=>prod.category===searchCategory);
  }
  if (selectedbrand.length > 0) {
    filteredprod = filteredprod.filter((prod) => selectedbrand.includes(prod.brand));
  }
  
  return filteredprod;
}

const filteredprod=filter();
const handleRemoveBrand = (brandToRemove) => {
  setSelectedBrand(prevSelectedBrands =>
    prevSelectedBrands.filter(brand => brand !== brandToRemove)
  );
};
const countProductsByBrandAndCategory = (brand) => {
  
  return filteredprod.filter((prod) => prod.brand === brand).length;
};
const handleCategoryChange = (categoryName) => {
  setSearchCategory(categoryName);
  setSelectedBrand([]); // Clear selected brands when category changes
};
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

<BrandSearch selectedbrand={selectedbrand} setSelectedBrand={setSelectedBrand}  countProductsByBrandAndCategory={countProductsByBrandAndCategory}  />
 </div>
 <div className="brandhome">
  <h2 className='h2home'>Name</h2>

<NameSearch searchCategory={searchCategory} />
 </div>

</div>
<div className="bodyhome">
  <div className="searchedproducts">
  <p className='phome'>List product by category: <span className='searchspan'>{searchCategory==="" ? 'All': searchCategory}</span></p>
 {selectedbrand.map((sel , i)=>(
  <h5 className='hhome' key={i}>{sel}<TiDeleteOutline onClick={()=>handleRemoveBrand(sel)} className='tdelete'/></h5>
 ))}
  </div>
  <div className="productlisthome">
  {filteredprod.length > 0 ? filteredprod.map((product, i) => (
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
    </div>
  )
}

export default Home
