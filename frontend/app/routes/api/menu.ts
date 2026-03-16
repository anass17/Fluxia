import { menuService } from "~/api/menu.service";

export async function loader({ request }: { request: Request }) {
    return await menuService.getMenu(request);
}