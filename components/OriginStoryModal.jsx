
import React from 'react';
import '../types';

const OriginStoryModal = ({ coffee, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#f8f5f2]/95 backdrop-blur-xl p-4 md:p-10 overflow-hidden">
      <div className="relative w-full max-w-5xl h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-8 duration-700">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-4 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Editorial Image */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
          <img 
            src={coffee.image} 
            alt={coffee.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3d2b1f]/80 to-transparent flex flex-col justify-end p-10">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-2">Heritage Ledger</span>
            <h2 className="text-4xl font-serif font-bold text-white mb-2">{coffee.name}</h2>
            <p className="text-white/60 text-sm italic">Established c. {coffee.foundingYear || 'Ancient'}</p>
          </div>
        </div>

        {/* Right Side: Narrative Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar space-y-12">
          
          {/* Section: The Washing Station */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest bg-[#8b5e3c]/10 px-3 py-1 rounded-full">The Station</span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>
            <h3 className="text-3xl font-serif font-bold text-[#3d2b1f]">{coffee.washingStation || 'Artisanal Micro-Mill'}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {coffee.originStory}
            </p>
          </section>

          {/* Section: The Founder & Mission */}
          <section className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Founder & Vision</span>
              <h4 className="text-xl font-bold text-[#3d2b1f]">{coffee.founder || 'Local Collective'}</h4>
            </div>
            <div className="pl-6 border-l-2 border-[#8b5e3c] italic text-[#3d2b1f]/80 leading-relaxed">
              "{coffee.mission || 'To preserve the legacy of regional beans while fostering community growth through specialty excellence.'}"
            </div>
          </section>

          {/* Section: The Farmers */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest bg-[#8b5e3c]/10 px-3 py-1 rounded-full">The Producers</span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {coffee.farmerStory || 'Generationally managed smallholder plots where cherry picking is a community ritual.'}
            </p>
          </section>

          {/* Section: The Region */}
          <section className="space-y-4">
             <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest bg-[#8b5e3c]/10 px-3 py-1 rounded-full">The Land</span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="text-gray-600 leading-relaxed">
                {coffee.regionDetail || 'Characterized by rich volcanic soils and high-altitude microclimates that slow the maturation of coffee cherries.'}
              </p>
              <div className="bg-[#f8f5f2] p-6 rounded-2xl flex flex-col justify-center">
                <span className="text-[9px] font-black text-[#8b5e3c] uppercase tracking-widest mb-1">Local Origin</span>
                <p className="text-sm font-bold text-[#3d2b1f]">{coffee.origin}</p>
              </div>
            </div>
          </section>

          {/* Footer Signature */}
          <div className="pt-12 border-t border-gray-100 flex justify-between items-center text-gray-400">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#8b5e3c] rounded-full flex items-center justify-center text-white text-[10px] font-bold">E</div>
                <span className="text-[10px] font-black uppercase tracking-widest">Curated by Elias</span>
             </div>
             <p className="text-[10px] font-mono italic">Verified Trace Entry #{coffee.id.toUpperCase()}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OriginStoryModal;
