import { type ActionFunctionArgs } from "react-router";
import { menuService } from "~/api/menu.service";


export async function action({ request } : ActionFunctionArgs) {

    let response;

    try {
      response = await menuService.clearChatHistory(request);
    } catch (err) {
      return { success: false, error: err };
    }
    
    return response;
}