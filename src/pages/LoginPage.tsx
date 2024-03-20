import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Envie a requisição ao back-end
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login Success:', data);
        // Aqui você pode salvar o token de autenticação, se estiver usando um
        // navigate('/home'); // Redirecionar para a página inicial ou dashboard
      } else {
        // Trate o caso de login inválido
        console.error('Login Failed');
        // Você pode definir uma mensagem de estado para mostrar ao usuário aqui
      }
    } catch (error) {
      console.error('Error:', error);
      // Trate o erro de conexão ou outros erros
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="absolute top-5 left-5"> {/* Position the back button */}
          <button onClick={() => navigate(-1)} className="text-2xl">
            ← {/* Stylish left arrow as a back button */}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>

            <button onClick={() => navigate('/register')} className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
            
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
