import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { AlignJustify } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import type { RootState } from '@/app/stote';

const SiteHeader: React.FC<{ showtoggle?: boolean }> = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-white shadow-md sticky top-0 w-full z-50 border-b-4 border-red-600 h-12 sm:h-16 md:h-[80px] px-2 sm:px-4">
      <div className="flex items-center justify-between h-full p-1 sm:p-2">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="md:hidden">
            <AlignJustify className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer rounded-md transition-all" onClick={toggleSidebar} />
          </div>
          {/* <img src={logo} alt="Company Logo" className="hidden md:block object-contain h-8 sm:h-10 md:h-12 w-auto" /> */}
          <Link to="#" className="hidden sm:flex flex-col text-primary">
            <span className="text-xs sm:text-sm md:text-md lg:text-lg font-semibold">Dedicated Freight Corridor Corporation of India Limited</span>
            <span className="text-xs sm:text-sm md:text-md text-gray-600">A Govt. of India (Ministry of Railways) Enterprise</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user && user?.name && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:block text-gray-800 text-sm md:text-md lg:text-lg font-semibold">{user.name}</div>
              <div className="hidden md:block">
                {/* <LogoutButton /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
