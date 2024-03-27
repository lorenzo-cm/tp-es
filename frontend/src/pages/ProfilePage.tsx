import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isLoggedIn, getUser } from '../utils/utils.ts';
import { User } from '../utils/model/user.ts';


import Sidebar from '../components/profilePage/Sidebar.tsx';
import {MainContent} from '../components/profilePage/MainContent.tsx';


const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User> ();

  const [currentSection, setCurrentSection] = useState<string>("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(); // Aguarda pela resolução da promise.
        setUser(userData); // userData agora é do tipo User, não Promise<User>.
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    isLoggedIn().then((loggedIn) => {
      if(loggedIn){
        fetchUser()
      } else{
        navigate('/login')
      }
    })
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sidebar w-64 h-full bg-gray-800 text-white fixed inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <Sidebar changeSection={setCurrentSection}/>
      </div>
      <main className="flex-grow overflow-auto">
        <div>
          {user ? (
            <div className="p-4">
              <h1 className="font-bold text-xl mb-2">User Profile</h1>
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Profissão:</strong> {user.role}</p>
            </div>
          ) : (
            <p className="p-4">Loading user data...</p>
          )}
        </div>
      </main>
    </div>
  );

};

export default ProfilePage;