import React from 'react';
const CancelOrderButton: React.FC<{ orderId: string }> = ({ orderId }) => {
    const handleCancelOrder = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bejelentkezés szükséges!');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          alert('Megrendelés sikeresen visszamondva!');
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Hiba történt a megrendelés visszamondása során.');
        }
      } catch (err) {
        alert('Nem sikerült csatlakozni a szerverhez.');
      }
    };
  
    return <button onClick={handleCancelOrder}>Megrendelés visszamondása</button>;
  };
  
  export default CancelOrderButton;
  