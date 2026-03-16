import type { MenuItem } from "~/utils/types";

export default function NutritionModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const nutritionFields = [
    { label: "Calories", val: item.Calories, unit: "kcal" },
    { label: "Total Fat", val: item.FatContent, unit: "g" },
    { label: "Saturated Fat", val: item.SaturatedFatContent, unit: "g" },
    { label: "Cholesterol", val: item.CholesterolContent, unit: "mg" },
    { label: "Sodium", val: item.SodiumContent, unit: "mg" },
    { label: "Total Carbs", val: item.CarbohydrateContent, unit: "g" },
    { label: "Fiber", val: item.FiberContent, unit: "g" },
    { label: "Sugars", val: item.SugarContent, unit: "g" },
    { label: "Protein", val: item.ProteinContent, unit: "g" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-slate-900">{item.Name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nutrition per serving</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Two Column Grid */}
        <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-4">
          {nutritionFields.map((f) => (
            <div key={f.label} className="flex justify-between items-center pb-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-500">{f.label}</span>
              <span className="text-xs font-black text-slate-900">{f.val}{f.unit}</span>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-50/50">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[oklch(49.1%_0.27_292.581)] text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:opacity-90 transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}