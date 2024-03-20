// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você faria o logout do usuário
    console.log('Usuário deslogado');
    navigate('/login');
  };

  return (
    <div className="absolute bottom-0 w-full">
      <button onClick={handleLogout}>Logout</button>
      <div>
        <img src="../assets/logo.svg" alt="Logo" className="h-8" />
        <a href="https://github.com/usuario" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  );
};

export default FooterSidebar;
