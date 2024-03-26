// src/components/Sidebar.tsx
import React from 'react';
import FooterSidebar from './FooterSidebar';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <ul className="space-y-2">
          <li>
            <button onClick={() => console.log('Configurações')}>Configurações</button>
          </li>
          <li>
            <button onClick={() => console.log('XXX')}>XXX</button>
          </li>
        </ul>
        <FooterSidebar />
      </div>
    </aside>
  );
};

export default Sidebar;
