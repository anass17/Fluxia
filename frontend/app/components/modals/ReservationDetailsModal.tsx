import { type Reservation } from '../../utils/types';
import { OrdersIcon } from '../../utils/icons';



export default function ReservationDetailsModal({ reservation, onClose }: { reservation: Reservation, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reservation Details</p>
              <h2 className="text-3xl font-black text-slate-900">RES-{reservation.id.toString().padStart(4, '0')}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {!reservation.hasOrder ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <OrdersIcon />
              </div>
              <h3 className="font-bold text-slate-800">No Order Placed Yet</h3>
              <p className="text-sm text-slate-500 max-w-[240px] mt-1">The guest has reserved the table, but the kitchen hasn't received an order.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Items Mockup */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Items Ordered</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">2x Signature Steakhouse Burger</span>
                  <span className="font-bold text-slate-900">$48.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">1x Truffle Fries (Large)</span>
                  <span className="font-bold text-slate-900">$12.00</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-500 font-medium">Subtotal</span>
                  <span className="text-sm font-bold text-slate-700">$60.00</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-sm text-slate-500 font-medium">Tax & Service Fee</span>
                  <span className="text-sm font-bold text-slate-700">$25.00</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-4 rounded-2xl text-white">
                  <span className="font-bold">Total Amount Paid</span>
                  <span className="text-xl font-black">$255</span>
                </div>
              </div>
            </div>
          )}

          <button className="w-full mt-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-all">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}