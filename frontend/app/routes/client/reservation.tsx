import { useState, useMemo } from "react";
import { SearchIcon, PlusIcon, ChevronDownIcon } from '../../utils/icons';
import { type ReservationStatus, type Reservation } from '../../utils/types';
import ReservationDetailsModal from "~/components/modals/ReservationDetailsModal";


export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  // Initial Data
  const initialReservations: Reservation[] = [
    { id: "RES-9901", dateTime: "2026-10-24T19:30:00", price: 124.50, status: "Coming", hasOrder: false },
    { id: "RES-8842", dateTime: "2026-10-22T13:00:00", price: 85.00, status: "Ongoing", hasOrder: true },
    { id: "RES-7721", dateTime: "2026-10-20T20:00:00", price: 210.00, status: "Completed", hasOrder: true },
    { id: "RES-6610", dateTime: "2026-10-18T18:00:00", price: 45.00, status: "Cancelled", hasOrder: false },
  ];

  // Logic for Search, Filter, and Sort
  const processedReservations = useMemo(() => {
    return initialReservations
      .filter((res) => {
        const matchesSearch = res.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || res.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "date") return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
        if (sortBy === "price") return b.price - a.price;
        return 0;
      });
  }, [searchTerm, statusFilter, sortBy]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reservations</h1>
          <p className="text-slate-500 font-medium">History and guest booking logs</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
          <PlusIcon />
          Book New Reservation
        </button>
      </div>

      {/* Control Bar: Search, Sort, and Status Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col xl:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full xl:w-80">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
          {["All", "Coming", "Ongoing", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === status 
                ? "bg-slate-900 text-white shadow-md" 
                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="xl:ml-auto flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase text-slate-400">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="date">Latest Date</option>
            <option value="price">Highest Price</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table */}
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
            {processedReservations.map((res) => (
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
        
        {processedReservations.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No reservations found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedRes && (
        <ReservationDetailsModal 
          reservation={selectedRes} 
          onClose={() => setSelectedRes(null)} 
        />
      )}
    </div>
  );
}


function StatusBadge({ status }: { status: ReservationStatus }) {
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