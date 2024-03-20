// src/components/TopBar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/logo.svg'; // Adjust the path according to your project structure

const TopBar: React.FC = () => {
  const isLoggedIn = false; // Placeholder for authentication state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page on button click
  };

  return (
    <div className="flex justify-center items-center p-4 shadow-md bg-blue-950">
      <img src={logo} alt="Logo" className="h-8" />
      {!isLoggedIn && (
        <button
          onClick={handleLoginClick} // Attach click handler
          className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      )}
    </div>
  );
};

export default TopBar;
