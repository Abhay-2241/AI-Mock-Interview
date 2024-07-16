import React from 'react'
import Header from '../../components/_components/Header';
import { UserButton } from '@clerk/nextjs';


function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
        <div className='mx-5 md:mx-20 lg:mx-36'>
          {children}

        </div>
     
    </div>
  )
}

export default DashboardLayout;