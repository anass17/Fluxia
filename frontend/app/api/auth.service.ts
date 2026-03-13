import { apiFetch } from "./index";

export const authService = {
  register: (request: Request, data: any) => 
    apiFetch(request, "/auth/client/register", { method: "POST", body: JSON.stringify(data) }),

  registerStaff: (request: Request, data: any) => 
    apiFetch(request, "/auth/staff/register", { method: "POST", body: JSON.stringify(data) }),
    
  login: (request: Request, credentials: any) => 
    apiFetch(request, "/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
};