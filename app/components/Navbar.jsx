import React from 'react'
import {  IoEyeOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <div className="px-8 py-4 shadow-lg flex items-center justify-between bg-white">
        <div className="flex items-center jus gap-6">
            <div className="text-black font-xl font-bold border-r pr-5">Logo</div>
            <div>
                <h2 className="font-bold text-lg ">Form Builder</h2>
                <p className="text-md text-gray-600 ">Add and customize forms for your needs</p>
            </div>
        </div>
        <div className="flex items-center gap-x-5">
            <p className="text-gray-600">Changes saved 2 mins ago</p>
            <span className="text-blue-700 rounded-xl p-3  bg-gray-200">
            <IoEyeOutline className="text-lg" />
            </span>
           
        </div>
    </div>
  )
}

export default Navbar