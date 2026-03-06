import { apiFetch } from "./index";

export const clientsService = {
  getClients: () => 
    apiFetch("/users/clients", { method: "GET" }),

};