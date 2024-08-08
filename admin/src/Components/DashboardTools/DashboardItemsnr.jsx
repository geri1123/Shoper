


import React, { useContext } from 'react';
import { ShoperContext } from '../../Context/ShoperContext';
import { ClothingCategories } from '../../Pages/AddProduct/Name';
import './DashboardTools.css'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DashboardItemsnr = () => {
  const { allProducts } = useContext(ShoperContext);
  const totalProducts = allProducts.length;

  // Function to get count of products by category
  const countByCategory = (catName) => {
    return allProducts.filter((product) => product.category === catName).length;
  };
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#E57373', '#F06292', '#64B5F6', '#4DB6AC', '#81C784'];
  const categoryColors = ClothingCategories.map((cat, index) => ({
    name: cat.name,
    color: colors[index % colors.length]
  }));
   
  
  const data = {
    labels: categoryColors.map((cat) => cat.name),
    datasets: [
      {
        data: categoryColors.map((cat) => countByCategory(cat.name)),
        backgroundColor: categoryColors.map((cat) => cat.color),
        hoverOffset: 4
      }
    ]
  };
  return (
    
    <div className='Dashboarditemsnr'>
    
    
     
        <div className="gridtotalprod">
            <div className="countbycatTotal">
      <h2 className='DashboardH'>Total Products</h2>
      <p>{totalProducts}</p>
      </div>
      {categoryColors.map((cat, i) => (
        <div className="countbycat" key={i} style={{ backgroundColor: cat.color , padding:'5px' }}>
          <h2 className='DashboardH'>{cat.name}</h2>
          <p>{countByCategory(cat.name)}</p>
        </div>
      ))}
      </div>
      <div className='pie-container'>
        <div className='pie'>
          <Pie data={data} />
        </div>
      </div>
      
    </div>
  );
};
export default DashboardItemsnr


