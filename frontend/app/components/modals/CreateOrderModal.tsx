import { useMemo, useState } from "react";

export default function CreateOrderModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'form' | 'success'>('form');
  const [reservationId, setReservationId] = useState("");
  const [resVerified, setResVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState([{ id: Date.now(), plateId: "", qty: 1, price: 15 }]); // Mock price for demo

  const subtotal = useMemo(() => items.reduce((acc, curr) => acc + (curr.qty * curr.price), 0), [items]);

  const addItem = () => setItems([...items, { id: Date.now(), plateId: "", qty: 1, price: 12 }]);
  
  const handleVerify = () => {
    if (!reservationId) return;
    setResVerified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[3.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {view === 'success' ? (
          <div className="p-16 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-3">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Order Confirmed!</h2>
            <p className="text-slate-500 font-medium mb-10">Table 08 has been updated and the kitchen is notified.</p>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-5 bg-slate-100 rounded-3xl font-black text-sm text-slate-600 hover:bg-slate-200 transition-all">Close</button>
              <button onClick={() => setView('form')} className="flex-1 py-5 bg-indigo-600 rounded-3xl font-black text-sm text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">New Entry</button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">NEW ORDER</h2>
              <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Reservation Lookup */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">1. Verification</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter Reservation #" 
                    className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={reservationId}
                    onChange={(e) => setReservationId(e.target.value)}
                  />
                  <button type="button" onClick={handleVerify} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs active:scale-95 transition-all">VERIFY</button>
                </div>
                {resVerified && (
                  <div className="p-5 bg-indigo-50 border-2 border-indigo-100 rounded-[2rem] flex justify-between items-center animate-in slide-in-from-top-2">
                    <span className="text-indigo-600 font-black text-xs uppercase tracking-tight">Table 12 • 4 Guests</span>
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                  </div>
                )}
              </div>

              {/* Items List */}
              {resVerified && (
                <div className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in duration-500">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">2. Order Details</label>
                    <button type="button" onClick={addItem} className="text-xs font-black text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all">+ Add Item</button>
                  </div>

                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div key={item.id} className="flex gap-3 group">
                        <select className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-indigo-500">
                          <option>Select Plate...</option>
                          <option>Pasta Carbonara</option>
                          <option>Grilled Salmon</option>
                        </select>
                        <input type="number" defaultValue={1} className="w-24 bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-black text-center focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Estimated Total</p>
                      <p className="text-3xl font-black tracking-tighter">${subtotal.toFixed(2)}</p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? "SENDING..." : "CONFIRM ORDER"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}