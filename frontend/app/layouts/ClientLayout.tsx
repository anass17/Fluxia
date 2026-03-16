import { useState } from "react";
import { Link, Outlet, useLocation, useLoaderData } from "react-router";
import { LogoutButton } from "~/components/ui/LogoutButton";
import { requireRole } from "~/services/auth.server";
import { BellIcon, CalendarIcon, ChevronDownIcon, MenuIcon, MessageIcon, OrdersIcon, OverviewIcon, ReservationIcon, SearchIcon, SettingsIcon } from "~/utils/icons";

interface HeaderProps {
  user: { name: string; avatar?: string };
  onToggleSidebar: () => void;
}


export async function loader({ request }: { request: Request }) {
    return await requireRole(request, ["CLIENT"]);
}


export default function ClientLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useLoaderData();

  const onToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 overflow-hidden">
      {/* SIDEBAR */}
        <Sidebar isCollapsed={isCollapsed} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER */}
        <Header user={{name: `${user.first_name} ${user.last_name}`}} onToggleSidebar={onToggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



function Header({ user, onToggleSidebar }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40">
      
      {/* Left Section: Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <MenuIcon />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-3">

        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
          <BellIcon />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        {/* User Dropdown Group */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 font-bold overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-none">{user.name}</p>
            </div>
            <ChevronDownIcon />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-colors">
                  <SettingsIcon />
                  Settings
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
      group: "Main",
      links: [
        { name: "Overview", path: "/dashboard", icon: <OverviewIcon /> },
        { name: "Calendar", path: "/calendar", icon: <CalendarIcon /> },
      ],
    },
    {
      group: "Management",
      links: [
        { name: "Reservations", path: "/reservation", icon: <ReservationIcon /> },
        { name: "Orders", path: "/orders", icon: <OrdersIcon /> },
      ],
    },
    {
      group: "Insights",
      links: [
        { name: "AI Assistant", path: "/bot-messaging", icon: <MessageIcon /> },
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
            {/* Group Label */}
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
                      isActive 
                        ? "bg-violet-600 text-white" 
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-violet-400"}`}>
                      {link.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium whitespace-nowrap">
                        {link.name}
                      </span>
                    )}
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