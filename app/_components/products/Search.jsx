"use client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Search = ({ getProductHandle }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {

    console.log("My Search text", searchText);
    getProductHandle(1,1,searchText);
    // if (!searchText.trim()) return;

    // try {
    //   const res = await fetch(`/api/search?query=${searchText}`);
    //   const result = await res.json();
    //   onSearch(result); // parent ko data bhejna
    // } catch (error) {
    //   console.error("Search error:", error);
    // }
  };

  return (
   <div className="flex items-center w-full max-w-md relative text-[#252525]">
  <input
    type="text"
    placeholder="Search by name..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-full pr-10 pl-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none transition"
  />
  <SearchIcon
    size={18}
    onClick={handleSearch}
    className="absolute right-3 text-gray-500 hover:text-primary cursor-pointer transition"
  />
</div>
  );
};

export default Search;
