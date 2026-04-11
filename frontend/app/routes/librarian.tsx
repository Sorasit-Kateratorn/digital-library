import type { Route } from "./+types/home";
import { Librarian } from "../pages/librarian/librarian";

export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function LibrarianRoute() {
    return <Librarian />;
}
