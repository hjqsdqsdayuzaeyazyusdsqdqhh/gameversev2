import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In | GameVerse",
  description: "Sign in to GameVerse with your Google account to save favorites and track your recently played games.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
