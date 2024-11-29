import React, { useState } from 'react';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bejelentkezés szükséges!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('Jelszó sikeresen módosítva!');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hiba történt a jelszó módosítása során.');
        setMessage('');
      }
    } catch (err) {
      setError('Nem sikerült csatlakozni a szerverhez.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Jelszó módosítása</h2>
      <input
        type="password"
        placeholder="Jelenlegi jelszó"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Új jelszó"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Módosítás</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChangePassword;
