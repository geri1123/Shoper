import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

import { ClothingCategories , Colors  , Collection} from './Name';
import AddedProd from './AddedProd';
const AddProduct = () => {
  
 
  
  const [productData, setProductData] = useState({
    brand: '',
    gender: '',
    category:'',
   name: '',
   material:'',
   type:'',
   color:'',
   collections:'',
   size:[],
   old_price:'',
   new_price:'',
   description:'',
   img_url_1: '',
   img_url_2: '',
   img_url_3: ''
  });
  const [allBrands, setAllBrands] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSize , setSelectedSize]=useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1); 
  const [images, setImages] = useState({ img_url_1: null, img_url_2: null, img_url_3: null });
 const [filtermaterial , setFilterMaterial]=useState([]);
  const [errors, setErrors] = useState({
    gender: '',
    brand: '',
    category: '',
    name: '',
   material:'',
    color: '',
    collections: '',
    size: '',
    old_price: '',
    new_price: '',
    description: '',
    img_url_1: '',
    img_url_2: '',
    img_url_3: ''
  });
 
 
  const fetchBrand = async () => {
    try {
      const response = await fetch('http://localhost:5000/allbrands');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setAllBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrand();
    
  }, []);

 
  const addSize = () => {
    if (selectedSize && selectedQuantity > 0) {
      // Check if the size already exists
      const existingSize = productData.size.find(item => item.size === selectedSize);
      if (existingSize) {
        // Update quantity if size already exists
        setProductData(prevData => ({
          ...prevData,
          size: prevData.size.map(item =>
            item.size === selectedSize ? { ...item, quantity: selectedQuantity } : item
          ),
        }));
      } else {
        // Add new size
        setProductData(prevData => ({
          ...prevData,
          size: [...prevData.size, { size: selectedSize, quantity: selectedQuantity }],
        }));
      }
      setSelectedSize('');
      setSelectedQuantity(1);  // Reset to default quantity
    }
  };

  
  const removeSize = (index) => {
    setProductData(prevData => ({
      ...prevData,
      size: prevData.size.filter((_, i) => i !== index),
    }));
  };


  useEffect(() => {
    if (productData.category) {
      const category = ClothingCategories.find(cat => cat.name === productData.category);
      if (category) {
        setFilteredItems(category.items);
        setFilterMaterial(category.material);
        // Reset the selected name when category changes
        setProductData(prevData => ({ ...prevData, name: '', material:'' }));
      } else {
        setFilteredItems([]);
        setFilterMaterial([]);
        setProductData(prevData => ({ ...prevData, name: '' , material:'' }));
      }
    } else {
      setFilteredItems([]);
      setProductData(prevData => ({ ...prevData, name: '' , material:''}));
    }
  }, [productData.category]);
  useEffect(() => {
    if (productData.name) {
      const selectedItem = filteredItems.find(item => item.name === productData.name);
      if (selectedItem) {
        setTypeOptions(selectedItem.options);
        setSizeOptions(selectedItem.size || []);
        setProductData(prevData => ({ ...prevData, type: '', size: [] }));
      } else {
        setTypeOptions([]);
        setSizeOptions([]);
        setProductData(prevData => ({ ...prevData, type: '', size: [] }));
      }
    } else {
      setTypeOptions([]);
      setSizeOptions([]);
    }
  }, [productData.name, filteredItems]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('posterUrl', files[0]);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setProductData(prevData => ({
              ...prevData,
              [name]: data.image_url
            }));
            setImages(prevImages => ({
              ...prevImages,
              [name]: files[0]
            }));
          } else {
            console.error('Image upload failed');
          }
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  };

  // const handlesubmit=()=>{
  
  // console.log(productData);

 
  // } 
  const validateFields = () => {
    const newErrors = {
      gender: '',
      brand: '',
      category: '',
      name: '',
      material:'',
      color: '',
      collections: '',
      size: '',
      old_price: '',
      new_price: '',
      description: '',
      img_url_1: '',
      img_url_2: '',
      img_url_3: ''
    };

    let isValid = true;

    if (!productData.gender) {
      isValid = false;
      newErrors.gender = 'Gender is required.';
    }
    if (!productData.brand) {
      isValid = false;
      newErrors.brand = 'Brand is required.';
    }
    if (!productData.category) {
      isValid = false;
      newErrors.category = 'Category is required.';
    }
    if (!productData.name) {
      isValid = false;
      newErrors.name = 'Name is required.';
    }
    if (!productData.material) {
      isValid = false;
      newErrors.material = 'Material is required.';
    }
   
    if (!productData.color) {
      isValid = false;
      newErrors.color = 'Color is required.';
    }
    if (!productData.collections) {
      isValid = false;
      newErrors.collections = 'Collection is required.';
    }
    if (productData.size.length === 0) {
      isValid = false;
      newErrors.size = 'At least one size with quantity is required.';
    }
    if (productData.old_price <= 0) {
      isValid = false;
      newErrors.old_price = 'Old price must be greater than zero.';
    }
    if (productData.new_price <= 0) {
      isValid = false;
      newErrors.new_price = 'New price must be greater than zero.';
    }
    if (!productData.description) {
      isValid = false;
      newErrors.description = 'Description is required.';
    }
    if (!productData.img_url_1) {
      isValid = false;
      newErrors.img_url_1 = 'Image 1 is required.';
    }
    if (!productData.img_url_2) {
      isValid = false;
      newErrors.img_url_2 = 'Image 2 is required.';
    }
    if (!productData.img_url_3) {
      isValid = false;
      newErrors.img_url_3 = 'Image 3 is required.';
    }

    setErrors(newErrors);
    return isValid;
  };
