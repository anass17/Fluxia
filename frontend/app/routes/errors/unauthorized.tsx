import { Link, useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl shadow-red-100 border border-red-50">
            <LockIcon />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Access Denied
        </h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          It looks like you don't have the necessary permissions to view this page. 
          If you believe this is a mistake, please contact your system administrator.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-3.5 bg-slate-900 cursor-pointer text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            Go Back
          </button>
          
          <Link 
            to="/" 
            className="w-full py-3.5 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- SVG ICON ---
const LockIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#EF4444" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);