'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {}

const UsersPage = (props: Props) => {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      const res = await fetch("/api/users");
      const data = await res.json()
      setUsers(data)
      setIsLoading(false)
    }
    getUsers()
  }, [])

  if (isLoading) return <p>Loading...</p>

  console.log('user', users)

  return (
    <div>
      <div className='flex justify-between pb-4'>
        <div>Users</div>
        <Link href='/users/create'><button className='bg-green-600 px-4 py-2 rounded text-white' >Create</button></Link>
      </div>
      <div className='flex-col'>
        {
          users.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default UsersPage