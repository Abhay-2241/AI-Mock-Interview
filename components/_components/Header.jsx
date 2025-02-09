"use client"

import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Header() {

  const path = usePathname();
  useEffect(() => console.log(path) ,[])
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={'/logo.svg'} width={160} height={60} alt='logo' />
      <ul className="hidden md:flex gap-6">
        <li className={`hover:text-primary font-bold transition cursor-pointer
        ${path == '/dashboard' && 'text-primary font-bold'}`} >Dashboard</li>
      <li className={`hover:text-primary font-bold transition cursor-pointer
        ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
      <li className={`hover:text-primary font-bold transition cursor-pointer
        ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
      <li className={`hover:text-primary font-bold transition cursor-pointer
        ${path == '/dashboard/guide' && 'text-primary font-bold'}`}>How it works!</li>
    </ul><UserButton />
    </div>
  );
}

export default Header;
