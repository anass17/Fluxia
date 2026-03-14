import { type Reservation } from '../../utils/types';
import StatusBadge from '../badges/StatusBadge';


type props = {
    reservations: Reservation[]
    setSelectedRes: (p: any) => void
}


export default function ReservationsTable({reservations, setSelectedRes}: props) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="pl-8 pr-4 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">ID</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Time</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">People</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                {reservations.map((res) => {
                    const dateObj = new Date(res.date);
                    
                    return (
                    <tr key={res.id} className="group hover:bg-slate-50/50 transition-colors">
                        {/* ID Column */}
                        <td className="pl-8 pr-4 py-6">
                        <span className="font-bold text-slate-800 text-sm tracking-tight">{res.id}</span>
                        </td>

                        {/* Date Column */}
                        <td className="px-6 py-6">
                        <span className="text-sm font-bold text-slate-600">
                            {dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        </td>

                        {/* Time Column */}
                        <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-sm font-black text-slate-900">
                                {res.time.padStart(5, "0")}
                            </span>
                        </div>
                        </td>

                        {/* People Number Column */}
                        <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-700">{res.guests}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        </td>

                        {/* Status Column */}
                        <td className="px-6 py-6">
                            <StatusBadge status={res.status} />
                        </td>

                        {/* Details Action Column */}
                        <td className="px-8 py-6 text-right">
                        <button 
                            onClick={() => setSelectedRes(res)}
                            className="inline-flex items-center justify-center p-2.5 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                        >
                            <span className="text-xs font-bold px-2">Details</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            
            {reservations.length === 0 && (
                <div className="py-20 text-center border-t border-slate-50">
                <p className="text-slate-400 font-medium tracking-tight italic">No reservations match your current filters.</p>
                </div>
            )}
            </div>
    )
}