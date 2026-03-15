import { apiFetch } from "./index";

export const reservationsService = {
    createReservation: (request: Request, data: any) => 
        apiFetch(request, "/reservations", { method: "POST", body: JSON.stringify(data) }),

    
    getReservations: (request: Request) =>
        apiFetch(request, "/reservations", { method: "GET" }),

    
    getTakenTimeslots: (request: Request, date: string, table: number) => {
        const params = new URLSearchParams({
            date,
            table: table.toString(),
        });

        return apiFetch(
            request,
            `/reservations/timeslots?${params.toString()}`,
            { method: "GET" }
        );
    }

};