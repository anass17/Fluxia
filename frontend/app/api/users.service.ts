import { apiFetch } from "./index";

export const usersService = {
  getClients: (request: Request) => 
    apiFetch(request, "/users/clients", { method: "GET" }),

  blockUser: (request: Request, id: number) => 
    apiFetch(request, `/users/block/${id}`, { method: "PUT" }),

  unblockUser: (request: Request, id: number) => 
    apiFetch(request, `/users/unblock/${id}`, { method: "PUT" }),

  getStaffs: (request: Request) => 
    apiFetch(request, "/users/staffs", { method: "GET" }),

};