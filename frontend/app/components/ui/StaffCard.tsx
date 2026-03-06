export default function StaffCard({ staff, fetcher }: { staff: any; fetcher: any }) {
  const isSubmitting = fetcher.state !== "idle" && fetcher.formData?.get("id") === staff.id;
  const active = staff.is_active;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col items-center">
        {/* Avatar with Status Ring */}
        <div className="relative mb-4">
          <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm`}>
            <img 
              src={staff.avatar || `https://ui-avatars.com/api/?name=${staff.first_name}+${staff.last_name}&background=6366f1&color=fff`} 
              alt="Staff" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
        </div>

        <h3 className="font-bold text-slate-800 text-lg leading-tight">
          {staff.first_name} {staff.last_name}
        </h3>
        <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">{staff.role || "Team Member"}</p>
        <p className="text-sm text-slate-400 mb-6">{staff.email}</p>

        {/* Action Button */}
        <fetcher.Form method="post" action={`/admin/user/${staff.id}/toggle-status`} className="w-full">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              active 
                ? "bg-slate-50 text-red-500 hover:bg-red-50" 
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              active ? "Deactivate" : "Activate"
            )}
          </button>
          <input type="hidden" name="toggle_status" value={!active ? "Unblock" : "Block"} />
        </fetcher.Form>
      </div>
    </div>
  );
}