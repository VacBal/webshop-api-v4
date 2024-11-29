import React, { useState, useEffect } from 'react';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
  
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Hiba történt a termékek lekérésekor:', err);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return (
      <div>
        <h2>Termékek</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} Ft
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductList;
  