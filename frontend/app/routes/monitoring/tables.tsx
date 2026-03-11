import { useState, useRef, useEffect, useMemo } from "react";

type TableStatus = "free" | "occupied" | "need cleaning" | "awaiting";

interface Table {
  id: string;
  number: number;
  status: TableStatus;
  occupationTime: string;
  estimatedWait?: string;
}

export default function TableMonitoring() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frame, setFrame] = useState<string>("");
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/vision");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFrame(`data:image/jpeg;base64,${data.image}`);
      setTables(data.tables);
    };

    return () => socket.close();
  }, []);


  const stats = useMemo(() => {
    const counts = { free: 0, occupied: 0, "need cleaning": 0, awaiting: 0 };
    
    tables.forEach((t: Table) => {
      counts[t.status]++;
    });

    // Vertical alert logic: filter for specific states requiring action
    const actions = tables.filter(t => t.status === "need cleaning" || t.status === "awaiting");

    return { counts, actions };
  }, [tables]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      
        {/* PART 1: Camera Vision Feed */}
        <div className="flex-1 bg-black rounded-3xl overflow-hidden relative shadow-2xl border border-slate-800 group">
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">
              Live Feed - AI Active
            </span>
          </div>

          {/* The Actual Video Element */}
          <div className="flex-1 bg-black rounded-3xl h-full overflow-hidden relative">
            {frame ? (
              <img src={frame} className="w-full h-full object-contain" alt="AI Feed" />
            ) : (
              <>
                <div className="flex items-end justify-center h-full text-white py-5">Connecting...</div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-900/50">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 animate-pulse">
                    <path d="M2 2l20 20M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-widest opacity-50">Searching for Camera...</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PART 2: Tables State Monitoring */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">Table Overview</h2>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
              {tables.length} Total
            </span>
          </div>

          <div className="space-y-4">
            {tables.map((table) => (
              <TableCard key={table.id} table={table} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Summary Statistics */}
        <div className="flex-1 flex flex-col justify-center md:border-r border-slate-800 pr-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Operations Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatHex label="Available" val={stats.counts.free} color="text-emerald-400" />
            <StatHex label="Active" val={stats.counts.occupied} color="text-blue-400" />
            <StatHex label="To Clean" val={stats.counts["need cleaning"]} color="text-amber-400" />
            <StatHex label="Awaiting" val={stats.counts.awaiting} color="text-violet-400" />
          </div>
        </div>

        {/* Right: Vertical Alerts List */}
        <div className="w-full flex flex-col">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            Action Required
          </h3>
          <div className="pr-2 custom-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-3">
            {stats.actions.length > 0 ? (
              stats.actions.map(t => (
                <div key={t.id} className="bg-white/5 border border-white/10 p-3 rounded-xl flex justify-between items-center transition-colors hover:bg-white/10">
                   <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Table</p>
                      <p className="text-sm font-black text-white">#{t.id}</p>
                   </div>
                   <div className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                     t.status === 'need cleaning' ? 'bg-amber-500/20 text-amber-400' : 'bg-violet-500/20 text-violet-400'
                   }`}>
                     {t.status}
                   </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-4">All tables cleared.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatHex({ label, val, color }: { label: string, val: string | number, color: string }) {
  return (
    <div className="flex flex-col min-w-[80px]">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      <span className={`text-2xl font-black ${color}`}>{val}</span>
    </div>
  );
}

function TableCard({ table }: { table: Table }) {
  const statusColors: Record<TableStatus, string> = {
    "free": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "occupied": "bg-blue-50 text-blue-600 border-blue-100",
    "need cleaning": "bg-amber-50 text-amber-600 border-amber-100",
    "awaiting": "bg-violet-50 text-violet-600 border-violet-100"
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Table</span>
          <h3 className="text-2xl font-black text-slate-800 leading-none">#{table.id}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[table.status]}`}>
          {table.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 p-2 rounded-xl">
          <p className="text-[9px] font-bold text-slate-400 uppercase">Occupation</p>
          <p className="text-sm font-bold text-slate-700">{table.occupationTime || 0} s</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl">
          <p className="text-[9px] font-bold text-slate-400 uppercase">Wait Est.</p>
          <p className="text-sm font-bold text-violet-600">{table.estimatedWait || 0}</p>
        </div>
      </div>

      <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
        View Order Details
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}