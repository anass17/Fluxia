import { apiFetch } from "./index";

export const clientsService = {
  getClients: () => 
    apiFetch("/users/clients", { method: "GET" }),

  blockUser: (id: number) => 
    apiFetch(`/users/block/${id}`, { method: "PUT" }),

  unblockUser: (id: number) => 
    apiFetch(`/users/unblock/${id}`, { method: "PUT" }),

};