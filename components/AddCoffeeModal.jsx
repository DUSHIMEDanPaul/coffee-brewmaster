
import React, { useState } from 'react';
import '../types';

const AddCoffeeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: 'Brew',
    flavorProfile: 'Floral',
    price: 0,
    rating: 5.0,
    sustainabilityScore: 95,
    latLng: { lat: 0, lng: 0 },
    foundingYear: new Date().getFullYear(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoffee = {
      ...formData,
      id: `lot-${Math.random().toString(36).substr(2, 9)}`,
    };
    onSave(newCoffee);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d2b1f]/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300">
        
        {/* Left Sidebar: Context */}
        <div className="w-full md:w-1/3 bg-[#fcfaf9] p-10 border-r border-gray-100 hidden md:block">
          <div className="sticky top-0">
            <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.3em] mb-4 block">Registry Node</span>
            <h2 className="text-3xl font-serif font-bold text-[#3d2b1f] mb-6">Lot Initialization</h2>
            <p className="text-gray-500 text-sm leading-relaxed italic">
              "To register a lot is to etch its legacy into the global ledger. Ensure every coordinate, station name, and mission statement reflects the true heritage of the bean."
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">✓</div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Traceability Guaranteed</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">✓</div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Climate Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: The Form */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="flex justify-between items-center mb-10 md:hidden">
            <h2 className="text-2xl font-serif font-bold text-[#3d2b1f]">New Lot Entry</h2>
            <button onClick={onClose} className="p-2 text-gray-400">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Core Info */}
            <section className="space-y-6">
              <h3 className="text-xs font-black text-[#8b5e3c] uppercase tracking-[0.4em] border-b border-gray-100 pb-2">Artifact Essentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Coffee Name</label>
                  <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="e.g. Blue Mountain Reserve" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price per KG ($)</label>
                  <input required type="number" step="0.01" onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="18.50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Origin Region</label>
                  <input required type="text" onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="Huila, Colombia" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                  <input required type="text" onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="https://unsplash..." />
                </div>
              </div>
            </section>

            {/* Heritage Data */}
            <section className="space-y-6">
              <h3 className="text-xs font-black text-[#8b5e3c] uppercase tracking-[0.4em] border-b border-gray-100 pb-2">Heritage Ledger</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Washing Station</label>
                  <input required type="text" onChange={e => setFormData({...formData, washingStation: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="El Diviso Station" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Founder Name</label>
                  <input required type="text" onChange={e => setFormData({...formData, founder: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="Jose Lasso" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">The Mission</label>
                  <textarea required onChange={e => setFormData({...formData, mission: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none h-24" placeholder="To restore the biodiversity of the central valley..." />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Origin Narrative</label>
                  <textarea required onChange={e => setFormData({...formData, originStory: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none h-32" placeholder="Describe the journey of this lot from seedling to export..." />
                </div>
              </div>
            </section>

            {/* Technical Parameters */}
            <section className="space-y-6">
              <h3 className="text-xs font-black text-[#8b5e3c] uppercase tracking-[0.4em] border-b border-gray-100 pb-2">Geospatial Nodes</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Latitude</label>
                  <input required type="number" step="0.0001" onChange={e => setFormData({...formData, latLng: {...formData.latLng!, lat: parseFloat(e.target.value)}})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="2.535" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Longitude</label>
                  <input required type="number" step="0.0001" onChange={e => setFormData({...formData, latLng: {...formData.latLng!, lng: parseFloat(e.target.value)}})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8b5e3c] outline-none" placeholder="-75.527" />
                </div>
              </div>
            </section>

            <div className="flex gap-4 pt-6">
              <button type="button" onClick={onClose} className="flex-1 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Abort Registry</button>
              <button type="submit" className="flex-[2] bg-[#3d2b1f] text-white py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95">Commit to Ledger</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoffeeModal;