const handlesubmit = async () => {
  if (!validateFields()) return;
    setErrorMessage('');

  
  try {
      const response = await fetch('http://localhost:5000/addproduct', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              gender: productData.gender,
              brand: productData.brand,
              category: productData.category,
              name: productData.name,
              type: productData.type,
              color: productData.color,
              collections: productData.collections,
              material:productData.material,
              size: productData.size,
              old_price: productData.old_price,
              new_price: productData.new_price,
              description: productData.description,
              img_url_1: productData.img_url_1,
              img_url_2: productData.img_url_2,
              img_url_3: productData.img_url_3
          })
      });

      const data = await response.json();
      if (data.success) {
          console.log('Product added successfully:', data.product);
          alert('product added successfully');
           setProductData({
        brand: '',
        gender: '',
        category: '',
        name: '',
        material:'',
        type: '',
        color: '',
        collections: '',
        size: [],
        old_price: '',
        new_price: '',
        description: '',
        img_url_1: '',
        img_url_2: '',
        img_url_3: '',
      });
      setImages({ img_url_1: null, img_url_2: null, img_url_3: null });
      setSelectedSize('');
      setSelectedQuantity(1);
      setFilteredItems([]);
      setTypeOptions([]);
      setSizeOptions([]);
      window.location.reload();
      } else {
          console.error('Failed to add product:', data.error);
          setErrorMessage('Failed to add product.');
      }
  } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit form.');
  }
};

  return (
     <div className="products">

  
    <div className='addproduct'>
      <h2>Add Product</h2>
      <div className="addproduct-itemfield">
        <h3 >Gender</h3>
        <label>
          <input
            type="radio"
            name="gender"
            value="Men"
            checked={productData.gender === 'Men'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Women"
            checked={productData.gender === 'Women'}
            onChange={handleChange}
          />
          Female
        </label>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3 >Brand</h3>
        <div className="addproduct-brand">
          <select
            value={productData.brand}
            onChange={handleChange}
            name="brand"
           
          >
            <option value="" disabled>Select a brand</option>
            {allBrands.map((brand) => (
              <option key={brand.id} value={brand.brand}>{brand.brand}</option>
            ))}
          </select>
          
        </div>
        {errors.brand && <p className="error-message">{errors.brand}</p>}
      </div>

      <div className="addproduct-itemfield">
        <h3>Category</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.category}
      onChange={handleChange}
       name="category"
      >
        <option value="" disabled>Select a Category</option>
        {ClothingCategories.map((category)=>(
          <option key={category.id} value={category.name}>{category.name}</option>

        ))}
       
      
       

       

      </select>
    
       
     </div>
     {errors.category && <p className="error-message">{errors.category}</p>}
      </div>

      <div className="addproduct-itemfield">
        <h3>Name</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.name}
      onChange={handleChange}
       name="name"
       disabled={filteredItems.length===0}
      >
        <option value="" disabled>Select a Name</option>
       {filteredItems.map((item)=>(
        <option key={item.id} value={item.name}>{item.name}</option>
       ))}

      </select>
    
       
     </div>

     {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Material</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.material}
      onChange={handleChange}
       name="material"
       disabled={filtermaterial.length === 0}
      >
        <option value="" disabled>Select a Material</option>
       {filtermaterial.map((it ,i)=>(
        <option key={i} value={it}>{it}</option>
       ))}

      </select>
    
       
     </div>
     
     {errors.material && <p className="error-message">{errors.material}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Type</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.type}
      onChange={handleChange}
       name="type"
       disabled={typeOptions.length===0}
      >
        <option value="" disabled>Select a Type</option>
       {typeOptions.map((option , index)=>(
        <option key={index} value={option}>{option}</option>
       ))}

      </select>
    
       
     </div>
     
      </div>
      <div className="addproduct-itemfield">
        <h3>Color</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.color}
      onChange={handleChange}
       name="color"
      >
        <option value="" disabled>Select a Color</option>
       {Colors.map(( col)=>(
        <option key={col.id} value={col.name}>{col.name}</option>
       ))}

      </select>
    
       
     </div>
     {errors.color && <p className="error-message">{errors.color}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Collection</h3>
     <div className="addproduct-brand">
      <select  
      
      value={productData.collections}
      onChange={handleChange}
       name="collections"
      >
        <option value="" disabled>Select a Collection</option>
       {Collection.map(( coll)=>(
        <option key={coll.id} value={coll.name}>{coll.name}</option>
       ))}

      </select>
    
       
     </div>
     {errors.collections && <p className="error-message">{errors.collections}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Size</h3>
     <div className="addproduct-brand">
      <select  
      
     
      value={selectedSize}
      onChange={(e)=>setSelectedSize(e.target.value)}
      >
        <option value="" disabled>Select a Size</option>
       {sizeOptions.map((size , index)=>(
        <option key={index} value={size}>{size}</option>
       ))}

      </select>
      <input className='inputfield'
            type="number"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            min="1"  // Minimum quantity can be 1
            placeholder="Quantity"
          />
    
       <button type='button' onClick={addSize}>Add size</button>
     </div>
     <ul>
          {Array.isArray(productData.size) && productData.size.map((siz, index) => (
            <li key={index}>
              {siz.size} (Quantity: {siz.quantity})<button type='button' onClick={() => removeSize(index)}>Remove</button>
            </li>
          ))}
        </ul>
        {errors.size && <p className="error-message">{errors.size}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Old-Price</h3>
        <input className='inputfield' type="number" value={productData.old_price} name="old_price" onChange={handleChange}/>

        {errors.old_price && <p className="error-message">{errors.old_price}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>New-Price</h3>
        <input className='inputfield' type="number" value={productData.new_price} name="new_price" onChange={handleChange}/>
        
        {errors.new_price && <p className="error-message">{errors.new_price}</p>}
      </div>
      <div className="addproduct-itemfield">
        <h3>Description</h3>
       <textarea name="description" value={productData.description} onChange={handleChange} >

       </textarea>
        
       {errors.description && <p className="error-message">{errors.description}</p>}
      </div>
  <div className="images">

      <div className="addproduct-itemfield">
       
     <h3>Image 1</h3>
     <label htmlFor="file-input">

      <img src={productData.img_url_1 ? productData.img_url_1 :upload_area} alt="" />

     </label>
     <input onChange={handleImageChange} name='img_url_1'  id='file-input'  type="file" hidden />
     {errors.img_url_1 && <p className="error-message">{errors.img_url_1}</p>}
      </div>
      <div className="addproduct-itemfield">
       
       <h3>Image 2</h3>
       <label htmlFor="file-input-1">
  
       <img src={productData.img_url_2 ? productData.img_url_2 :upload_area} alt="" />
  
       </label>
       <input onChange={handleImageChange} name='img_url_2'  id='file-input-1'  type="file" hidden />
       {errors.img_url_2 && <p className="error-message">{errors.img_url_2}</p>}
        </div>
        <div className="addproduct-itemfield">
       
       <h3>Image 3</h3>
       <label htmlFor="file-input-2">
  
       <img src={productData.img_url_3 ? productData.img_url_3 :upload_area} alt="" />
  
       </label>
       <input onChange={handleImageChange} name='img_url_3'  id='file-input-2'  type="file" hidden />
       {errors.img_url_3 && <p className="error-message">{errors.img_url_3}</p>}
        </div>

        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type='button' onClick={handlesubmit}>Submit</button>
    </div>


   <div className="addedprod">
    <AddedProd/>
   </div>
    
    </div>
  );
};

export default AddProduct;


 {/* <h3>Image 1</h3> */}
        {/* <input type="file" name="img_url_1" onChange={handleImageChange} />
        {productData.img_url_1 && <img src={productData.img_url_1}  alt="Product" />}
      </div>
      <div className="addproduct-itemfield">
        <h3>Image 2</h3>
        <input type="file" name="img_url_2" onChange={handleImageChange} />
        {productData.img_url_2 && <img src={productData.img_url_2}  alt="Product"  />}
      </div>
      <div className="addproduct-itemfield">
        <h3>Image 3</h3>
        <input type="file" name="img_url_3" onChange={handleImageChange}  />
        {productData.img_url_3 && <img src={productData.img_url_3} alt="Product" />} */}