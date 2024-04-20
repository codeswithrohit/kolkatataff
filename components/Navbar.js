import React from 'react';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
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
