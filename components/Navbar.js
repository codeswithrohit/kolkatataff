import Link from 'next/link';
import React from 'react';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div>
    <div className="bg-[#12242e] text-white flex justify-center items-center h-28 shadow-md">
      <div className="px-4 mx-auto sm:max-w-4xl md:max-w-6xl lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex-col items-center justify-between w-full">
          <a href="/" className="flex items-center justify-center">
            <img src='logo.png' className='h-32 w-32 object-contain' alt="Logo" />
          </a>
          
          {/* <div className="flex py-4 items-center space-x-4">
            <NavItem label="Home" icon={<FaHome size={20} />} link="/" />
            <NavItem label="Login" icon={<FaSignInAlt size={20} />} link="/login" />
            <NavItem label="Register" icon={<FaUserPlus size={20} />} link="/register" />
          </div> */}
        </div>
      </div>
    </div>
    <div class="flex bg-white items-center justify-center overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
    <button class="inline-flex items-center h-10 px-2 py-2 -mb-px text-center hover:text-red-400 text-black bg-transparent border-b-2 border-black sm:px-4 -px-1 dark:border-black dark:text-black whitespace-nowrap focus:outline-none">
       <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>

        <span class="mx-1 text-sm sm:text-base">
            APP
        </span>
    </button>
    <Link href='/fullchart' >
    <button class="inline-flex items-center h-10 px-2 py-2 -mb-px text-center hover:text-red-400 text-black bg-transparent border-b-2 border-black sm:px-4 -px-1 dark:border-black dark:text-black whitespace-nowrap focus:outline-none">
        
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>


        <span class="mx-1 text-sm sm:text-base">
            OLD RESULT
        </span>
    </button>
    </Link>
    <Link href='/pattilist' >
    <button class="inline-flex items-center h-10 px-2 py-2 -mb-px text-center hover:text-red-400 text-black bg-transparent border-b-2 border-black sm:px-4 -px-1 dark:border-black dark:text-black whitespace-nowrap focus:outline-none">
    
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>

        <span class="mx-1 text-sm sm:text-base">
          PATTI LIST
        </span>
       
    </button>
    </Link>
</div>
    </div>
  );
};

const NavItem = ({ label, icon, link }) => {
  return (
    <a
      href={link}
      className="flex items-center justify-center text-center text-white border border-gray-500 hover:border-red-300 rounded-md px-3 py-2"
    >
      {React.cloneElement(icon, {
        color: '#FFF',
      })}
      <span className="text-xs ml-1">{label}</span>
    </a>
  );
};

export default Navbar;
