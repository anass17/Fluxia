const BASE_URL = "http://backend:8000";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {

    let token
    
    try {
        token = localStorage.getItem("fluxia_token");
    } catch {
        token = null
    }
    
    const defaultHeaders = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "Network response was not ok");
    }

    return response.json();
};