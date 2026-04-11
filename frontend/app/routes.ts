import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/signup", "routes/signup.tsx"),
    route("/login", "routes/login.tsx"),
    route("/main","routes/main.tsx"),
    route("/admin","routes/admin.tsx"),
    route("/librarian","routes/librarian.tsx"),
    route("/catalog","routes/catalog.tsx")
] satisfies RouteConfig;
