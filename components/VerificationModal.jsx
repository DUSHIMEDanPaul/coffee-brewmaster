
import React, { useEffect, useState } from 'react';
import '../types';
import { verifyDeforestationStatus } from '../services/geminiService';

const VerificationModal = ({ coffee, onClose }) => {
  const [status, setStatus] = useState('Calibrating Satellite Link...');
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const runAudit = async () => {
      try {
        const result = await verifyDeforestationStatus(coffee.origin, coffee.latLng);
        setStatus(result.text);
        setSources(result.sources);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    runAudit();
  }, [coffee]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-xl overflow-hidden">
      {/* VR HUD Backdrop Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-cyan-500 rounded-tl-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-cyan-500 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-cyan-500 rounded-bl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-cyan-500 rounded-br-3xl"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80vw] h-[80vh] border border-cyan-500/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl h-full md:h-auto md:aspect-video bg-[#0a191e]/80 border border-white/10 rounded-none md:rounded-[3rem] shadow-[0_0_100px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col animate-in zoom-in duration-500">
        {/* Top Header - HUD Style */}
        <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-start bg-gradient-to-b from-cyan-900/20 to-transparent">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Live Satellite Uplink Active</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Trace: {coffee.name}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
                LAT: {coffee.latLng.lat.toFixed(4)}N | LNG: {coffee.latLng.lng.toFixed(4)}E
              </span>
              <div className="h-[1px] w-12 bg-white/20"></div>
              <span className="text-[10px] font-mono text-cyan-400/60 uppercase">EAC HERITAGE SECURED</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Side: Immersive Visuals */}
          <div className="relative w-full md:w-3/5 h-64 md:h-auto overflow-hidden group">
            <img 
              src={coffee.image} 
              className="w-full h-full object-cover transition-transform duration-[10000ms] scale-110 group-hover:scale-125 brightness-75"
              alt="Origin Panorama"
            />
            {/* Viewfinder Overlays */}
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></div>
               <div className="absolute w-full h-[1px] bg-white/20"></div>
               <div className="absolute h-full w-[1px] bg-white/20"></div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-black/80 backdrop-blur-xl p-5 rounded-3xl border border-white/10">
                <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">Origin Imagery Status</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[8px] text-white/40 uppercase tracking-tighter">Resolution</p>
                    <p className="text-xs font-mono text-white">Sub-Meter</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/40 uppercase tracking-tighter">Bands</p>
                    <p className="text-xs font-mono text-white">RGB + NIR</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {sources.length > 0 ? (
                  sources.map((src, i) => (
                    src.maps && (
                      <a 
                        key={i}
                        href={src.maps.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 border border-white/10 group/map"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/map:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Grounding Map</span>
                      </a>
                    )
                  ))
                ) : (
                  <button className="bg-white/10 backdrop-blur-md text-white/40 px-5 py-3 rounded-2xl border border-white/5 cursor-not-allowed">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Geo-Linked Data Pending</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Data Feed */}
          <div className="w-full md:w-2/5 flex flex-col p-6 md:p-10 gap-10 bg-[#0a191e] overflow-y-auto custom-scrollbar border-l border-white/10">
            {/* Environmental Intelligence */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Environmental Audit</h3>
              </div>
              
              {loading ? (
                <div className="space-y-3 p-6 bg-white/5 rounded-3xl animate-pulse border border-white/5">
                  <div className="h-2 bg-cyan-400/20 rounded w-full"></div>
                  <div className="h-2 bg-cyan-400/20 rounded w-4/5"></div>
                  <div className="h-2 bg-cyan-400/20 rounded w-3/5"></div>
                </div>
              ) : error ? (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
                   <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">System Error</p>
                   <p className="text-red-400/60 text-[10px] leading-relaxed italic">Encryption failure or satellite link severed. Attempting manual origin verification.</p>
                </div>
              ) : (
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-inner group transition-all hover:bg-white/[0.08]">
                  <p className="text-white/90 text-sm leading-relaxed italic font-medium">
                    "{status}"
                  </p>
                </div>
              )}
            </div>

            {/* Traceability Artifacts */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-[11px] font-black text-purple-400 uppercase tracking-[0.3em]">Ledger Metadata</h3>
              </div>
              <div className="space-y-3">
                {[
                  { stage: 'Harvest Node', hash: '0xBD...F92', status: 'VERIFIED' },
                  { stage: 'Processing Station', hash: '0x8A...E41', status: 'SECURED' },
                  { stage: 'Sustainability Pass', hash: '0x33...A12', status: 'VALIDATED' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
                    <div>
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block">{step.stage}</span>
                      <span className="text-[10px] font-mono text-purple-300">{step.hash}</span>
                    </div>
                    <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{step.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Footer */}
            <div className="mt-auto pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="bg-[#1a434d]/40 p-5 rounded-3xl border border-cyan-500/20 text-center">
                <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">Ethical Index</p>
                <p className="text-3xl font-black text-white">{coffee.sustainabilityScore}%</p>
              </div>
              <div className="bg-purple-900/20 p-5 rounded-3xl border border-purple-500/20 text-center flex flex-col justify-center">
                <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Trace Status</p>
                <p className="text-sm font-black text-white uppercase tracking-tighter">Chain Nominal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
