import { apiFetch } from "./index";

export const statsService = {
  getOwnerStats: (request: Request) => 
    apiFetch(request, "/stats/owner", { method: "GET" }),

};