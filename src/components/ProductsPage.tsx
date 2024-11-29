import React, { useEffect, useState } from 'react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Hiba történt a termékek lekérésekor:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Termékek</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price} Ft</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
