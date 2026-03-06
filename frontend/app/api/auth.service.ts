import { apiFetch } from "./index";

export const authService = {
  register: (data: any) => 
    apiFetch("/auth/client/register", { method: "POST", body: JSON.stringify(data) }),

  registerStaff: (data: any) => 
    apiFetch("/auth/staff/register", { method: "POST", body: JSON.stringify(data) }),
    
  login: (credentials: any) => 
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
};