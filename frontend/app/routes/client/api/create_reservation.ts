import { type ActionFunctionArgs } from "react-router";
import { reservationsService } from "~/api/reservations.service";


export async function action({ request } : ActionFunctionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await reservationsService.createReservation(request, data);
    } catch (err) {
      return { success: false, error: err };
    }
    
    return { success: true };
}