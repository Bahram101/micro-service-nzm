import React from 'react'

 
const Page = ( ) => {
  const api = process.env.NEXT_PUBLIC_API_URL_PROD
  console.log('api',api)
  return (
    <div className=''>Posts</div>
  )
}

export default Page