export default function ClientRow({ client, fetcher }: { client: any; fetcher: any }) {
  const isBlocked = !client.is_active;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4">
        <div className="font-bold text-slate-800">{client.first_name} {client.last_name}</div>
        <div className="text-xs text-slate-500">{client.email}</div>
      </td>
      <td className="p-4 text-sm text-slate-600">
        {new Date(client.created_at).toLocaleDateString()}
      </td>
      <td className="p-4">
        <span className="bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full text-xs font-bold">
          {client.total_reservations || 0}
        </span>
      </td>
      <td className="p-4 text-right">
        <fetcher.Form method="post" action={`/admin/clients/${client.id}/toggle-status`}>
          <button 
            type="submit"
            className={`text-xs font-bold px-4 cursor-pointer py-1.5 rounded-lg border transition-all ${
              isBlocked ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50" : "border-red-200 text-red-600 hover:bg-red-50"
            }`}
          >
            {isBlocked ? "Unblock" : "Block"}
          </button>
        </fetcher.Form>
      </td>
    </tr>
  );
}