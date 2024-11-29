import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bejelentkezés szükséges!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hiba történt a megrendelés részleteinek lekérésekor.');
      }
    } catch (err) {
      setError('Nem sikerült csatlakozni a szerverhez.');
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>Betöltés...</p>;

  return (
    <div>
      <h2>Megrendelés részletei</h2>
      <p><strong>Azonosító:</strong> {order.id}</p>
      <p><strong>Összeg:</strong> {order.total} Ft</p>
      <h3>Termékek:</h3>
      <ul>
        {order.items.map((item: any) => (
          <li key={item.productId}>
            <p><strong>Termék:</strong> {item.productName}</p>
            <p><strong>Mennyiség:</strong> {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
