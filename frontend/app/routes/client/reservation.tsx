import { useState, useMemo } from "react";
import { SearchIcon, PlusIcon, ChevronDownIcon } from '../../utils/icons';
import { type ReservationStatus, type Reservation } from '../../utils/types';
import ReservationDetailsModal from "~/components/modals/ReservationDetailsModal";
import NewReservationModal from "~/components/modals/NewReservationModal";
import ReservationsTable from "~/components/tables/ReservationsTable";


export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial Data
  const initialReservations: Reservation[] = [
    { id: "RES-9901", date: "2026-10-24", time: "11:00", guests: 1, status: "Coming", hasOrder: false },
    { id: "RES-8842", date: "2026-10-22", time: "12:00", guests: 3, status: "Ongoing", hasOrder: true },
    { id: "RES-7721", date: "2026-10-20", time: "10:00", guests: 2, status: "Completed", hasOrder: true },
    { id: "RES-6610", date: "2026-10-18", time: "9:00", guests: 4, status: "Cancelled", hasOrder: false },
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
        if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
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
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
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
      <ReservationsTable reservations={processedReservations} setSelectedRes={setSelectedRes} />

      {selectedRes && (
        <ReservationDetailsModal 
          reservation={selectedRes} 
          onClose={() => setSelectedRes(null)} 
        />
      )}

      {isModalOpen && (
        <NewReservationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}