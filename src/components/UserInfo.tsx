// src/components/UserInfo.tsx
import React from 'react';

const UserInfo: React.FC = () => {
  // Dados do usuário fictícios para exemplificar
  const userInfo = {
    username: 'usuario123',
    name: 'Nome do Usuário',
    email: 'usuario@example.com'
  };

  return (
    <div>
      <div>{userInfo.username}</div>
      <div>{userInfo.name}</div>
      <div>{userInfo.email}</div>
    </div>
  );
};

export default UserInfo;
