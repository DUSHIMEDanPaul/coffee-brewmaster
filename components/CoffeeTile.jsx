
import React, { useState } from 'react';
import '../types';
import VerificationModal from './VerificationModal';
import OriginStoryModal from './OriginStoryModal';

const CoffeeTile = ({ coffee, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [showStoryShort, setShowStoryShort] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group flex flex-col h-full">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={coffee.image} 
            alt={coffee.name} 
            className={`w-full h-full object-cover transition-transform duration-1000 ${showStoryShort ? 'scale-110 blur-sm brightness-50' : 'group-hover:scale-105'}`}
          />
          
          <div className={`absolute inset-0 p-8 flex flex-col justify-center bg-[#3d2b1f]/60 backdrop-blur-md transition-opacity duration-500 ${showStoryShort ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h4 className="text-white font-serif font-bold text-xl mb-3">Legacy of {coffee.name}</h4>
            <p className="text-white/90 text-sm leading-relaxed overflow-y-auto max-h-36 pr-2 custom-scrollbar italic">
              {coffee.originStory}
            </p>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowStoryShort(false)}
                className="text-[10px] font-black text-white/60 uppercase tracking-widest hover:text-white transition-colors"
              >
                Return
              </button>
              <button 
                onClick={() => {
                  setShowStoryShort(false);
                  setShowFullStory(true);
                }}
                className="text-[10px] font-black text-white bg-[#8b5e3c] px-6 py-3 rounded-full uppercase tracking-widest hover:bg-[#704a30] transition-all shadow-lg"
              >
                Full Legacy
              </button>
            </div>
          </div>

          <button 
            onClick={() => onToggleFavorite(coffee.id)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-red-500 hover:bg-white transition-all z-20 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>

          <div className="absolute bottom-5 left-5 bg-[#3d2b1f]/80 text-white px-4 py-1.5 rounded-full text-[10px] font-black backdrop-blur-md z-10 shadow-lg border border-white/10">
            Lot Rating ★ {coffee.rating}
          </div>

          {/* Restored Trace Origin Button */}
          <div className="absolute bottom-5 right-5 flex gap-2">
            <button 
              onClick={() => setShowVerify(true)}
              className="bg-cyan-500/90 text-white p-2.5 rounded-full backdrop-blur-md z-10 hover:bg-cyan-600 transition-all shadow-lg border border-white/20 hover:scale-110 active:scale-95"
              title="Trace Origin Integrity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </button>
            <button 
              onClick={() => setShowStoryShort(true)}
              className="bg-white/90 text-[#3d2b1f] p-2.5 rounded-full backdrop-blur-md z-10 hover:bg-white transition-all shadow-lg border border-gray-100 hover:scale-110 active:scale-95"
              title="Heritage Story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-1">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.2em]">{coffee.origin}</span>
              <span className="text-[10px] font-mono text-gray-300">TRC-{coffee.id.slice(-4).toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#3d2b1f] leading-tight mb-2 group-hover:text-[#8b5e3c] transition-colors">{coffee.name}</h3>
            
            {/* Producer Badge */}
            <div className="flex items-center gap-3 bg-[#fcfaf9] p-3 rounded-2xl border border-gray-50 mb-4">
               <div className="w-8 h-8 rounded-full bg-[#3d2b1f] flex items-center justify-center text-white text-[10px] font-bold">
                 {(coffee.founder || 'LC').charAt(0)}
               </div>
               <div>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Master Producer</p>
                 <p className="text-xs font-bold text-[#3d2b1f]">{coffee.founder || 'Local Collective'}</p>
               </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 flex-1 italic leading-relaxed line-clamp-2">"{coffee.description}"</p>
          
          <div className="flex items-center justify-between gap-6 mt-auto">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Price / KG</span>
              <span className="text-2xl font-black text-[#3d2b1f] tracking-tighter">${coffee.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => onAddToCart(coffee)}
              className="flex-1 bg-[#3d2b1f] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-[#3d2b1f]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              Acquire Lot
            </button>
          </div>
        </div>
      </div>
      {showVerify && <VerificationModal coffee={coffee} onClose={() => setShowVerify(false)} />}
      {showFullStory && <OriginStoryModal coffee={coffee} onClose={() => setShowFullStory(false)} />}
    </>
  );
};

export default CoffeeTile;
