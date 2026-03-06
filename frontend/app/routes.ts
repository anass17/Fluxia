import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("layouts/AuthLayout.tsx", [
        route("/register", "routes/auth/register.tsx"),
        route("/login", "routes/auth/login.tsx"),
        route("/logout", "routes/auth/logout.tsx")
    ]),

    layout("layouts/AdminLayout.tsx", [
        route("/dashboard", "routes/admin/dashboard.tsx"),
        route("/admin/clients", "routes/admin/clients.tsx")
    ]),

    // Ressource routes
    route("/admin/clients/:id/toggle-status", "routes/admin/clients.toggle-status.ts"),

    // Errors
    route("/unauthorized", "routes/errors/unauthorized.tsx")

] satisfies RouteConfig;
