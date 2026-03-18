import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState(true);

  // Custom SVGs to keep it library-free
  const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
  const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-2">
          <h1 className="text-2xl font-black text-slate-900 mb-6 px-4">Settings</h1>
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-white shadow-sm text-violet-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <ShieldIcon /> Account & Security
          </button>
          <button 
            onClick={() => setActiveTab('dietary')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'dietary' ? 'bg-white shadow-sm text-violet-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <DatabaseIcon /> Dietary Context
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-white shadow-sm text-violet-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <BellIcon /> Notifications
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div>
                    <h3 className="text-lg font-black text-slate-900">Change Password</h3>
                    <p className="text-sm text-slate-500 mt-1">Update your account credentials to stay secure.</p>
                </div>

                <div className="space-y-5">
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                    <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <ShieldIcon />
                    </div>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* New Password */}
                    <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <ShieldIcon />
                        </div>
                        <input 
                        type="password" 
                        placeholder="Min. 8 characters"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                        />
                    </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <ShieldIcon />
                        </div>
                        <input 
                        type="password" 
                        placeholder="Repeat new password"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                        />
                    </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="px-8 py-3 bg-violet-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all">
                    Update Password
                    </button>
                </div>
                </div>
            </div>
            )}

          {activeTab === 'dietary' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">AI Personalization</h3>
                <p className="text-sm text-slate-500 mt-1">Control how the Dietary Assistant remembers your data.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-violet-50/50 border border-violet-100">
                  <div>
                    <p className="text-sm font-bold text-violet-900">Memory Mode</p>
                    <p className="text-xs text-violet-700">Allow AI to remember past allergy queries.</p>
                  </div>
                  <div className="w-12 h-6 bg-violet-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Default Allergy Filter</label>
                  <select className="w-full bg-transparent text-sm font-bold text-slate-700 focus:outline-none">
                    <option>Peanuts & Tree Nuts</option>
                    <option>Gluten-Free Only</option>
                    <option>Dairy Free</option>
                    <option>Custom (Set in Profile)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Notifications</h3>
                  <p className="text-sm text-slate-500 mt-1">Stay updated on new menu items and warnings.</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-violet-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default SettingsPage;