import React from 'react';
const CartPage: React.FC = () => {
    const [cart, setCart] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchCart = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('http://localhost:5000/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setCart(data);
        } catch (err) {
          console.error('Hiba történt a kosár lekérésekor:', err);
        }
      };
  
      fetchCart();
    }, []);
  
    return (
      <div>
        <h2>Kosár</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} db
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CartPage;
  