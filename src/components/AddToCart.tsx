import React from 'react';
const AddToCart: React.FC<{ productId: string }> = ({ productId }) => {
    const handleAddToCart = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
  
        if (response.ok) {
          alert('Termék sikeresen a kosárhoz adva!');
        } else {
          const error = await response.json();
          alert(error.message || 'Hiba történt a termék hozzáadásakor.');
        }
      } catch (err) {
        alert('Nem sikerült csatlakozni a szerverhez.');
      }
    };
  
    return <button onClick={handleAddToCart}>Kosárba</button>;
  };
  
  export default AddToCart;
  