import { type ReservationStatus } from '../../utils/types';


export default function StatusBadge({ status }: { status: ReservationStatus }) {
  const styles: Record<ReservationStatus, string> = {
    Coming: "bg-blue-50 text-blue-600 border-blue-100",
    Ongoing: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Completed: "bg-slate-50 text-slate-600 border-slate-100",
    Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}