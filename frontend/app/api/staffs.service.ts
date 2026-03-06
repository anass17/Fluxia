import { apiFetch } from "./index";

export const staffsService = {
  getStaffs: () => 
    apiFetch("/users/staffs", { method: "GET" }),

  createStaff: (data: any) => null
};