export default function StaffRow({ staff, fetcher, upgradeFetcher }: { staff: any; fetcher: any, upgradeFetcher: any }) {
  const isSubmitting = fetcher.state !== "idle" && fetcher.formData?.get("id") === staff.id;
  const active = staff.is_active;

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img 
            src={staff.avatar || `https://ui-avatars.com/api/?name=${staff.first_name}+${staff.last_name}`} 
            className="w-10 h-10 rounded-xl object-cover shadow-sm"
          />
          <div>
            <div className="font-bold text-slate-800">{staff.first_name} {staff.last_name}</div>
            <div className="text-xs text-slate-400">{staff.email}</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm text-slate-600 font-medium">
          {new Date(staff.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </td>
      
      {/* ACTIONS COLUMN */}
      <td className="p-4">
        <div className="flex items-center justify-end gap-3">
          
          {/* DOWNGRADE BUTTON (RED STYLE) */}
          <fetcher.Form method="put" action={`/owner/user/${staff.id}/upgrade`}>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="text-[10px] uppercase tracking-[0.15em] font-black px-4 py-2 rounded-md border border-green-100 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Upgrade"}
            </button>
          </fetcher.Form>

          {/* STATUS TOGGLE (EXISTING) */}
          <fetcher.Form method="post" action={`/admin/user/${staff.id}/toggle-status`}>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`text-[10px] uppercase tracking-[0.15em] font-black px-4 py-2 rounded-md border transition-all active:scale-95 ${
                active 
                  ? "border-slate-200 text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800" 
                  : "border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white"
              }`}
            >
              {isSubmitting ? "..." : (active ? "Deactivate" : "Activate")}
            </button>
            <input type="hidden" name="toggle_status" value={!active ? "Unblock" : "Block"} />
          </fetcher.Form>

        </div>
      </td>
    </tr>
  );
}