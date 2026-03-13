import { type ActionFunctionArgs } from "react-router";
import { requireRole } from "~/services/auth.server";
import { usersService } from "~/api/users.service";


export async function action({ request, params }: ActionFunctionArgs) {

    const formData = await request.formData()
    const data = Object.fromEntries(formData);

  
    // Security Check
    await requireRole(request, ["ADMIN"]);


    // Get the Client ID from the URL params ($id)
    const clientId = params.id;
    if (!clientId) return { error: "Client ID is required" };


    // Call your API to toggle the status
    try {
        if (data.toggle_status === "Block") {
            await usersService.blockUser(request, +clientId)
        } else if (data.toggle_status === "Unblock") {
            await usersService.unblockUser(request, +clientId)
        } else {
            return { error: "Failed to update status" };
        }
        return { success: true };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}