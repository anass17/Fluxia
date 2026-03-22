import { type ActionFunctionArgs } from "react-router";
import { requireRole } from "~/services/auth.server";
import { usersService } from "~/api/users.service";


export async function action({ request, params }: ActionFunctionArgs) {
  
    // Security Check
    await requireRole(request, ["OWNER"]);


    // Get the Client ID from the URL params ($id)
    const clientId = params.id;
    if (!clientId) return { error: "User ID is required" };

    // Call your API to toggle the status
    try {
        await usersService.upgradeAdmin(request, +clientId)
        console.log(clientId)
        return { success: true };
    } catch (error) {
        console.log(error)
        return { error: "Failed to update status" };
    }
}