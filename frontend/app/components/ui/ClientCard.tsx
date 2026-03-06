export default function ClientCard({ client, fetcher }: { client: any; fetcher: any }) {
  const isBlocked = !client.is_active;
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-violet-100 border-4 border-white shadow-sm mb-4 overflow-hidden">
          <img 
            src={client.avatar || `https://ui-avatars.com/api/?name=${client.first_name}+${client.last_name}&background=ddd&color=666`} 
            alt="Client" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-slate-800">{client.first_name} {client.last_name}</h3>
        <p className="text-sm text-slate-500 mb-4">{client.email}</p>
        
        <div className="w-full grid grid-cols-2 gap-2 mb-6 text-xs text-slate-600">
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="font-bold text-slate-400 uppercase text-[9px]">Joined</p>
            <p>{new Date(client.created_at).toLocaleDateString()}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="font-bold text-slate-400 uppercase text-[9px]">Bookings</p>
            <p>{client.total_reservations || 0} total</p>
          </div>
        </div>

        <fetcher.Form method="post" action={`/admin/clients/${client.id}/toggle-status`}>
          <button 
            type="submit"
            className={`w-full py-2 px-5 rounded-xl cursor-pointer text-sm font-bold transition-all ${
              isBlocked ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
          >
            {isBlocked ? "Unblock" : "Block"}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}