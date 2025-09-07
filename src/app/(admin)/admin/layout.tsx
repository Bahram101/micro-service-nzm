"use client"
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import Sidebar from "./components/ui/sidebar";
import "@/app/(main)/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex flex-1 p-4 w-full">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
