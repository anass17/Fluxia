import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("layouts/AuthLayout.tsx", [
        route("/register", "routes/auth/register.tsx"),
        route("/login", "routes/auth/login.tsx"),
        route("/logout", "routes/auth/logout.tsx")
    ]),


    // Owner Routes
    layout("layouts/OwnerLayout.tsx", [
        route("/owner/dashboard", "routes/owner/dashboard.tsx"),
        route("/owner/clients", "routes/owner/clients.tsx"),
        route("/owner/staffs", "routes/owner/staffs.tsx"),
        route("/owner/admins", "routes/owner/admins.tsx"),
        route("/owner/tables", "routes/owner/tables.tsx"),
        route('/owner/calendar', "routes/owner/calendar.tsx"),
        route('/owner/reservations', "routes/owner/reservations.tsx"),
        route('/owner/orders', "routes/owner/orders.tsx"),
        route('/owner/menu', "routes/owner/menu.tsx"),
    ]),


    // Admin Routes
    layout("layouts/AdminLayout.tsx", [
        route("/admin/dashboard", "routes/admin/dashboard.tsx"),
        route("/admin/clients", "routes/admin/clients.tsx"),
        route("/admin/staffs", "routes/admin/staffs.tsx"),
        route("/admin/tables", "routes/monitoring/tables.tsx"),
        route('/admin/calendar', "routes/admin/calendar.tsx"),
        route('/admin/reservations', "routes/admin/reservations.tsx"),
        route('/admin/orders', "routes/admin/orders.tsx"),
        route('/admin/menu', "routes/admin/menu.tsx"),
    ]),


    // Client Routes
    layout("layouts/ClientLayout.tsx", [
        route("/dashboard", "routes/client/dashboard.tsx"),
        route("/reservation", "routes/client/reservation.tsx"),
        route("/calendar", "routes/client/calendar.tsx"),
        route("/assistant", "routes/client/assistant.tsx"),
        route("/profile", "routes/client/profile.tsx"),
        route("/settings", "routes/client/settings.tsx"),
        route("/menu", "routes/client/menu.tsx"),
    ]),


    // Staff Routes
    layout("layouts/StaffLayout.tsx", [
        route("/staff/dashboard", "routes/staff/dashboard.tsx"),
        route('/staff/reservations', "routes/staff/reservation.tsx"),
        route('/staff/calendar', "routes/staff/calendar.tsx"),
        route('/staff/inventory', "routes/staff/_inventory.tsx"),
        route('/staff/menu', "routes/staff/menu.tsx"),
        route('/staff/settings', "routes/staff/settings.tsx"),
        route('/staff/orders', "routes/staff/orders.tsx"),
    ]),

    
    // Ressource routes
    route("/admin/user/:id/toggle-status", "routes/admin/api/user_toggle_status.ts"),
    route("/owner/user/:id/downgrade", "routes/api/user.downgrade.ts"),
    route("/owner/user/:id/upgrade", "routes/api/user.upgrade.ts"),
    route("/admin/staff/create", "routes/admin/api/staff_create.ts"),
    route("/reservation/create", "routes/client/api/create_reservation.ts"),
    route("/reservations/timeslots", "routes/api/reservations.timeslots.ts"),
    route("/reservations/date", "routes/client/api/reservations_by_date.ts"),
    route("api/reservations/date/all", "routes/staff/api/reservations_by_date.ts"),
    route("/chat/assistant", "routes/client/api/chat_assistant.ts"),
    route("/chat/clear", "routes/client/api/clear_chat.ts"),

    // Errors
    route("/unauthorized", "routes/errors/unauthorized.tsx")

] satisfies RouteConfig;
