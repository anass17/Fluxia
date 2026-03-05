import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Visual Side (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">Fluxia</h1>
        <p className="text-xl text-indigo-100 text-center max-w-md">
          Real-time table detection and smart reservations powered by computer vision.
        </p>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}