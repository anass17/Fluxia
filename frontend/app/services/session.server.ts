import { createCookieSessionStorage } from "react-router";
import { redirect } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "fluxia_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "fluxia_secrect"],
    secure: process.env.NODE_ENV === "production",
  },
});


export const { getSession, commitSession, destroySession } = sessionStorage;


export async function createUserSession(userData: any, request: Request) {

  const session = await getSession(request.headers.get("Cookie"));

  session.set("access_token", userData.access_token);
  session.set("first_name", userData.first_name);
  session.set("last_name", userData.last_name);
  session.set("role", userData.role);

  let redirectTo = "/dashboard";
  
  if (userData.role === "ADMIN") {
    redirectTo = "/admin/dashboard";
  } else if (userData.role === "STUFF") {
    redirectTo = "/stuff/dashboard";
  }

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}