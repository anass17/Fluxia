import { type Reservation } from '../../utils/types';
import StatusBadge from '../badges/StatusBadge';


type props = {
    reservations: Reservation[]
    setSelectedRes: (p: any) => void
}


export default function ReservationsTable({reservations, setSelectedRes}: props) {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Reservation ID</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date & Time</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Final Price</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reservations.map((res) => (
              <tr key={res.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 font-bold text-slate-800">{res.id}</td>
                <td className="px-8 py-6 text-sm text-slate-500">
                  {new Date(res.dateTime).toLocaleDateString()} at {new Date(res.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-8 py-6 font-black text-slate-900">${res.price.toFixed(2)}</td>
                <td className="px-8 py-6">
                  <StatusBadge status={res.status} />
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => setSelectedRes(res)}
                    className="p-2.5 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 ml-auto"
                  >
                    <span className="text-xs font-bold px-1">Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {reservations.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No reservations found matching your criteria.</p>
          </div>
        )}
      </div>
    )
}