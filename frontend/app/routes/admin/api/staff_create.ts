import type { ActionFunctionArgs } from "react-router";
import { authService } from "~/api/auth.service";
import z from "zod"

const staffCreateSchema = z.object({
    first_name: z.string().min(1, "Field Required"),
    last_name: z.string().min(1, "Field Required"),
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Password must contain at least 8 characters")
})


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = z.safeParse(staffCreateSchema, data)

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Call your API
  try {
    await authService.registerStaff(data);
  } catch (err) {
    return { success: false, error: err };
  }
  
  return { success: true };
}