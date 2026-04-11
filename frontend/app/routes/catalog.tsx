import type { Route } from "./+types/home";
import { Catalog } from "../pages/catalog/catalog";

export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function CatalogRoute() {
    return <Catalog />;
}
