import React, { useState } from 'react';

const SearchProducts: React.FC = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products?query=${query}`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
        setError(null);
      } else {
        setError(data.message || 'Hiba történt a keresés során.');
      }
    } catch (err) {
      setError('Nem sikerült csatlakozni a szerverhez.');
    }
  };

  return (
    <div>
      <h2>Termékek keresése</h2>
      <input
        type="text"
        placeholder="Keresési kifejezés"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Keresés</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price} Ft</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;
