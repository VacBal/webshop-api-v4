import React from 'react';
const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      address: '',
    });
  
    const handleRegister = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Sikeres regisztráció!');
        } else {
          alert(data.message || 'Hiba történt a regisztráció során.');
        }
      } catch (err) {
        alert('Nem sikerült csatlakozni a szerverhez.');
      }
    };
  
    return (
      <div>
        <h2>Regisztráció</h2>
        <input
          type="text"
          placeholder="Név"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cím"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <button onClick={handleRegister}>Regisztráció</button>
      </div>
    );
  };
  
  export default RegistrationPage;
  