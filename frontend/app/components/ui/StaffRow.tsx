export default function StaffRow({ staff, fetcher }: { staff: any; fetcher: any }) {
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
      <td className="p-4 text-right">
        <fetcher.Form method="post" action={`/admin/user/${staff.id}/toggle-status`}>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all ${
              active 
                ? "border-slate-200 text-slate-600 hover:bg-white hover:text-red-500 hover:border-red-200" 
                : "border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            {isSubmitting ? "..." : (active ? "Deactivate" : "Activate")}
          </button>
          <input type="hidden" name="toggle_status" value={!active ? "Unblock" : "Block"} />
        </fetcher.Form>
      </td>
    </tr>
  );
}