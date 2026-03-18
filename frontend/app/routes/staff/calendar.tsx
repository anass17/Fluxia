import { useState, useMemo } from "react";
import { useFetcher } from "react-router";

export default function CalendarReservations() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const fetcher = useFetcher();

    // Helper to get days in month
    const days = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        
        return { 
        firstDay, 
        totalDays, 
        monthName: selectedDate.toLocaleString('default', { month: 'long' }),
        year 
        };
    }, [selectedDate]);

  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
    // Silent fetch of bookings for this specific date
    fetcher.load(`/api/reservations/date/all?date=${newDate.toISOString().split('T')[0]}`);
  };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            if (direction === 'next') {
            newDate.setMonth(newDate.getMonth() + 1);
            } else {
            newDate.setMonth(newDate.getMonth() - 1);
            }
            return newDate;
        });
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 p-8 bg-slate-50 min-h-screen">
        
            {/* LEFT: The Calendar Grid */}
            <div className="flex-1 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {days.monthName} <span className="text-slate-200">{days.year}</span>
                </h2>
                
                <div className="flex gap-2">
                    <button 
                    onClick={() => navigateMonth('prev')}
                    className="p-3 bg-white hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-100 transition-all active:scale-90"
                    >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button 
                    onClick={() => navigateMonth('next')}
                    className="p-3 bg-white hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-100 transition-all active:scale-90"
                    >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>
                </div>

                {/* ... Grid logic remains the same ... */}
                <div className="grid grid-cols-7 gap-4">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-center text-[10px] font-black uppercase text-slate-400 tracking-widest pb-4">{d}</div>
                ))}
                
                {/* Calendar Cells */}
                {[...Array(days.firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(days.totalDays)].map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate.getDate() === day;
                    return (
                    <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border
                        ${isSelected ? "bg-slate-900 border-slate-900 text-white shadow-xl" : "bg-white border-slate-50 text-slate-600 hover:border-slate-200"}`}
                    >
                        <span className="text-lg font-black">{day}</span>
                    </button>
                    );
                })}
                </div>
            </div>

            

            {/* RIGHT: Date Detail Sidebar */}
            <div className="w-full xl:w-[450px] flex flex-col gap-6">
                <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl flex-1">
                    <div className="mb-8">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Agenda for</p>
                        <h3 className="text-2xl font-black">
                            {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </h3>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                        {fetcher.data?.bookings?.length > 0 ? (
                        fetcher.data.bookings.map((booking: any) => (
                            <div key={booking.id} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xl font-black">{booking.time}</span>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                booking.status === 'Coming' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                                }`}>
                                {booking.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">#{booking.table_number}</div>
                                <span className="text-sm font-medium text-slate-400">{booking.guests} Guests</span>
                            </div>
                            </div>
                        ))
                        ) : (
                        <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[2rem]">
                            <p className="text-slate-500 font-medium italic text-sm">No reservations for this day.</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}