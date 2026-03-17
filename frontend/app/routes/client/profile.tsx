import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useOutletContext<{ user: any }>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the image preview
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // Simple SVG Icon Components
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );

  const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
          {/* Decorative Header */}
          <div className="h-32 bg-gradient-to-br from-violet-600 to-indigo-600" />
          
          <div className="px-8 pb-10">
            <div className="relative -mt-12 flex items-end justify-between">
              {/* Avatar Placeholder */}
              <div className="relative group">
                <div className="h-28 w-28 rounded-3xl bg-white p-1.5 shadow-xl">
                  {/* If image exists, show it. Otherwise, show the placeholder Icon */}
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="h-full w-full rounded-2xl object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                      <UserIcon />
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" // Only allow images
                  className="hidden" 
                />

                {/* 6. Changeable Camera Overlay */}
                <button 
                  onClick={triggerFileInput}
                  disabled={!isEditing}
                  className="absolute bottom-1 right-1 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-violet-600 transition-colors disabled:opacity-0 group-hover:disabled:opacity-0 disabled:cursor-default"
                  title="Change profile picture"
                >
                  <CameraIcon />
                </button>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  isEditing 
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700" 
                  : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-black text-slate-900">{user.first_name} {user.last_name}</h1>
              <p className="text-slate-500 font-medium">Standard Member</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Account Details</h3>
          
          <div className="space-y-6">
            {/* First & Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                    <UserIcon />
                  </div>
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    defaultValue={user.first_name}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                    <UserIcon />
                  </div>
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    defaultValue={user.last_name}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Email - Full Width */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                  <MailIcon />
                </div>
                <input 
                  type="email" 
                  disabled={!isEditing}
                  defaultValue={user.email}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900">Delete Account</h4>
            <p className="text-sm text-slate-500">Permanently remove all your data and dietary history.</p>
          </div>
          <button className="px-6 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors">
            Delete Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;