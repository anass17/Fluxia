import { getSession } from "~/services/session.server";

const BASE_URL = "http://backend:8000";

export const apiFetch = async (request: Request, endpoint: string, options: RequestInit = {}) => {

    const session = await getSession(request.headers.get("Cookie"));

    let token = null

    if (session){
        token = session.get("access_token");
    }
    
    const defaultHeaders = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
    });



    // Error 422: Unprocessed Data

    if (response.status == 422) {
        throw new Error("Please check your details")
    }



    // Any other errors

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Network response was not ok");
    }

    return response.json();
};