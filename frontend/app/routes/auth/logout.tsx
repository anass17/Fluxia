import { redirect, type ActionFunctionArgs } from "react-router";
import { getSession, destroySession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  // This helper clears the cookie data and sets the expiration to the past
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// Redirect if someone tries to navigate to /logout directly via GET
export async function loader() {
  return redirect("/login");
}