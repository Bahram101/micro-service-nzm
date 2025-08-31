"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Container from "@/components/container";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authPaths = ["/login", "/register", "/forgot-password"];

  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {children}
      </div>
    );
  }

  return (
    <Container>
      <Header />
      <main className="main p-4 min-h-screen">{children}</main>
      <Footer />
    </Container>
  );
}
