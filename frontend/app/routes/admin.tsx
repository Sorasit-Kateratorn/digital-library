import type { Route } from "./+types/home";
import { Admin } from "../pages/admin/admin";

export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function AdminRoute() {
    return <Admin />;
}
