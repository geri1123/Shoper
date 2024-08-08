// import React, { useContext } from 'react'
// import { ClothingCategories } from '../../Pages/AddProduct/Name'
// import { ShoperContext } from '../../Context/ShoperContext';
// import './DashboardTools.css'
// const DashboardPrice = () => {
    
//     const { allProducts } = useContext(ShoperContext);

//     const getTotalPriceForCategory = (categoryName) => {
//       const categoryProducts = allProducts.filter(product => product.category === categoryName);
//       return categoryProducts.reduce((acc, product) => {
//         const price = parseFloat(product.new_price);
//         if (!isNaN(price)) {
//           return acc + price;
//         }
//         return acc;
//       }, 0).toFixed(2);
//     };
  
//     const totalPrice = allProducts.reduce((acc, product) => {
     
//       const price = parseFloat(product.new_price);
     
//       if (!isNaN(price)) {
//         return acc + price;
//       }
//       return acc;
//     }, 0).toFixed(2);
   
  

    
//   return (
//     <div className='dashboardprice'>
// <h2>All Products Total Value:</h2>
//       <p>Total Price: ${totalPrice}</p>
      
       
   
      
//       {ClothingCategories.map(category => (
//         <div key={category.id}>
//           <h3>{category.name}</h3>
//           <p>Total Price: ${getTotalPriceForCategory(category.name)}</p>
//         </div>
//       ))}
      
//     </div>
//   )
// }

// export default DashboardPrice
import React, { useContext } from 'react';
import { ClothingCategories } from '../../Pages/AddProduct/Name';
import { ShoperContext } from '../../Context/ShoperContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './DashboardTools.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DashboardPrice = () => {
    const { allProducts } = useContext(ShoperContext);

    const getTotalPriceForCategory = (categoryName) => {
        const categoryProducts = allProducts.filter(product => product.category === categoryName);
        return categoryProducts.reduce((acc, product) => {
            const price = parseFloat(product.new_price);
            if (!isNaN(price)) {
                return acc + price;
            }
            return acc;
        }, 0).toFixed(2);
    };

    const totalPrice = allProducts.reduce((acc, product) => {
        const price = parseFloat(product.new_price);
        if (!isNaN(price)) {
            return acc + price;
        }
        return acc;
    }, 0).toFixed(2);

    // Prepare data for the pie chart
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#E57373', '#F06292', '#64B5F6', '#4DB6AC', '#81C784'];
    const categoryColors = ClothingCategories.map((cat, index) => ({
        name: cat.name,
        color: colors[index % colors.length],
        totalPrice: parseFloat(getTotalPriceForCategory(cat.name))
    }));

    const data = {
        labels: categoryColors.map(cat => cat.name),
        datasets: [
            {
                data: categoryColors.map(cat => cat.totalPrice),
                backgroundColor: categoryColors.map(cat => cat.color),
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className='dashboardprice'>
            <div className="gridtotalprod">
                <div className="countbycatTotal">
            <h2 className='DashboardH'>All  Value:</h2>
            <p> ${totalPrice}</p>
            </div>
            {categoryColors.map(category => (
                <div className="countbycat" key={category.id}>
                    <h2 className='DashboardH'>{category.name}</h2>
                    <p>${getTotalPriceForCategory(category.name)}</p>
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

export default DashboardPrice;