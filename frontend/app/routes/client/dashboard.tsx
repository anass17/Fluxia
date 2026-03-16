import React from 'react';

// Icons tailored for the client experience
const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export default function ClientStatsDashboard() {
  // Mock client data
  const clientStats = [
    { label: "Loyalty Points", value: "850", icon: <StarIcon />, color: "text-amber-500", desc: "50 points to Gold level" },
    { label: "Total Visits", value: "14", icon: <CalendarIcon />, color: "text-blue-500", desc: "3 visits this month" },
    { label: "Total Spent", value: "$1,240", icon: <WalletIcon />, color: "text-emerald-500", desc: "Lifetime expenditure" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Client Personal Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clientStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2. Upcoming Reservation (Featured Card) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold mb-2">Next Visit</h4>
            <p className="text-sm text-slate-400 mb-6">We're looking forward to seeing you!</p>
            
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Table #12</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase">Confirmed</span>
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-300">Saturday, Mar 21</p>
                  <p className="text-2xl font-black">19:30 PM</p>
                </div>
                <div className="ml-auto flex -space-x-2">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95">
            Modify Reservation
          </button>
        </div>

        {/* 3. Favorite Items / Habits */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          <h4 className="text-slate-900 font-black mb-6">Frequently Ordered</h4>
          <div className="space-y-4">
            {[
              { name: "Truffle Ribeye Steak", count: 8, price: "$42.00" },
              { name: "Vintage Red Wine (Glass)", count: 5, price: "$14.00" },
              { name: "Classic Caesar Salad", count: 3, price: "$12.00" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-xs font-black text-slate-400 shadow-sm">
                    {item.count}x
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{item.price}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:border-slate-900 hover:text-slate-900 transition-all">
            View Full Menu
          </button>
        </div>

      </div>
    </div>
  );
}