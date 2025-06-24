'use client'
import React from 'react'



function CatFilter({getVariationsHandle}) {
    const handleChange = (e) => {
    const sort = parseInt(e.target.value);
    getVariationsHandle(1,sort); // 1 for Asc, -1 for Desc
  };
 return (
  <div className="flex items-center space-x-2 text-sm text-[#252525]">
  <label htmlFor="sort" className="font-medium">
    Sort:
  </label>
  <select
    id="sort"
    onChange={handleChange}
    defaultValue=""
    className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm shadow-sm focus:outline-none  transition-colors"
  >
    <option disabled value="">
      Select sorting
    </option>
    <option value="1">Name Ascending (A → Z)</option>
    <option value="-1">Name Descending (Z → A)</option>
  </select>
</div>

  )
}

export default CatFilter