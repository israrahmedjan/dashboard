"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
       {/* large Devices and Medium devices */}
        <aside className="hidden md:block w-64 bg-gray-100 border-r ">
        <div className="p-4 font-bold text-xl">Admin Panel</div>
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/admin/dashboard" className="hover:bg-gray-200 p-2 rounded">
            Dashboard
          </Link>
          <Link href="/admin/users" className="hover:bg-gray-200 p-2 rounded">
            Users
          </Link>
          <Link href="/admin/settings" className="hover:bg-gray-200 p-2 rounded">
            Settings
          </Link>
        </nav>
      </aside>

 {/* Small Devices */}
 
     

 

    </>
  )
}

export default Sidebar