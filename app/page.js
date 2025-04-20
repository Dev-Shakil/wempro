'use client'
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import FormArea from "./components/FormArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "./components/FormArea";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="bg-gray-200 h-screen flex">
      <div className="w-2/6 md:w-1/5 px-6 py-3">
        <Sidebar/>
      </div>
      <div className=" overflow-y-auto py-3 md:w-3/5">
        <FormBuilder/>
      </div>
      
    </div>
    </DndProvider>
  );
}
