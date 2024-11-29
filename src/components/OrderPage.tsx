import React, { useEffect, useState } from 'react';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bejelentkezés szükséges!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hiba történt a megrendelések lekérésekor.');
      }
    } catch (err) {
      setError('Nem sikerült csatlakozni a szerverhez.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Megrendeléseim</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p><strong>Megrendelés azonosító:</strong> {order.id}</p>
            <p><strong>Termékek száma:</strong> {order.items.length}</p>
            <p><strong>Összeg:</strong> {order.total} Ft</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
