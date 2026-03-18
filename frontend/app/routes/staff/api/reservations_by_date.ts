import { reservationsService } from "~/api/reservations.service";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  
  // If there's a date in the URL (from a fetcher.load), return specific day bookings
  if (dateParam) {
    const dayBookings = await reservationsService.getAllBookingsByDate(request, dateParam);
    return { bookings: dayBookings }
  }

  // Otherwise, this is the initial page load.
  const today = new Date()
  const initialData = await reservationsService.getAllBookingsByDate(request, today.toISOString().split("T")[0]);
  
  return { initialMonthData: initialData }
}
