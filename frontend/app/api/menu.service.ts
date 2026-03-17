import { apiFetch } from "./index";

export const menuService = {
  getMenu: (request: Request) => 
    apiFetch(request, "/menu", { method: "GET" }),

  askMenu: (request: Request, data: any) =>
    apiFetch(request, "/menu/chat", { method: "POST", body: JSON.stringify(data) }),

  getChatHistory: (request: Request) =>
    apiFetch(request, "/chat", { method: "GET" }),

  clearChatHistory: (request: Request) => 
    apiFetch(request, "/chat", { method: "DELETE" }),
};