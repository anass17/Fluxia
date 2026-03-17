import { apiFetch } from "./index";

export const menuService = {
  getMenu: (request: Request) => 
    apiFetch(request, "/menu", { method: "GET" }),

  askMenu: (request: Request, data: any) =>
    apiFetch(request, "/menu/answer", { method: "POST", body: JSON.stringify(data) }),
};