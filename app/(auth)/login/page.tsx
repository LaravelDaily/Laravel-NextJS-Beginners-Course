import type { Metadata } from "next";
import { AuthPage } from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Login | BABYGEAR",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
