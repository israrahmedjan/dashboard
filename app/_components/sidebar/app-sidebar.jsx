'use client'

import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"

import { Home, Store, FolderKanban, Plus, ChartColumnStacked, Users, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import LogoutButton from "@/app/logout/logout"

export function AppSidebar() {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN

  return (
    <Sidebar className="text-[15px] md:text-[16px] text-muted-foreground">
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2 text-foreground cursor-pointer">
          <Link href={`${domain}`}>
            <Image src={`${domain}/images/logo.png`} width={125} height={125} alt="Logo Image" />
          </Link>
        </h2>
      </SidebarHeader>

      <SidebarContent className="">
        <Accordion type="multiple" className="w-full">

          <AccordionItem value="home">
            <AccordionTrigger className="px-4 text-[15px]  font-semibold text-foreground cursor-pointer  ">Home</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2 ">
                <Home size={18} />
                <Link
                  href={`${domain}/products`}
                  className="hover:text-gray-700 transition font-medium "
                >
                  Dashboard
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <Store size={18} />
                <Link
                  href={`${domain}/orders`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Orders
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

        
           <AccordionItem value="products">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground cursor-pointer">Products</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <Plus size={18} />
                <Link
                  href={`${domain}/addproduct`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Add Products
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <FolderKanban size={18} />
                <Link
                  href={`${domain}/products`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Products
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
            <AccordionItem value="variations">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground cursor-pointer">Variations</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <Plus size={18} />
                <Link
                  href={`${domain}/addvariations`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Add variations
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <FolderKanban size={18} />
                <Link
                  href={`${domain}/variations`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  variations
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
                    <AccordionItem value="gallery">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground cursor-pointer">Gallery</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <Plus size={18} />
                <Link
                  href={`${domain}/addgallery`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Add Gallery
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <FolderKanban size={18} />
                <Link
                  href={`${domain}/gallery`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  gallery
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="categories">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground  cursor-pointer">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <Plus size={18} />
                <Link
                  href={`${domain}/addCategory`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Add Category
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <ChartColumnStacked size={18} />
                <Link
                  href={`${domain}/categories`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Category
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="users">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground cursor-pointer">Users</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <Users size={18} />
                <Link
                  href={`${domain}/users`}
                  className="hover:text-gray-700 transition font-medium"
                >
                  Users
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="settings">
            <AccordionTrigger className="px-4 text-[15px] font-semibold text-foreground cursor-pointer">Settings</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-3 px-4 py-2">
                <LogOut size={18} />
                <LogoutButton />
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-center p-4 text-muted-foreground">© 2025</p>
      </SidebarFooter>
    </Sidebar>
  )
}
