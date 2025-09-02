export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav className="space-y-2">
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

          {/* Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
