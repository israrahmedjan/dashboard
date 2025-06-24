"use client";



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategorybyId, GetCategories } from "@/lib/helper";
import { useEffect, useState } from "react";
import GetPagination from "./Pagination";
import Link from "next/link";
import CatPagination from "./Pagination";
import CatFilter from "./Filter";
import Search from "./Search";
import Image from "next/image";
import useMessageStore from "@/store/useMessageStore";
import { CheckCircle, Delete, List, Pencil } from "lucide-react";
import { Button } from '@/components/ui/button';


export function CategoryListing() {

  const [client, setclient] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [pageNum, setpageNme] = useState(1)
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  const { message, clearMessage, setMessage } = useMessageStore();

  // Automatically clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        clearMessage();
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [message]);



  //  const searchParams = props.searchParams || {};

  // const page1 = searchParams.page || '';
  //   const sort = searchParams.sort || '';
  //   const search = searchParams.search || '';
  const limit = 6;
  const sort = 1;
  const search = "";


  //console.log(searchParams);
  const getCategoryHandle = async (page, sort = 1, search) => {
    setLoading(true);
    console.log(`page111= ${page} sort = ${sort} search = ${search}`);
    const Category = await GetCategories(page, sort, search, limit);
    console.log("Category Data 111", Category)
    setData(Category.data);
    setTotal(Category.total);
    setpageNme(page)
    setLoading(false);

  }

  const totalPages = Math.ceil(total / limit);
  useEffect(() => {
    setclient(true);
    getCategoryHandle(1);

  }, [])

  const handleDeleteCategory = async (id, imageId) => {
    console.log("Cated _ID", imageId);
    //alert(imageId);
    const confirmed = window.confirm("Are you sure you want to delete this category?");

    if (!confirmed) return; // user canceled

    const result = await deleteCategorybyId(id, imageId);
    if (result) {
      setMessage("Success", "Category Deleted Successfully!");
      await getCategoryHandle(1)
    }


  }
  if (!client) return null;

  if (loading) return (<div className="flex flex-col justify-center  items-center h-screen"><div>Loading...</div></div>)
  return (
    <>
 <div className="rounded-md flex flex-col text-[#252525] px-2 md:px-6">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-[#f9fafb] pb-4">
    <div className="w-full md:w-1/2">
      <div className="text-base md:text-xl font-semibold flex items-center uppercase gap-2">
        <List size={36} />
        <span>Category / Listing </span>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
      <Search getCategoryHandle={getCategoryHandle} />
      <CatFilter getCategoryHandle={getCategoryHandle} />
    </div>
  </div>

  {/* Toast Message */}
  {message && (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
      <CheckCircle className="w-5 h-5 text-white" />
      <span className="font-medium">{message.text}</span>
    </div>
  )}

  {/* Table Content */}
  {data ? (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm bg-white border border-[#f9fafb]">
        <Table className="w-full text-sm text-gray-700">
          <TableHeader className="bg-gray-50 border-b border-[#f9fafb]">
            <TableRow>
              <TableHead className="py-3 px-4">#</TableHead>
              <TableHead className="py-3 px-4">Image</TableHead>
              <TableHead className="py-3 px-4">Name</TableHead>
              <TableHead className="py-3 px-4">Slug</TableHead>
              <TableHead className="py-3 px-4">Description</TableHead>
              <TableHead className="py-3 px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="py-3 px-4">{i + 1}</TableCell>
                <TableCell className="py-3 px-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md border"
                    />
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 font-medium">
                  {item.name}
                </TableCell>
                <TableCell className="py-3 px-4">{item.slug}</TableCell>
          <TableCell className="py-3 px-4 whitespace-normal break-words">
  {item.description}
</TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`${domain}/editcategory/${item._id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={20} />
                    </Link>
                    <Delete
                      size={20}
                      className="text-red-600 hover:text-red-800 cursor-pointer transition"
                      onClick={() =>
                        handleDeleteCategory(item._id, item.publicId)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4 mt-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="border border-[#f9fafb] rounded-lg shadow-md bg-white p-4 space-y-3"
          >
            <div className="text-sm font-semibold text-gray-700">
              No# {i + 1}
            </div>
            {/* {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md border"
              />
            )} */}
            <div className="text-sm text-gray-800">
              <strong>Name:</strong> {item.name}
            </div>
            <div className="text-sm text-gray-800">
              <strong>Slug:</strong> {item.slug}
            </div>
            <div className="text-sm text-gray-800">
              <strong>Description:</strong> {item.description}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Link
                href={`${domain}/editcategory/${item._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={20} />
              </Link>
              <Delete
                size={20}
                className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => handleDeleteCategory(item._id, item.publicId)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Pagination */}
      <div className="border-t border-[#f9fafb] mt-6 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
        <div className="italic font-medium text-gray-600">
          Total Items: {total}
        </div>
        <CatPagination
          total={totalPages}
          getCategoryHandle={getCategoryHandle}
          pageNum={pageNum}
        />
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500 py-10 text-lg">
      Categories Not Found Yet!
    </div>
  )}
</div>


    </>
  );
}
