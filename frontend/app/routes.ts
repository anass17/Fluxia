import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("layouts/AuthLayout.tsx", [
        route("/register", "routes/auth/register.tsx"),
        route("/login", "routes/auth/login.tsx"),
        route("/logout", "routes/auth/logout.tsx")
    ]),

    // Admin Routes
    layout("layouts/AdminLayout.tsx", [
        route("/admin/dashboard", "routes/admin/dashboard.tsx"),
        route("/admin/clients", "routes/admin/clients.tsx"),
        route("/admin/staffs", "routes/admin/staffs.tsx"),
        route("/admin/tables", "routes/monitoring/tables.tsx"),
    ]),


    // Client Routes
    layout("layouts/ClientLayout.tsx", [
        route("/dashboard", "routes/client/dashboard.tsx"),
        route("/reservation", "routes/client/reservation.tsx"),
        route("/calendar", "routes/client/calendar.tsx"),
        route("/assistant", "routes/client/assistant.tsx"),
        route("/menu", "routes/client/menu.tsx"),
    ]),

    
    // Ressource routes
    route("/admin/user/:id/toggle-status", "routes/admin/api/user_toggle_status.ts"),
    route("/admin/staff/create", "routes/admin/api/staff_create.ts"),
    route("/reservation/create", "routes/client/api/create_reservation.ts"),
    route("/reservations/timeslots", "routes/api/reservations.timeslots.ts"),
    route("/reservations/date", "routes/client/api/reservations_by_date.ts"),

    // Errors
    route("/unauthorized", "routes/errors/unauthorized.tsx")

] satisfies RouteConfig;
