import type { ActionFunctionArgs } from "react-router";
import { staffsService } from "~/api/staffs.service";


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Call your API
//   const res = await staffsService.createStaff(data);

//   if (res.error) return { success: false, error: res.error };
  
  return { success: true };
}