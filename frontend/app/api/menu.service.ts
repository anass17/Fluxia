import { apiFetch } from "./index";

export const menuService = {
  getMenu: (request: Request) => 
    apiFetch(request, "/menu", { method: "GET" }),
};