export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <nav className="mt-4 space-y-2">
              <a href="/admin" className="block hover:underline">
                Dashboard
              </a>
              <a href="/admin/users" className="block hover:underline">
                Users
              </a>
              <a href="/admin/settings" className="block hover:underline">
                Settings
              </a>
            </nav>
          </aside>
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
