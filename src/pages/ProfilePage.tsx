// src/pages/ProfilePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import { isLoggedIn } from '../utils/utils.ts'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if(loggedIn){
        navigate('/profile')
      } else{
        navigate('/login')
      }
    })
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