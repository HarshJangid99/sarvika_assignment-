import React from 'react'
import UserTable from '../components/UserTable'

const Homepage = () => {
  return (
    <div className='py-10 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold text-center'>Users Table </h1>
        <UserTable/>
    </div>
  )
}

export default Homepage
