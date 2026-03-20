import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { usersService } from "~/api/users.service";
import ClientCard from "~/components/ui/ClientCard";
import ClientRow from "~/components/ui/ClientRow";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  is_active: boolean;
  total_reservations?: number;
  avatar?: string;
}

export async function loader({ request }: { request: Request }) {
    const response = usersService.getClients(request)

    return response

}


export default function ClientList() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const fetcher = useFetcher();
  const clients : Client[] | undefined = useLoaderData()

  // Filter logic
  const filteredClients = clients?.filter((client) =>
    `${client.first_name} ${client.last_name} ${client.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & View Toggle Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative w-full sm:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search clients by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "table" ? "bg-white shadow-sm text-violet-600" : "text-slate-500"}`}
          >
            <TableIcon />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-white shadow-sm text-violet-600" : "text-slate-500"}`}
          >
            <GridIcon />
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on View Mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients?.map((client) => (
            <ClientCard key={client.id} client={client} fetcher={fetcher} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Client</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Registration</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Reservations</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredClients?.map((client) => (
                <ClientRow key={client.id} client={client} fetcher={fetcher} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const TableIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>
);
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);