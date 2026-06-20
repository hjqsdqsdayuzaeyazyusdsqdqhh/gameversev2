import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | GameVerse",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-extrabold text-gradient mb-4 leading-none">404</div>
        <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-3">Lost in the GameVerse</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to another dimension.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary px-8 py-3">Go Home</Link>
          <Link href="/games" className="btn-secondary px-8 py-3">Browse Games</Link>
        </div>
      </div>
    </div>
  );
}
