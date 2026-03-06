import { apiFetch } from "./index";

export const usersService = {
  getClients: () => 
    apiFetch("/users/clients", { method: "GET" }),

  blockUser: (id: number) => 
    apiFetch(`/users/block/${id}`, { method: "PUT" }),

  unblockUser: (id: number) => 
    apiFetch(`/users/unblock/${id}`, { method: "PUT" }),

  getStaffs: () => 
    apiFetch("/users/staffs", { method: "GET" }),

};