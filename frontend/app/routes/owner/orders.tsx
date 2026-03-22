import { useState } from "react";
import CreateOrderModal from "~/components/modals/CreateOrderModal";

const currentOrders = [
  {
    id: 101,
    table_id: "08",
    reservation_id: "RES-9921",
    total_price: 84.50,
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 15.00 },
      { name: "Classic Burger", quantity: 1, price: 18.50 },
      { name: "Iced Tea", quantity: 3, price: 12.00 }
    ]
  },
  {
    id: 102,
    table_id: "14",
    reservation_id: "RES-8842",
    total_price: 42.00,
    items: [
      { name: "Pasta Carbonara", quantity: 1, price: 22.00 },
      { name: "Red Wine Glass", quantity: 2, price: 10.00 }
    ]
  },
  {
    id: 103,
    table_id: "03",
    reservation_id: "RES-7710",
    total_price: 115.00,
    items: [
      { name: "Grilled Salmon", quantity: 3, price: 30.00 },
      { name: "Caesar Salad", quantity: 2, price: 12.50 }
    ]
  }
];

const pastOrders = [
  {
    id: 98,
    reservation_id: "9910",
    total_price: 65.20,
    items: [{ name: "Steak Frites", quantity: 1, price: 45.00 }, { name: "Coke", quantity: 2, price: 10.10 }]
  },
  {
    id: 97,
    reservation_id: "9855",
    total_price: 28.00,
    items: [{ name: "Club Sandwich", quantity: 2, price: 14.00 }]
  },
  {
    id: 96,
    reservation_id: "9840",
    total_price: 142.75,
    items: [{ name: "Family Platter", quantity: 1, price: 120.00 }, { name: "Large Water", quantity: 3, price: 7.50 }]
  }
];


export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 font-sans">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Kitchen Display</h1>
          <p className="text-slate-500 font-medium">Manage active and past orders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
          New Order
        </button>
      </div>

      {/* Active Orders Grid */}
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6">Active Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOrders.map((order: any) => (
            <div key={order.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                    Table {order.table_id}
                  </div>
                  <p className="text-xl font-black text-slate-900">${order.total_price}</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-slate-50 pb-2">
                      <span className="text-slate-600 font-medium">
                        <span className="text-indigo-600 font-black mr-2">{item.quantity}x</span> 
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all group">
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                Order Ready
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Orders Table */}
      <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Order History</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input type="text" placeholder="Search ID..." className="pl-11 pr-4 py-3 rounded-xl border-none ring-1 ring-slate-200 w-full text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all bg-white" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                <th className="p-4">Date</th>
                <th className="p-4">Reservation</th>
                <th className="p-4">Total Price</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pastOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-500">Mar 22, 12:45</td>
                  <td className="p-4 text-sm font-black text-slate-900">#RES-{order.reservation_id}</td>
                  <td className="p-4 text-sm font-black text-indigo-600">${order.total_price}</td>
                  <td className="p-4 text-right">
                    <button className="text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-tighter">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && <CreateOrderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}