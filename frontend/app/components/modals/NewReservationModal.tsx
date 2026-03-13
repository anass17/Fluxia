import { useState, useMemo } from "react";
import {type TablePosition} from '../../utils/types'
import BookingForm from "../forms/BookingForm";


export default function NewReservationModal({ onClose }: { onClose: () => void }) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [step, setStep] = useState<'map' | 'form'>('map');
  
  // Example coordinate object - this can be passed as a prop or fetched
  const tableLayout: TablePosition[] = [
    { id: "1", x: 15, y: 15, width: 60, height: 60 },
    { id: "2", x: 45, y: 15, width: 60, height: 60 },
    { id: "3", x: 75, y: 15, width: 60, height: 60 },
    { id: "4", x: 15, y: 60, width: 60, height: 60 },
    { id: "5", x: 45, y: 60, width: 60, height: 60 },
    { id: "6", x: 75, y: 60, width: 60, height: 60 },
  ];

  const handleTableClick = (id: string) => {
    setSelectedTable(id);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl rounded-[1rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh]">
        
        {/* Left Side: The Restaurant Map */}
        <div className="flex-1 bg-slate-50 p-8 flex flex-col border-r border-slate-100">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">Select a Table</h2>
            <p className="text-sm text-slate-500">Click a table on the floor plan to begin</p>
          </div>

          <div className="flex-1 relative bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-inner overflow-hidden">
            {/* Table Mapping Logic */}
            {tableLayout.map((table) => (
              <button
                key={table.id}
                onClick={() => handleTableClick(table.id)}
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                  width: `${table.width}px`,
                  height: `${table.height}px`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 transition-all flex items-center justify-center font-bold text-xs
                  ${selectedTable === table.id 
                    ? "bg-slate-900 border-slate-900 text-white scale-110 shadow-lg" 
                    : "bg-white border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 hover:scale-105"
                  }`}
              >
                #{table.id}
              </button>
            ))}

            {/* Entrance Representation */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-300 rounded-t-full flex items-center justify-center">
              <span className="text-[8px] uppercase font-black text-slate-500 mt-[-16px]">Entrance</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Booking Form */}
        <div className="w-full md:w-[400px] bg-white p-8 overflow-y-auto custom-scrollbar">
          {step === 'map' ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>
              </div>
              <p className="text-sm font-medium">Please select a table to <br/> provide booking details.</p>
            </div>
          ) : (
            <BookingForm tableId={selectedTable!} onBack={() => setStep('map')} />
          )}
        </div>
      </div>
    </div>
  );
}