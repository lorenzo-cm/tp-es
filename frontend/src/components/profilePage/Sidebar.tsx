import React from 'react';
import FooterSidebar from './FooterSidebar';
import SidebarButton from './SidebarButton';


import UserIcon from '../../../assets/user.svg';
import UploadIcon from '../../../assets/upload.svg';

interface SidebarProps {
  changeSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ changeSection }) => {
  return (
    <aside className="w-64 h-full" aria-label="Sidebar">
      <div className="flex flex-col h-full overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        
        {/* Main content area - allow it to grow and fill available space */}
        <div className="flex-1">
          <div className='font-bold text-xl mb-5 mx-2'>
            Alia chat 
          </div>

          <div className="flex flex-col space-y-2">
            <SidebarButton 
              icon={UserIcon} 
              label="Configurações" 
              changeSection={() => changeSection('user')} 
            />
            <SidebarButton 
              icon={UploadIcon} 
              label="Upload PDF" 
              changeSection={() => changeSection('upload')} 
            />
            {/* More buttons as needed */}
          </div>
        </div>
        
        {/* Footer - It will not grow but stay at the bottom */}
        <div>
          <FooterSidebar />
        </div>

      </div>
    </aside>
  );
};


export default Sidebar;
