import { useState } from "react";
import { Link, Outlet, useLocation, useLoaderData } from "react-router";
import { LogoutButton } from "~/components/ui/LogoutButton";
import { requireRole } from "~/services/auth.server";
import { 
  BellIcon, 
  CalendarIcon, 
  ChevronDownIcon, 
  MenuIcon, 
  MenuIcon2, 
  MessageIcon, 
  OrdersIcon, 
  OverviewIcon, 
  ReservationIcon, 
  SearchIcon, 
  SettingsIcon, 
  UserIcon 
} from "~/utils/icons";

interface HeaderProps {
  user: { name: string; avatar?: string };
  onToggleSidebar: () => void;
}

export async function loader({ request }: { request: Request }) {
    // Only difference is the role check
    return await requireRole(request, ["STAFF", "ADMIN"]);
}

export default function StaffLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useLoaderData();

  const onToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header user={{name: `${user.first_name} ${user.last_name}`, avatar: user.avatar}} onToggleSidebar={onToggleSidebar} />

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

function Header({ user, onToggleSidebar }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false); // New state for Bell

  // Mock notifications - in a real app, these would come from props or a hook
  const notifications = [
    { 
      id: 1, 
      title: "New Reservation", 
      time: "2m ago", 
      desc: "Table 4 booked for 19:30", 
      color: "bg-violet-50",
      icon: (
        <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ) 
    },
    { 
      id: 2, 
      title: "Order Ready", 
      time: "10m ago", 
      desc: "Order #102 is ready to serve", 
      color: "bg-emerald-50",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-1.533-1.42 3.75 3.75 0 003.463 6.341z" />
        </svg>
      ) 
    },
    { 
      id: 3, 
      title: "System Update", 
      time: "1h ago", 
      desc: "Menu prices updated successfully", 
      color: "bg-slate-100",
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) 
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
          <MenuIcon />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* NOTIFICATION BELL SECTION */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsMenuOpen(false); // Close profile menu if bell is clicked
            }}
            className={`p-2 rounded-lg relative transition-colors ${isNotifOpen ? 'bg-violet-50 text-violet-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <BellIcon />
            {/* Notification Dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {isNotifOpen && (
            <>
              {/* Invisible backdrop to close on click-outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-[1rem] shadow-2xl shadow-slate-200/60 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="font-black text-slate-900 text-sm tracking-tight uppercase">Notifications</h3>
                  <span className="text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">3 NEW</span>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl ${n.color} flex items-center justify-center text-lg`}>
                          {n.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-bold text-slate-800">{n.title}</p>
                            <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full p-4 text-[10px] font-black text-violet-600 uppercase tracking-widest hover:bg-violet-50 transition-colors border-t border-slate-50">
                  View all activity
                </button>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        {/* PROFILE MENU SECTION */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsNotifOpen(false); // Close notifications if profile is clicked
            }} 
            className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 font-bold overflow-hidden">
              {user.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : user.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-none">{user.name}</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">Staff Member</p>
            </div>
            <ChevronDownIcon />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                <Link to="/staff/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-colors">
                  <SettingsIcon /> Settings
                </Link>
                <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const location = useLocation();

  const menuGroups = [
    {
        group: "Active Service", 
        links: [
            { name: "Live View", path: "/staff/dashboard", icon: <OverviewIcon /> },
            { name: "Orders", path: "/staff/orders", icon: <OrdersIcon /> },
            { name: "Reservations", path: "/staff/reservations", icon: <ReservationIcon /> },
        ],
    },
    {
        group: "Planning", 
        links: [
            { name: "Calendar", path: "/staff/calendar", icon: <CalendarIcon /> },
            { name: "Menu", path: "/staff/menu", icon: <MenuIcon2 /> },
            { name: "Inventory", path: "/staff/inventory", icon: <CalendarIcon /> },
        ],
    },
    {
        group: "System",
        links: [
            { name: "Settings", path: "/staff/settings", icon: <SettingsIcon /> },
        ],
    },
  ];

  return (
    <aside className={`${isCollapsed ? "w-20" : "w-64"} bg-[#0F172A] transition-all duration-300 h-screen flex flex-col`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-white font-black text-xl tracking-tighter">
          {isCollapsed ? "F." : "FLUXIA"}
        </span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.group}>
            {!isCollapsed && (
              <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all group ${
                      isActive ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-violet-400"}`}>
                      {link.icon}
                    </div>
                    {!isCollapsed && <span className="ml-3 text-sm font-medium whitespace-nowrap">{link.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}