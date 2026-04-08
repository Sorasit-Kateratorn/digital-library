import type { Route } from "./+types/signup";
import { Signup } from "../pages/signup/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SignupRoute() {
  return <Signup/>
}
