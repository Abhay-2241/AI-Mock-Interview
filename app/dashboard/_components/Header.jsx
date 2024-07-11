import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';

function Header() {
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={'/logo.svg'} width={160} height={60} alt='logo' />
      <ul className="flex gap-6">
        <li className=" bg-red-600 ">Dashboard</li>
        <li className="text-red-500">Questions</li>
        <li className="hover:text-primary font-bold transition cursor-pointer">Upgrade</li>
        <li className="hover:text-primary font-bold transition cursor-pointer">How it works!</li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
