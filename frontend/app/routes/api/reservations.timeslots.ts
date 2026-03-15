import { reservationsService } from "~/api/reservations.service";

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    const tableId = url.searchParams.get("table_number");

    if (!date || !tableId) return [];

    return await reservationsService.getTakenTimeslots(request, date, +tableId);
}