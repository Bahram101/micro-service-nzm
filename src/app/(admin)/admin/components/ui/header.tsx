"use client"
import { useAuth } from '@/providers/AuthProvider'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  const { logout } = useAuth()

  return (
    <div className='bg-[#4092ba] p-4 flex justify-between items-center'>
      <Link href="/" className='mr-4 hover:underline text-white'>Перейти на сайт</Link>
      <p className='cursor-pointer text-white' onClick={logout}>
        Log out
      </p>
    </div>
  )
}

export default Header