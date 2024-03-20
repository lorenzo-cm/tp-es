// src/pages/ProfilePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = checkIfUserIsLoggedIn(); // Substitua pela sua lógica de autenticação
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow">
        {/* Conteúdo principal da página */}
      </main>
    </div>
  );
};

export default ProfilePage;

function checkIfUserIsLoggedIn(): boolean {
  // Substitua isso pela sua lógica de verificação de autenticação real
  // Por exemplo, verificar um token de autenticação no localStorage
  return !!localStorage.getItem('authToken');
}