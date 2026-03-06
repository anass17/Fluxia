import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("layouts/AuthLayout.tsx", [
        route("/register", "routes/auth/register.tsx"),
        route("/login", "routes/auth/login.tsx"),
    ]),

    layout("layouts/AdminLayout.tsx", [
        route("/dashboard", "routes/admin/dashboard.tsx")
    ])
] satisfies RouteConfig;
