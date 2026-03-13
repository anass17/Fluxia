import { useState } from "react";


export default function BookingForm({ tableId, onBack }: { tableId: string; onBack: () => void }) {
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [people, setPeople] = useState(2);

  // Generate Slots: 9am to 12pm (midnight)
  // Each slot 50min + 10min pause = 1 hour cycle
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", 
    "21:00", "22:00", "23:00"
  ];
  
  // Mock reserved slots
  const reservedSlots = ["12:00", "19:00", "20:00"];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-slate-900 mb-2">
        ← Back to Map
      </button>

      <div>
        <h3 className="text-xl font-black text-slate-900">Table #{tableId}</h3>
        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Booking Configuration</p>
      </div>

      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Date</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Time Slots */}
      {date && (
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Available Slots (50min)</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => {
              const isReserved = reservedSlots.includes(time);
              return (
                <button
                  key={time}
                  disabled={isReserved}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2.5 rounded-xl text-[10px] font-black transition-all border
                    ${isReserved ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed" : 
                      selectedTime === time ? "bg-slate-900 border-slate-900 text-white shadow-md" : 
                      "bg-white border-slate-100 text-slate-600 hover:border-slate-300"}
                  `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Number of People */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Guests</label>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setPeople(num)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${people === num ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Special Notes</label>
        <textarea 
          placeholder="e.g. Birthday, window seat preference..."
          className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm min-h-[80px] focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <button className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
        Confirm Reservation
      </button>
    </div>
  );
}