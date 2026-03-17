import { type ActionFunctionArgs } from "react-router";
import { menuService } from "~/api/menu.service";


export async function action({ request } : ActionFunctionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    let response;

    try {
      response = await menuService.askMenu(request, data);
    } catch (err) {
      return { success: false, error: err };
    }
    
    return response;
}