"use client";   // This file is client-side only

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { AiFillBug} from "react-icons/ai";

const NavBar = () => {
    const pathname = usePathname();
    // console.log(pathname);  

    const links = [
        {
        name: 'Dashboard',
        href: '/'
        },
        {
        name: 'Issues',
        href: '/issues'
        }
    ]

  return (
    <nav className='flex space-x-5 mb-2 p-2 items-center h-16 bg-white text-black relative shadow-sm font-mono' role='navigation'>
        <Link href="/">
            <AiFillBug className='text-3xl' />
        </Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
                <li key={link.href}>
                    <Link 
                        href={link.href} 
                        className={
                             pathname === link.href
                            ? 'text-zinc-900' //if true meaning active pathname
                            : 'text-zinc-500 hover:text-zinc-800 transition-colors'
                        }
                    >
                        {link.name}
                    </Link>
                </li>    
            )}

        </ul>
    </nav>
  )
}

export default NavBar