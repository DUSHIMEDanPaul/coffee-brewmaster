
import React, { useState, useEffect, useMemo, useRef } from 'react';
import './types';
import { COFFEE_DATA } from './constants';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CoffeeTile from './components/CoffeeTile';
import { getCoffeeChatResponse, getSellerBusinessInsights } from './services/geminiService';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VoiceChatModal from './components/VoiceChatModal';
import AddCoffeeModal from './components/AddCoffeeModal';

// --- SHARED COMPONENT: OrderLogisticsView ---
const OrderLogisticsView = ({ order, isSeller, onProgress }) => {
  const completedSteps = order.transitHistory.filter(s => s.status === 'Completed').length;
  const progress = (completedSteps / (order.transitHistory.length - 1)) * 100;
  const currentStep = order.transitHistory.find(s => s.status === 'Current');

  return (
    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-[#3d2b1f] p-8 md:p-12 text-white relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.657M7 20h1.5a1 1 0 001-1v-1a2 2 0 012-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1a2 2 0 01-2-2V4a2 2 0 012-2h1.5" /></svg>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#8b5e3c] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                {isSeller ? 'Control Node: ACTIVE' : 'Live Trace: ACTIVE'}
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">TRC-{order.id.toUpperCase()}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              {order.status === 'Shipped' ? 'Global Transit' : order.status}
            </h3>
            <p className="text-white/50 text-sm italic mt-2">
              Batch: {order.items.map(i => i.name).join(', ')}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center min-w-[140px]">
            <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.2em] block mb-2">ETA Arrival</span>
            <p className="text-3xl font-black">{order.status === 'Delivered' ? 'ARRIVED' : '48h'}</p>
            <p className="text-[9px] text-white/40 uppercase mt-1">Satellite Precision</p>
          </div>
        </div>

        <div className="relative mb-4 z-10">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-[#8b5e3c] transition-all duration-[1500ms] ease-in-out shadow-[0_0_20px_rgba(139,94,60,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between px-2">
            {order.transitHistory.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-3.5 h-3.5 rounded-full transition-all duration-700 border-2 ${
                  step.status === 'Completed' ? 'bg-[#8b5e3c] border-[#8b5e3c]' : 
                  step.status === 'Current' ? 'bg-[#8b5e3c] border-white animate-pulse shadow-[0_0_15px_white]' : 'bg-transparent border-white/20'
                }`} />
                <span className={`text-[9px] font-black uppercase mt-4 tracking-tighter text-center max-w-[80px] ${step.status === 'Pending' ? 'text-white/20' : 'text-white'}`}>
                  {step.label}
                </span>
                {step.timestamp && (
                  <span className="text-[8px] font-mono text-[#8b5e3c] mt-1">{step.timestamp}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#fcfaf9]">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M3 12H2m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Environmental</span>
            <p className="text-lg font-bold text-[#1a434d]">18.4°C | 58% Humidity</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Freshness Index</span>
            <p className="text-lg font-bold text-green-600">Optimal Preservation</p>
          </div>
        </div>

        <div className="bg-[#1a434d] p-6 rounded-[2rem] flex items-center gap-5 text-white shadow-xl shadow-[#1a434d]/20">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Current Waypoint</span>
            <p className="text-sm font-bold truncate max-w-[150px]">{currentStep?.location || 'Processing Node'}</p>
          </div>
        </div>
      </div>

      {isSeller && order.status !== 'Delivered' && (
        <div className="p-8 border-t border-gray-100 bg-white flex justify-end">
          <button 
            onClick={onProgress}
            className="group relative flex items-center gap-3 bg-[#3d2b1f] text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Authorize Stage Transition</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: InsightMetric ---
const InsightMetric = ({ label, value, trend, isUp, subtext }) => (
  <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">{label}</p>
      <div className="flex items-baseline gap-3">
        <h4 className="text-4xl font-black text-[#3d2b1f] tracking-tighter">{value}</h4>
        {trend && (
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isUp ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
    </div>
    <p className="text-[10px] font-bold text-gray-400 mt-6 uppercase tracking-tighter italic">{subtext}</p>
  </div>
);

// --- COMPONENT: SellerDashboard ---
const SellerDashboard = ({ user, onAddCoffee, myCoffees, orders, onUpdateOrder }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [granularity, setGranularity] = useState('Week');
  const [aiInsights, setAiInsights] = useState('Elias is calibrating regional demand indices...');

  useEffect(() => {
    if (activeTab === 'analytics') {
      getSellerBusinessInsights(`Revenue $14k. Total Orders: ${orders.length}. Granularity: ${granularity}`).then(setAiInsights);
    }
  }, [activeTab, orders.length, granularity]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    return {
      revenue,
      ordersCount: orders.length,
      activeShipments: orders.filter(o => o.status === 'Shipped' || o.status === 'Approved').length
    };
  }, [orders]);

  const chartData = useMemo(() => {
    const labels = {
      'Hour': ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      'Day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      'Week': ['W1', 'W2', 'W3', 'W4', 'W5'],
      'Month': ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      'Year': ['2021', '2022', '2023', '2024', '2025']
    };
    const values = Array.from({ length: labels[granularity].length }, () => Math.floor(Math.random() * 70) + 30);
    return { labels: labels[granularity], values };
  }, [granularity]);

  const generateLinePath = () => {
    if (chartData.values.length === 0) return "";
    const width = 1000;
    const height = 400;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const stepX = chartWidth / (chartData.values.length - 1);
    
    return chartData.values.map((v, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (v / 100) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const handleProgressOrder = (order: Order) => {
    const currentIndex = order.transitHistory.findIndex(s => s.status === 'Current');
    if (currentIndex < order.transitHistory.length - 1) {
      const newHistory = [...order.transitHistory];
      newHistory[currentIndex] = { 
        ...newHistory[currentIndex], 
        status: 'Completed', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      newHistory[currentIndex + 1] = { ...newHistory[currentIndex + 1], status: 'Current' };
      
      let newStatus = order.status;
      if (currentIndex === 0) newStatus = 'Approved';
      if (currentIndex === 1) newStatus = 'Shipped';
      if (currentIndex === order.transitHistory.length - 2) newStatus = 'Delivered';

      const updated = { ...order, transitHistory: newHistory, status: newStatus };
      onUpdateOrder(order.id, { transitHistory: newHistory, status: newStatus });
      setSelectedOrder(updated);
    }
  };

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-6xl font-serif font-bold text-[#3d2b1f] tracking-tight">
            Elias Command
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <p className="text-[#8b5e3c] font-black uppercase tracking-[0.3em] text-[10px]">
              Active Seller: {user.displayName} | Link: SECURED
            </p>
          </div>
        </div>
        <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-[2rem] shadow-sm border border-gray-100">
          {['analytics', 'orders', 'listings'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedOrder(null); }}
              className={`px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-[#3d2b1f] text-white shadow-xl' : 'text-gray-400 hover:text-[#3d2b1f]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InsightMetric label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="12.4%" isUp={true} subtext="Global direct trade volume" />
            <InsightMetric label="Orders Logged" value={stats.ordersCount.toString()} trend="5.1%" isUp={true} subtext="Verified supply chain tokens" />
            <InsightMetric label="Active Hubs" value={stats.activeShipments.toString()} subtext="Real-time transit nodes" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white p-10 md:p-14 rounded-[4rem] shadow-sm border border-gray-50 flex flex-col gap-10">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-[#3d2b1f]">Velocity Command</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Acquisition Velocity Index</p>
                  </div>
                  <div className="flex bg-[#fcfaf9] p-2 rounded-2xl border border-gray-100 shadow-inner">
                    {['Hour', 'Day', 'Week', 'Month', 'Year'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGranularity(g)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${granularity === g ? 'bg-[#3d2b1f] text-white shadow-lg scale-105' : 'text-gray-400 hover:text-[#3d2b1f]'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
               </div>
               
               <div className="relative h-80 w-full mt-4">
                  {/* Line Chart UI */}
                  <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5e3c" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5e3c" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Area Fill */}
                    <path 
                      d={`${generateLinePath()} L 950 350 L 50 350 Z`} 
                      fill="url(#chartGradient)" 
                      className="transition-all duration-1000"
                    />
                    
                    {/* Main Line */}
                    <path 
                      d={generateLinePath()} 
                      fill="none" 
                      stroke="#8b5e3c" 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      filter="url(#glow)"
                      className="transition-all duration-1000"
                    />

                    {/* Data Points */}
                    {chartData.values.map((v, i) => {
                      const width = 1000;
                      const height = 400;
                      const padding = 50;
                      const chartWidth = width - padding * 2;
                      const chartHeight = height - padding * 2;
                      const stepX = chartWidth / (chartData.values.length - 1);
                      const x = padding + i * stepX;
                      const y = height - padding - (v / 100) * chartHeight;
                      
                      return (
                        <g key={i} className="group/point">
                          <circle cx={x} cy={y} r="8" fill="white" stroke="#8b5e3c" strokeWidth="3" className="transition-all group-hover/point:r-12" />
                          <text x={x} y={y - 25} textAnchor="middle" className="text-[20px] font-black fill-[#3d2b1f] opacity-0 group-hover/point:opacity-100 transition-opacity">
                            {v}%
                          </text>
                          <text x={x} y={380} textAnchor="middle" className="text-[18px] font-black fill-gray-400 uppercase tracking-widest">
                            {chartData.labels[i]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 border-b border-gray-100 flex flex-col justify-between py-12 pointer-events-none opacity-20">
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                  </div>
               </div>
            </div>

            <div className="bg-[#3d2b1f] p-12 rounded-[4rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform group-hover:scale-125">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping shadow-[0_0_10px_cyan]"></div>
                     <p className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-400">Elias Intelligence</p>
                  </div>
                  <p className="text-xl font-serif italic text-white/90 leading-relaxed">
                    "{aiInsights}"
                  </p>
               </div>
               <button className="mt-12 relative z-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-[0.3em] transition-all active:scale-95">
                  Deep Dive Strategy
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-6">
           {selectedOrder ? (
             <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
               <button 
                 onClick={() => setSelectedOrder(null)}
                 className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-[#8b5e3c] transition-colors tracking-widest"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                 Return to Global Ledger
               </button>
               <OrderLogisticsView 
                 order={selectedOrder} 
                 isSeller={true} 
                 onProgress={() => handleProgressOrder(selectedOrder)} 
               />
             </div>
           ) : orders.length === 0 ? (
             <div className="bg-white p-24 rounded-[4rem] text-center border border-gray-100 italic text-gray-400 shadow-sm">
                No active supply chain nodes detected.
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-6">
               {orders.map(order => (
                 <div 
                   key={order.id} 
                   onClick={() => setSelectedOrder(order)}
                   className="bg-white p-12 rounded-[4rem] border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-12 hover:shadow-xl hover:border-[#8b5e3c]/10 transition-all cursor-pointer group"
                 >
                    <div className="flex items-center gap-10 flex-1">
                       <div className="w-20 h-20 bg-[#fcfaf9] rounded-[2rem] flex items-center justify-center text-[#8b5e3c] group-hover:bg-[#8b5e3c] group-hover:text-white transition-all shadow-inner">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest">ID: {order.id.toUpperCase()}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                              {order.status}
                            </span>
                          </div>
                          <h3 className="text-3xl font-serif font-bold text-[#3d2b1f] group-hover:text-[#8b5e3c] transition-colors">
                            {order.items[0].name}
                          </h3>
                          <p className="text-sm text-gray-400 font-medium italic mt-1">Acquirer: {order.buyerName}</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-col items-center flex-1">
                       <div className="flex gap-3 mb-4">
                          {order.transitHistory.map((s, idx) => (
                             <div key={idx} className={`w-5 h-2 rounded-full transition-all duration-500 ${s.status === 'Completed' ? 'bg-[#8b5e3c]' : s.status === 'Current' ? 'bg-cyan-500 animate-pulse' : 'bg-gray-100'}`} />
                          ))}
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Transit Integrity: NOMINAL</span>
                    </div>

                    <div className="text-right">
                       <p className="text-2xl font-black text-[#3d2b1f]">${order.total.toFixed(2)}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Payment</p>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}

      {activeTab === 'listings' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-6">
          <div className="flex justify-between items-center bg-white p-16 rounded-[4rem] border border-gray-100 border-dashed shadow-sm">
             <div>
                <h3 className="text-3xl font-serif font-bold text-[#3d2b1f]">Register New Artifact</h3>
                <p className="text-gray-500 italic text-sm mt-2">Introduce a rare, verified specialty lot to the global Elias network.</p>
             </div>
             <button 
               onClick={() => setShowAddModal(true)}
               className="bg-[#3d2b1f] text-white px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black hover:scale-105 transition-all active:scale-95"
             >
                + Initialize Lot
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {myCoffees.map((coffee) => (
               <div key={coffee.id} className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm flex items-center gap-8 group hover:shadow-xl hover:border-[#8b5e3c]/10 transition-all">
                  <div className="relative overflow-hidden rounded-[2.5rem] w-28 h-28 flex-shrink-0">
                    <img src={coffee.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={coffee.name} />
                  </div>
                  <div className="flex-1">
                     <span className="text-[9px] font-black text-[#8b5e3c] uppercase mb-1 tracking-[0.2em] block">{coffee.origin}</span>
                     <h4 className="font-serif font-bold text-[#3d2b1f] text-xl group-hover:text-[#8b5e3c] transition-colors">{coffee.name}</h4>
                     <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-black text-[#3d2b1f]">${coffee.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                           <span className="text-[9px] font-black text-green-600 uppercase tracking-tighter">Ready</span>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}
      {showAddModal && <AddCoffeeModal onClose={() => setShowAddModal(false)} onSave={(c) => { onAddCoffee(c); setShowAddModal(false); }} />}
    </div>
  );
};

// --- COMPONENT: BuyerOrdersPage ---
const BuyerOrdersPage = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-6 pb-24 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-5xl font-serif font-bold text-[#3d2b1f]">My Heritage</h1>
          <p className="text-gray-500 italic text-lg mt-2">The live trace of your artisanal acquisitions.</p>
        </div>
      </div>

      {selectedOrder ? (
        <div className="space-y-8 animate-in slide-in-from-right-8">
          <button 
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-[#8b5e3c] transition-colors tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Return to Ledger
          </button>
          <OrderLogisticsView order={selectedOrder} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-12 rounded-[4rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-10"
            >
              <div className="flex items-center gap-10">
                <div className="w-20 h-20 bg-[#fcfaf9] rounded-[2rem] flex items-center justify-center text-[#8b5e3c] group-hover:bg-[#8b5e3c] group-hover:text-white transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black uppercase text-[#8b5e3c] tracking-widest">TRACE ID: {order.id.slice(-6).toUpperCase()}</span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-[#8b5e3c]/10 text-[#8b5e3c]'}`}>
                      {order.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#3d2b1f] group-hover:text-[#8b5e3c] transition-colors">
                    {order.items[0].name}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                 <div className="text-right hidden md:block">
                   <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Value</p>
                   <p className="text-2xl font-black text-[#3d2b1f]">${order.total.toFixed(2)}</p>
                 </div>
                 <div className="p-4 bg-[#fcfaf9] rounded-2xl text-gray-300 group-hover:text-[#8b5e3c] group-hover:bg-[#8b5e3c]/5 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: CartPage ---
const CartPage = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <h1 className="text-5xl font-serif font-bold text-[#3d2b1f]">Shopping Ledger</h1>
      {items.length === 0 ? (
        <div className="bg-white p-24 rounded-[4rem] text-center border border-gray-100 italic text-gray-400 shadow-sm">
          Your ledger is currently awaiting artisanal entries.
        </div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-8">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-[2rem] object-cover shadow-md" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#3d2b1f]">{item.name}</h3>
                  <p className="text-[#8b5e3c] font-black text-xs uppercase tracking-widest">${item.price.toFixed(2)} / unit</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center bg-[#fcfaf9] rounded-2xl p-1 border border-gray-100 shadow-inner">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-xl transition-colors font-bold text-gray-400 text-lg">-</button>
                  <span className="w-12 text-center font-black text-[#3d2b1f]">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-xl transition-colors font-bold text-[#3d2b1f] text-lg">+</button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-400 p-4 hover:bg-red-50 hover:text-red-600 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 mt-12 shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-serif font-bold text-[#3d2b1f]">Total Direct Trade Investment</span>
              <span className="text-4xl font-black text-[#8b5e3c] tracking-tighter">${total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => onCheckout('Standard')}
                className="py-6 bg-[#8b5e3c] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#704a30] transition-all shadow-xl active:scale-95"
              >
                Standard Waybill
              </button>
              <button 
                onClick={() => onCheckout('Escrow')}
                className="py-6 bg-[#3d2b1f] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Smart Trace Escrow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: VoiceConciergePage ---
const VoiceConciergePage = ({ user, onStartVoice }) => {
  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 animate-in zoom-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-[#8b5e3c]/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative bg-white p-12 rounded-full shadow-[0_0_80px_rgba(139,94,60,0.2)] border-[12px] border-white/50 group hover:scale-105 transition-transform duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#8b5e3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-serif font-bold text-[#3d2b1f]">Chief Curator</h1>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-lg">
          Greetings, {user.displayName}. Elias is ready to consult on brewing chemistry, origin ethics, or your current supply chain Waypoints.
        </p>
      </div>
      <button 
        onClick={onStartVoice}
        className="bg-[#3d2b1f] text-white px-16 py-7 rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95"
      >
        Initialize Session
      </button>
    </div>
  );
};

// --- COMPONENT: ChatWithEliasPage ---
const ChatWithEliasPage = ({ onOpenVoice }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const stream = await getCoffeeChatResponse(input, messages);
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);
      
      for await (const chunk of stream) {
        fullText += chunk.text || '';
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, parts: [{ text: fullText }] }];
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto p-6 animate-in slide-in-from-bottom-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3d2b1f]">Chat with Elias</h1>
          <p className="text-[9px] font-black uppercase text-[#8b5e3c] tracking-widest mt-1">Live Consultation</p>
        </div>
        <button onClick={onOpenVoice} className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black text-[#8b5e3c] uppercase tracking-widest flex items-center gap-3 hover:bg-[#8b5e3c] hover:text-white transition-all shadow-sm border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          Switch to Voice
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="bg-white p-12 rounded-[3rem] border border-gray-50 italic text-gray-400 text-center shadow-inner">
            "Ask Elias about the mineral composition of Nyeri volcanic soil or the chemical transition of the Giling Basah process."
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-[15px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#3d2b1f] text-white rounded-tr-none' : 'bg-white text-[#3d2b1f] border border-gray-50 rounded-tl-none'}`}>
              {m.parts[0].text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-3xl border border-gray-50 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="relative group">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Consult with Elias..."
          className="w-full bg-white px-10 py-6 rounded-[2rem] border border-gray-100 focus:ring-2 focus:ring-[#8b5e3c] outline-none shadow-xl transition-all"
        />
        <button onClick={handleSend} className="absolute right-4 top-4 bg-[#3d2b1f] text-white p-3 rounded-2xl hover:bg-black transition-all shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: ADVANCED FILTER HUB ---
const AdvancedFilterHub = ({ filters, setFilters, origins }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <input 
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search artifacts or heritage narratives..."
            className="w-full bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-[#8b5e3c] outline-none transition-all pl-12"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b5e3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Toggle Hub Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all flex items-center gap-3 ${isOpen ? 'bg-[#3d2b1f] text-white border-[#3d2b1f]' : 'bg-white text-gray-400 border-gray-100 shadow-sm hover:border-[#8b5e3c]'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Advanced Filters
        </button>

        {/* Sorting Dropdown */}
        <select 
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm font-bold text-xs uppercase tracking-widest text-gray-600 outline-none focus:ring-2 focus:ring-[#8b5e3c]"
        >
          <option value="newest">New Arrivals</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Expandable Filter Drawer */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Technical State */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.3em] mb-4">Technical State</h4>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.isRoasted} 
                  onChange={(e) => setFilters({...filters, isRoasted: e.target.checked})}
                  className="w-5 h-5 rounded-lg border-gray-300 text-[#8b5e3c] focus:ring-[#8b5e3c]" 
                />
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#3d2b1f]">Artisanal Roasted Beans</span>
              </label>
              <label className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.isUnroasted} 
                  onChange={(e) => setFilters({...filters, isUnroasted: e.target.checked})}
                  className="w-5 h-5 rounded-lg border-gray-300 text-[#8b5e3c] focus:ring-[#8b5e3c]" 
                />
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#3d2b1f]">Green / Unroasted Lots</span>
              </label>
            </div>
            
            <div className="pt-6 border-t border-gray-50">
              <h4 className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.3em] mb-4">Growing Conditions</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'isVolcanic', label: 'Volcanic Soil' },
                  { id: 'isHighAltitude', label: 'High Altitude (>1500m)' }
                ].map(cond => (
                  <button 
                    key={cond.id}
                    onClick={() => setFilters({ ...filters, [cond.id]: !filters[cond.id] })}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filters[cond.id] ? 'bg-[#8b5e3c] text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Origin Nodes */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.3em] mb-4">Origin Hubs</h4>
            <div className="grid grid-cols-2 gap-2">
              {origins.map(origin => (
                <button 
                  key={origin}
                  onClick={() => {
                    const newOrigins = filters.originNodes.includes(origin) 
                      ? filters.originNodes.filter(o => o !== origin)
                      : [...filters.originNodes, origin];
                    setFilters({ ...filters, originNodes: newOrigins });
                  }}
                  className={`px-3 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-left truncate transition-all ${filters.originNodes.includes(origin) ? 'bg-[#3d2b1f] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {origin}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Quality Nodes */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-[#8b5e3c] uppercase tracking-[0.3em]">Quality Threshold</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    onClick={() => setFilters({ ...filters, rating: star === filters.rating ? 0 : star })}
                    className={`transition-all ${star <= filters.rating ? 'text-amber-400' : 'text-gray-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-10">
              <button 
                onClick={() => setFilters({
                  search: '',
                  rating: 0,
                  originNodes: [],
                  isRoasted: false,
                  isUnroasted: false,
                  isVolcanic: false,
                  isHighAltitude: false,
                  sort: 'newest'
                })}
                className="text-[10px] font-black uppercase text-red-400 tracking-widest hover:text-red-500 transition-colors"
              >
                Reset Ledger
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-[#3d2b1f] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95"
              >
                Execute Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [currentPage, setCurrentPage] = useState('shop');
  const [cart, setCart] = useState([]);
  const [allCoffees, setAllCoffees] = useState(COFFEE_DATA);
  const [orders, setOrders] = useState([]);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    rating: 0,
    originNodes: [],
    isRoasted: false,
    isUnroasted: false,
    isVolcanic: false,
    isHighAltitude: false,
    sort: 'newest'
  });

  const origins = useMemo(() => Array.from(new Set(allCoffees.map(c => c.origin))), [allCoffees]);

  const filteredCoffees = useMemo(() => {
    let result = allCoffees.filter(c => {
      const matchesSearch = filters.search === '' || 
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.originStory.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRating = filters.rating === 0 || c.rating >= filters.rating;
      const matchesOrigin = filters.originNodes.length === 0 || filters.originNodes.includes(c.origin);
      
      let matchesRoast = true;
      if (filters.isRoasted && !filters.isUnroasted) matchesRoast = c.isRoasted;
      if (!filters.isRoasted && filters.isUnroasted) matchesRoast = !c.isRoasted;
      
      const matchesVolcanic = !filters.isVolcanic || c.isVolcanic;
      const matchesAltitude = !filters.isHighAltitude || c.altitude >= 1500;

      return matchesSearch && matchesRating && matchesOrigin && matchesRoast && matchesVolcanic && matchesAltitude;
    });

    return result.sort((a, b) => {
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'price-low') return a.price - b.price;
      if (filters.sort === 'price-high') return b.price - a.price;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [allCoffees, filters]);

  const toggleFavorite = (id) => {
    if (!user) return;
    setUser(curr => {
      if (!curr) return null;
      const exists = curr.favorites.includes(id);
      const newFavorites = exists 
        ? curr.favorites.filter(f => f !== id) 
        : [...curr.favorites, id];
      return { ...curr, favorites: newFavorites };
    });
  };

  const handleLogin = (email, pass, role) => {
    setUser({ id: 'u1', email, displayName: email.split('@')[0], favorites: [], role });
    setCurrentPage(role === 'seller' ? 'seller-dashboard' : 'shop');
    
    if (orders.length === 0) {
      setOrders([
        {
          id: 'ord-8832',
          buyerName: 'Marcus Vane',
          items: [{ ...COFFEE_DATA[1], quantity: 1 }],
          total: 21.00,
          status: 'Shipped',
          paymentStatus: 'Partial',
          paymentMethod: 'Escrow',
          date: new Date(Date.now() - 86400000).toISOString(),
          transitHistory: [
            { label: 'Washing Station Origin', location: 'Nyeri Hill, Kenya', status: 'Completed', timestamp: '08:00 AM' },
            { label: 'Regional Processing Hub', location: 'Nairobi Logistics', status: 'Current' },
            { label: 'EAC Export Hub', location: 'Mombasa Port', status: 'Pending' },
            { label: 'Global Freight', location: 'En Route', status: 'Pending' },
            { label: 'Final Delivery', location: 'Local Hub', status: 'Pending' }
          ]
        }
      ]);
    }
  };

  const handleCheckout = (method) => {
    if (cart.length === 0) return;
    const origin = cart[0].origin;
    const newOrder = {
      id: `ord-${Math.floor(Math.random() * 10000)}`,
      buyerName: user?.displayName || 'Guest',
      items: [...cart],
      total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      status: 'Pending',
      paymentStatus: 'Pending',
      paymentMethod: method,
      date: new Date().toISOString(),
      transitHistory: [
        { label: 'Washing Station Origin', location: origin, status: 'Current' },
        { label: 'Regional Processing Hub', location: 'Processing Node', status: 'Pending' },
        { label: 'EAC Export Hub', location: 'Port Terminal', status: 'Pending' },
        { label: 'Global Freight', location: 'Maritime Lane', status: 'Pending' },
        { label: 'Final Delivery', location: 'Buyer Hub', status: 'Pending' }
      ]
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setCurrentPage('orders');
  };

  const renderContent = () => {
    if (!user) {
      return authView === 'login' ? <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} /> : <SignupPage onSignup={(n, e, p, r) => { setUser({ id: 'u2', email: e, displayName: n, favorites: [], role: r }); setCurrentPage(r === 'seller' ? 'seller-dashboard' : 'shop'); }} onSwitchToLogin={() => setAuthView('login')} />;
    }

    switch(currentPage) {
      case 'favorites': {
        const favoriteLots = allCoffees.filter(c => user.favorites.includes(c.id));
        return (
          <div className="p-6 pb-24 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <h1 className="text-5xl font-serif font-bold text-[#3d2b1f]">Personal Sanctuary</h1>
              </div>
              <p className="text-gray-500 italic text-lg ml-2 leading-relaxed">Your curated ledger of artisanal acquisitions and heritage profiles.</p>
            </div>
            {favoriteLots.length === 0 ? (
              <div className="bg-white p-32 rounded-[4rem] text-center border border-gray-100 italic text-gray-400 shadow-sm flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <p className="text-xl">No artifacts have been inducted into your sanctuary yet.</p>
                <button onClick={() => setCurrentPage('shop')} className="mt-8 text-[#8b5e3c] font-black uppercase tracking-widest text-xs hover:underline">Explore Global Shop</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {favoriteLots.map(coffee => (
                  <CoffeeTile 
                    key={coffee.id} 
                    coffee={coffee} 
                    onAddToCart={(c) => setCart(curr => {
                      const existing = curr.find(i => i.id === c.id);
                      if (existing) return curr.map(i => i.id === c.id ? {...i, quantity: i.quantity + 1} : i);
                      return [...curr, {...c, quantity: 1}];
                    })} 
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }
      case 'orders': return <BuyerOrdersPage orders={orders} />;
      case 'cart': return <CartPage items={cart} onUpdateQuantity={(id, delta) => setCart(c => c.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))} onRemove={(id) => setCart(c => c.filter(i => i.id !== id))} onCheckout={handleCheckout} />;
      case 'ai-voice-concierge': return <VoiceConciergePage user={user} onStartVoice={() => setShowVoiceChat(true)} />;
      case 'ai-chat': return <ChatWithEliasPage onOpenVoice={() => setShowVoiceChat(true)} />;
      case 'seller-dashboard': return <SellerDashboard user={user} onAddCoffee={(c) => setAllCoffees([c, ...allCoffees])} myCoffees={allCoffees.filter(c => c.id.startsWith('lot-') || c.id.startsWith('sell-'))} orders={orders} onUpdateOrder={(id, updates) => setOrders(curr => curr.map(o => o.id === id ? {...o, ...updates} : o))} />;
      default: return (
        <div className="p-6 pb-24 max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="flex-1">
                <h1 className="text-5xl font-serif font-bold text-[#3d2b1f] tracking-tight">Direct Trade Shop</h1>
                <p className="text-gray-500 mt-2 text-lg">Greetings, {user.displayName}. Explore rare lots directly from their producers.</p>
              </div>
            </div>
            
            <AdvancedFilterHub 
              filters={filters} 
              setFilters={setFilters} 
              origins={origins} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCoffees.length > 0 ? filteredCoffees.map(coffee => (
              <CoffeeTile 
                key={coffee.id} 
                coffee={coffee} 
                onAddToCart={(c) => setCart(curr => {
                  const existing = curr.find(i => i.id === c.id);
                  if (existing) return curr.map(i => i.id === c.id ? {...i, quantity: i.quantity + 1} : i);
                  return [...curr, {...c, quantity: 1}];
                })} 
                isFavorite={user.favorites.includes(coffee.id)}
                onToggleFavorite={toggleFavorite}
              />
            )) : (
              <div className="col-span-full py-32 text-center">
                <div className="bg-white p-16 rounded-[4rem] border border-gray-100 shadow-sm inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-gray-400 italic text-xl">No artisanal lots match this specific curation criteria.</p>
                  <button 
                    onClick={() => setFilters({
                      search: '',
                      rating: 0,
                      originNodes: [],
                      isRoasted: false,
                      isUnroasted: false,
                      isVolcanic: false,
                      isHighAltitude: false,
                      sort: 'newest'
                    })}
                    className="mt-8 text-[#8b5e3c] font-black uppercase text-[10px] tracking-widest hover:underline"
                  >
                    Reset Filter Nodes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf9]">
      <Navbar user={user} onLogout={() => { setUser(null); setCurrentPage('shop'); }} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      {user && (
        <BottomNav 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} 
          user={user} 
        />
      )}
      {showVoiceChat && <VoiceChatModal onClose={() => setShowVoiceChat(false)} />}
    </div>
  );
}
