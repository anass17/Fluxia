import { z } from "zod";
import { redirect } from "react-router";
import { useState } from "react";
import { Form, useActionData, useNavigation, Link } from "react-router";
import { authService } from "~/api/auth.service";
import { createUserSession } from "~/services/session.server";


export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});


export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const response = await authService.login(request, result.data);

    return createUserSession(response, request)

  } catch (err) {
    return { serverError: "Invalid email or password" };
  }
}


export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // Icons matching your Register component
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
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
      </div>

      <Form method="post" className="space-y-5">
        {/* Server Error Message */}
        {actionData?.serverError && (
          <div className="p-3 text-sm text-red-100 bg-red-600 rounded-lg">
            {actionData.serverError}
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
          />
          {actionData?.errors?.email && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.email[0]}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Password</label>
            {/* <Link to="#" className="text-xs text-violet-600 hover:underline">
              Forgot password?
            </Link> */}
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 text-slate-700 placeholder-slate-400 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600 transition-colors"
            >
              {showPass ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {actionData?.errors?.password && (
            <p className="text-red-500 text-xs mt-1">{actionData.errors.password[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg transition-all font-bold text-white shadow-sm shadow-violet-200 mt-3 ${
            isSubmitting 
              ? "bg-violet-400 cursor-not-allowed" 
              : "bg-violet-600 hover:bg-violet-700 active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying...
            </div>
          ) : (
            "Log in to Fluxia"
          )}
        </button>
      </Form>

      {/* Footer Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        New to Fluxia?{" "}
        <Link to="/register" className="text-violet-600 font-bold hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}