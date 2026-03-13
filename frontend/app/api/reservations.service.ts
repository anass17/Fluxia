import { apiFetch } from "./index";

export const reservationsService = {
  createReservation: (request: Request, data: any) => 
    apiFetch(request, "/reservations", { method: "POST", body: JSON.stringify(data) }),

};