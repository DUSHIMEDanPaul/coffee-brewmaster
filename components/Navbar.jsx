
import React from 'react';
import '../types';

const Navbar = ({ user, onLogout, onNavigate }) => {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => onNavigate('shop')}
      >
        <div className="bg-[#8b5e3c] p-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-serif font-bold text-[#3d2b1f]">BrewMaster</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="hidden md:block text-right">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest leading-none mb-1">
                  {user.role === 'seller' ? 'Authorized Seller' : 'Elite Buyer'}
                </span>
                <p className="text-sm font-bold text-[#3d2b1f] leading-none">{user.displayName}</p>
              </div>
              <button 
                onClick={onLogout}
                className="text-[10px] text-red-500 hover:text-red-600 font-bold uppercase tracking-tighter mt-1"
              >
                Sign Out
              </button>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#3d2b1f] text-white flex items-center justify-center font-bold shadow-lg border-2 border-[#8b5e3c]/20">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="px-6 py-2 bg-[#3d2b1f] text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
          >
            Authenticate
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
