'use client'
import Link from 'next/link'
import React from 'react'

function HeaderPage() {
    const domain= process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  return (
    <>
    <div>THis is header Page..</div>
    <ul className='flex gap-2 font-semibold text-xl'>
        <li><Link href={`${domain}/`}>Home</Link></li>
        <li><Link href={`${domain}/dashboard`}>Dashboard</Link></li>
        <li><Link href={`${domain}/products`}>Products</Link></li>
        <li><Link href={`${domain}/category`}>Category</Link></li>
        <li><Link href={`${domain}/login`}>login</Link></li>
    </ul>
    </>
    
  )
}

export default HeaderPage