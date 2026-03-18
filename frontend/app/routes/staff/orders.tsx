import React, { useState, useEffect } from 'react';

const PrepOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-7721",
      table: "Table 4",
      items: ["Pesto Pasta", "Margherita Pizza"],
      totalItems: 4,
      minutesLeft: 12,
      progress: 40,
      priority: "Normal"
    },
    {
      id: "ORD-7725",
      table: "Table 12",
      items: ["Grilled Salmon", "Garden Salad"],
      totalItems: 2,
      minutesLeft: 3,
      progress: 85,
      priority: "High"
    },
    {
      id: "ORD-7710",
      table: "Delivery",
      items: ["Family Feast Bucket"],
      totalItems: 8,
      minutesLeft: -2,
      progress: 100,
      priority: "Urgent"
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Kitchen Queue</h1>
          <p className="text-sm text-slate-500 font-medium">Currently preparing {orders.length} active orders</p>
        </div>
        <div className="flex gap-3">
           <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-600">
             Avg. Prep: <span className="text-violet-600">14m</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => {
          const isOverdue = order.minutesLeft < 0;
          
          return (
            <div key={order.id} className={`bg-white border-2 rounded-[2rem] shadow-sm transition-all ${isOverdue ? 'border-red-100 bg-red-50/10' : 'border-slate-100'}`}>
              
              <div className="p-6">
                {/* Header: ID & Timer */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Order ID</span>
                    <h3 className="text-sm font-black text-slate-900">{order.id} — {order.table}</h3>
                  </div>
                  
                  {/* Countdown Circle */}
                  <div className="relative flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                      <circle 
                        cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={150}
                        strokeDashoffset={150 - (150 * order.progress) / 100}
                        className={`${isOverdue ? 'text-red-500' : 'text-violet-600'} transition-all duration-1000`} 
                      />
                    </svg>
                    <span className={`absolute text-xs font-black ${isOverdue ? 'text-red-600 animate-pulse' : 'text-slate-700'}`}>
                      {isOverdue ? '!' : `${order.minutesLeft}m`}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="space-y-3 mb-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <p className="text-sm font-bold text-slate-700">{item}</p>
                    </div>
                  ))}
                  {order.totalItems > 2 && (
                    <p className="text-xs text-slate-400 font-medium pl-4">+{order.totalItems - 2} more items...</p>
                  )}
                </div>

              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-[2rem] flex gap-3">
                <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Delay
                </button>
                <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Mark as Ready
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrepOrders;