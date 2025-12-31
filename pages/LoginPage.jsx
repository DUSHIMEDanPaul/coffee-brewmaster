
import React, { useState } from 'react';

const LoginPage = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password, role);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#8b5e3c] p-4 rounded-3xl mb-6 shadow-xl shadow-[#8b5e3c]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#3d2b1f] mb-2">Welcome Back</h1>
          <p className="text-gray-500">Log in to your BrewMaster account.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl mb-8 shadow-sm border border-gray-100">
          <button 
            onClick={() => setRole('buyer')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'buyer' ? 'bg-[#8b5e3c] text-white shadow-md' : 'text-gray-400'}`}
          >
            Buyer
          </button>
          <button 
            onClick={() => setRole('seller')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'seller' ? 'bg-[#3d2b1f] text-white shadow-md' : 'text-gray-400'}`}
          >
            Seller
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#3d2b1f] mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8b5e3c] transition-all outline-none"
                placeholder="hello@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3d2b1f] mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8b5e3c] transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              className={`w-full text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98] ${
                role === 'buyer' ? 'bg-[#8b5e3c] hover:bg-[#704a30]' : 'bg-[#3d2b1f] hover:bg-[#2a1e16]'
              }`}
            >
              Sign In as {role === 'buyer' ? 'Buyer' : 'Seller'}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-500">
          Don't have an account? {' '}
          <button onClick={onSwitchToSignup} className="font-bold text-[#8b5e3c] hover:underline">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
