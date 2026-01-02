
import React, { useState } from 'react';

const SignupPage = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      onSignup(name, email, password, role);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#8b5e3c] p-4 rounded-3xl mb-6 shadow-xl shadow-[#8b5e3c]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#3d2b1f] mb-2">Join BrewMaster</h1>
          <p className="text-gray-500">Choose your role and start your journey.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl mb-8 shadow-sm border border-gray-100">
          <button 
            onClick={() => setRole('buyer')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'buyer' ? 'bg-[#8b5e3c] text-white shadow-md' : 'text-gray-400'}`}
          >
            I want to Buy
          </button>
          <button 
            onClick={() => setRole('seller')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'seller' ? 'bg-[#3d2b1f] text-white shadow-md' : 'text-gray-400'}`}
          >
            I want to Sell
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#3d2b1f] mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8b5e3c] transition-all outline-none"
                placeholder="Coffee Enthusiast"
                required
              />
            </div>
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
              Sign Up as {role === 'buyer' ? 'Buyer' : 'Seller'}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-500">
          Already have an account? {' '}
          <button onClick={onSwitchToLogin} className="font-bold text-[#8b5e3c] hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
