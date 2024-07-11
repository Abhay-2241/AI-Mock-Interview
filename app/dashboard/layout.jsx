import React from 'react'
import Header from './_components/Header';
import { UserButton } from '@clerk/nextjs';


function DashboardLayout({children}) {
  return (
    <>
    <div className='flex p-4 items-center justify-between'>
      <img src={'./logo.svg'} width={160} height={100} alt='logo'/>
      <ul className='flex gap-6'>
        <li>Dashboard</li>
        <li>Questions</li>
        <li>Upgrade</li>
        <li>How it works!</li>
      </ul>
      <UserButton/>
    </div></>
  )
}

export default DashboardLayout;