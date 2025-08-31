import Link from "next/link"

export const Header = () => {
  return <div className="px-4 py-4 border-b border-zinc-200 justify-between flex">
    <div className="logo text-xl ">
      Micro service
    </div>
    <ul className="flex gap-3">
      <li><Link href='/'>Home</Link></li>
      <li><Link href='/posts'>Post</Link></li>
      <li><Link href='/users'>User</Link></li>
    </ul>
  </div>
}