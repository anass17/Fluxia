import React from 'react';

const OwnerDashboard = () => {
  // Mock Stats - These would come from your Loader
  const stats = [
    { 
        label: 'Total Clients', 
        value: '1,284', 
        grow: '+12%', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 
    },
    { 
        label: 'Active Staff', 
        value: '24', 
        grow: '', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> 
    },
    { 
        label: 'Admins', 
        value: '3', 
        grow: '', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 
    },
    { 
        label: 'Reservations', 
        value: '452', 
        grow: '+8%', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 
    },
    ];

  return (
    <div className="space-y-10 pb-10">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back. Here is what's happening with Fluxia today.</p>
        </div>
      </header>

      {/* 2. CORE STATISTICS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                {/* Icon Container with main Violet color */}
                <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
                {stat.icon}
                </div>
                
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.grow.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                {stat.grow}
                </span>
            </div>
            
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
        ))}
        </section>

      {/* 3. FINANCIAL & PERFORMANCE SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
                <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Flow</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Weekly Performance</p>
                </div>
                <select className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                </select>
            </div>

            <div className="relative">
                {/* Y-AXIS GUIDE LINES */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 25, 50, 75, 100].map((tick) => (
                    <div key={tick} className="flex items-center gap-4 w-full">
                    <span className="text-[10px] font-bold text-slate-300 w-8">{tick}%</span>
                    <div className="h-px bg-slate-100 flex-1" />
                    </div>
                ))}
                </div>

                {/* CHART AREA */}
                <div className="h-64 mt-2 flex items-end justify-between px-10 relative z-10">
                {[
                    { day: 'Mon', val: 40, amt: '$2,400' },
                    { day: 'Tue', val: 70, amt: '$4,100' },
                    { day: 'Wed', val: 20, amt: '$1,200' },
                    { day: 'Thu', val: 95, amt: '$5,800' },
                    { day: 'Fri', val: 65, amt: '$3,900' },
                    { day: 'Sat', val: 85, amt: '$5,100' },
                    { day: 'Sun', val: 50, amt: '$3,000' }
                ].map((data, i) => (
                    <div key={i} className="flex flex-col items-center group relative h-full justify-end w-full">
                    
                    {/* TOOLTIP ON HOVER */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        {data.amt}
                    </div>

                    {/* THE BAR */}
                    <div 
                        style={{ height: `${data.val}%` }} 
                        className="w-10 bg-violet-100 rounded-t-2xl group-hover:bg-violet-600 group-hover:shadow-xl group-hover:shadow-violet-200 transition-all duration-300 cursor-pointer relative"
                    >
                        {/* Inner gradient for a "glass" look */}
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent rounded-t-2xl" />
                    </div>

                    {/* X-AXIS LABEL */}
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-4 group-hover:text-violet-600 transition-colors">
                        {data.day}
                    </span>
                    </div>
                ))}
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-6">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Earnings</p>
                    <p className="text-xl font-black text-slate-900">$25,500.00</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Per Day</p>
                    <p className="text-xl font-black text-slate-900">$3,642.00</p>
                </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">+14.2% VS LAST WEEK</span>
                </div>
            </div>
        </div>

        {/* Table Quick Glance */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-300">
            {/* Subtle decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-black tracking-tight">Daily Performance</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Mar 20, 2026</p>
                </div>
                </div>

                {/* Table Detail Section */}
                <div className="flex-1">
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b border-slate-800">
                        <th className="pb-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Metric</th>
                        <th className="pb-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Today's Data</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                    <tr>
                        <td className="py-4">
                        <p className="text-sm font-bold text-slate-200">Today's Visits</p>
                        <p className="text-[10px] text-slate-500 font-medium">Total foot traffic recorded</p>
                        </td>
                        <td className="py-4 text-right">
                        <p className="text-lg font-black text-white">342</p>
                        <p className="text-[9px] text-emerald-400 font-bold">+14% vs avg</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4">
                        <p className="text-sm font-bold text-slate-200">Table Occupation</p>
                        <p className="text-[10px] text-slate-500 font-medium">Avg. time per table</p>
                        </td>
                        <td className="py-4 text-right">
                        <p className="text-lg font-black text-white">52 min</p>
                        <p className="text-[9px] text-violet-400 font-bold">Optimal flow</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4">
                        <p className="text-sm font-bold text-slate-200">Peak Hour</p>
                        <p className="text-[10px] text-slate-500 font-medium">Highest volume period</p>
                        </td>
                        <td className="py-4 text-right">
                        <p className="text-lg font-black text-white">19:30</p>
                        <p className="text-[9px] text-slate-500 font-bold">88% Capacity</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-end">
                <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs hover:bg-violet-500 hover:text-white transition-all active:scale-95 shadow-lg">
                    Full Analytics
                </button>
                </div>
            </div>
            </div>
      </section>

      {/* 4. RELEVANT ACTIONS & ACTIVITY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Staff Actions */}
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">System Logs</h3>
          <div className="space-y-4">
            {[
              { user: 'Admin Sarah', action: 'Updated Menu Prices', time: '2h ago' },
              { user: 'Chef Marco', action: 'Modified Ingredient (Pasta)', time: '4h ago' },
              { user: 'Manager Alex', action: 'Added 2 New Staff', time: 'Yesterday' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                    {log.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{log.user}</p>
                    <p className="text-xs text-slate-500 font-medium">{log.action}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Tiles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-white p-7 rounded-[2.5rem] border border-violet-100 flex flex-col justify-between hover:shadow-xl hover:shadow-violet-200/50 hover:-translate-y-1 transition-all cursor-pointer group h-full">
  
            {/* Abstract Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-200/30 rounded-full blur-2xl group-hover:bg-violet-300/40 transition-colors" />

            <div className="relative z-10">
                <div className="flex justify-between items-start">
                {/* Trending Icon with Soft Glow */}
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-violet-600 group-hover:rotate-12 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </div>

                {/* Volume Badge */}
                <div className="bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg shadow-violet-200 flex flex-col items-center">
                    <span className="leading-none">842</span>
                    <span className="text-[7px] uppercase mt-0.5 opacity-80">Sold</span>
                </div>
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em] mb-1">
                Most Ordered Dish
                </p>
                <h4 className="text-lg font-black text-violet-900 leading-tight">
                Pesto Pasta
                </h4>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white p-7 rounded-[2.5rem] border border-emerald-100 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-1 transition-all cursor-pointer group h-full">
  
            {/* Abstract Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl group-hover:bg-emerald-300/40 transition-colors" />

            <div className="relative z-10">
                <div className="flex justify-between items-start">
                {/* Heart/Loyalty Icon with Soft Glow */}
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>

                {/* Retention Rate Badge */}
                <div className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg shadow-emerald-200">
                    Active
                </div>
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">
                Customer Retention
                </p>
                <h4 className="text-lg font-black text-emerald-900 leading-tight">
                Returning Clients
                </h4>
                
                <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-black text-emerald-900">
                    64%
                </p>
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-emerald-100 rounded-lg shadow-sm">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-[9px] font-black text-emerald-600">High</span>
                </div>
                </div>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default OwnerDashboard;