import { useState, useEffect } from "react";
import { useFetcher, useLoaderData, Form } from "react-router";
import { usersService } from "~/api/users.service";
import StaffCard from "~/components/ui/StaffCard";
import StaffRow from "~/components/ui/StaffRow";

interface Staff {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  is_active: boolean;
  role: string;
  avatar?: string;
}

export async function loader({ request }: { request: Request }) {
  return await usersService.getStaffs(request);
}

export default function StaffList() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const staff = useLoaderData<Staff[]>();
  const toggleFetcher = useFetcher(); 
  const createFetcher = useFetcher();

  // Close modal when creation is successful
  useEffect(() => {
    if (createFetcher.state === "idle" && createFetcher.data?.success) {
      setIsModalOpen(false);
    }
  }, [createFetcher.state, createFetcher.data]);

  const filteredStaff = staff?.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Row: Search + Create Button + View Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-1 w-full gap-3">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search staff..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <PlusIcon /> <span className="hidden sm:inline">Add Staff</span>
          </button>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setViewMode("table")} className={`p-2 rounded-lg ${viewMode === "table" ? "bg-white text-violet-600 shadow-sm" : "text-slate-500"}`}><TableIcon /></button>
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-white text-violet-600 shadow-sm" : "text-slate-500"}`}><GridIcon /></button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff?.map((s) => <StaffCard key={s.id} staff={s} fetcher={toggleFetcher} />)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStaff?.map((s) => <StaffRow key={s.id} staff={s} fetcher={toggleFetcher} />)}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Add New Staff</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><CloseIcon /></button>
            </div>
            
            <createFetcher.Form method="post" action="/admin/staff/create" className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">First Name</label>
                        <input name="first_name" type="text" placeholder="Adam" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-violet-500 outline-none" />
                        {createFetcher.data?.errors?.first_name && (
                            <p className="text-red-500 text-xs mt-1">{createFetcher.data.errors.first_name[0]}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Last Name</label>
                        <input name="last_name" type="text" placeholder="Ali" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-violet-500 outline-none" />
                        {createFetcher.data?.errors?.last_name && (
                            <p className="text-red-500 text-xs mt-1">{createFetcher.data.errors.last_name[0]}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
                    <input name="email" type="email" placeholder="staff@fluxia.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-violet-500 outline-none" />
                    {createFetcher.data?.errors?.email && (
                        <p className="text-red-500 text-xs mt-1">{createFetcher.data.errors.email[0]}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Password</label>
                    <input name="password" type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-violet-500 outline-none" />
                    {createFetcher.data?.errors?.password && (
                        <p className="text-red-500 text-xs mt-1">{createFetcher.data.errors.password[0]}</p>
                    )}
                </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createFetcher.state !== "idle"}
                  className="flex-1 py-3 bg-violet-600 text-white text-sm font-bold rounded-2xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all disabled:opacity-50"
                >
                  {createFetcher.state !== "idle" ? "Creating..." : "Create Account"}
                </button>
              </div>
            </createFetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}

// Icons
const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const TableIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>;
const GridIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;