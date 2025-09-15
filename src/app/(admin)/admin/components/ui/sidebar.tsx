import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside className="w-64 bg-[#153f64] text-white p-4">
      <h2 className="text-xl font-bold pb-3">Admin Panel</h2>
      <nav className="flex flex-col mt-4 space-y-2">
        <a href="/admin" className="block hover:underline">
          Dashboard
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar