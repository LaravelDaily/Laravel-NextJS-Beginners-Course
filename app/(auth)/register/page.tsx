import type { Metadata } from "next";
import { AuthPage } from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Register | BABYGEAR",
};

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
