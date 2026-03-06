import { redirect } from "react-router";
import { getSession } from "./session.server";



export async function requireRole(request: Request, allowedRoles: string[]) {
    const session = await getSession(request.headers.get("Cookie"));

    const token = session.get("access_token");
    const role = session.get("role");

    if (!token) {
        throw redirect("/login");
    }

    // if (!allowedRoles.includes(role)) {
    //     throw redirect("/unauthorized");
    // }

    return {
        user: {
            first_name: session.get("first_name"),
            last_name: session.get("last_name"),
            role,
        },
    }
}