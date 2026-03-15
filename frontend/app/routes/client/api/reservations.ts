import { reservationsService } from "~/api/reservations.service";

export async function loader({ request }: { request: Request }) {
    const response = reservationsService.getReservations(request)
    return response
}