import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Profile | GameVerse",
  description: "Your GameVerse profile — manage your favorites, recently played games, and account settings.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
