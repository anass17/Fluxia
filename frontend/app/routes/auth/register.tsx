import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigation, redirect } from "react-router";
import { authService } from "~/services/auth.service";
import { z } from "zod";



const registerSchema = z.object({
  first_name: z.string().min(2, "Field Required"),
  last_name: z.string().min(2, "Field Required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
  terms: z.coerce.boolean()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"], 
}).refine((data) => data.terms === true, {
  message: "You must accept the terms",
  path: ["terms"],
});


export async function action({ request }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = registerSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    
    return { 
      errors: fieldErrors,
      values: data
    };
  }

  try {
    await authService.register(data);
    return redirect("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}


export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    console.log(actionData)
  }, [isSubmitting])

  // SVG Icons as functional constants to keep the JSX clean
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 text-sm">Fill in your details to get started.</p>
      </div>
      
      <Form method="post" className="space-y-4">
        {actionData?.error && (
          <div className="p-3 mb-4 text-sm text-red-100 bg-red-600 rounded-lg">
            {actionData.error}
          </div>
        )}
        {/* Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input 
              type="text" name="first_name"
              className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
              placeholder="Alex"
            />
            {actionData?.errors?.first_name && (
              <p className="text-red-500 text-xs mt-1">{actionData.errors.first_name[0]}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input 
              type="text" name="last_name"
              className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
              placeholder="Smith"
            />
            {actionData?.errors?.last_name && (
              <p className="text-red-500 text-xs mt-1">{actionData.errors.last_name[0]}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" name="email"
            className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
            placeholder="user@example.com"
          />
          {actionData?.errors?.email && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              name="password"
              className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"
            >
              {showPass ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {actionData?.errors?.password && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.password[0]}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input 
              type={showConfirm ? "text" : "password"} 
              name="confirm_password"
              className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {actionData?.errors?.confirm_password && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.confirm_password[0]}</p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-2">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" id="terms" name="terms"
              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I accept the <Link to="#" className="text-violet-600 hover:underline font-medium">Terms and Conditions</Link>
            </label>
          </div>
          {actionData?.errors?.terms && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.terms[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg transition-all ${
            isSubmitting ? "bg-violet-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 cursor-pointer"
          } text-white font-bold`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            "Create Fluxia Account"
          )}
        </button>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-violet-600 font-bold hover:underline">Log in</Link>
      </div>
    </div>
  );
}