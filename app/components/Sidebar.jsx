


'use client'
import React from 'react'
import { useDrag } from 'react-dnd'
import { PiDotsSixVerticalBold } from 'react-icons/pi'
import { RiRectangleLine } from 'react-icons/ri'
import { RxDropdownMenu, RxText } from 'react-icons/rx'
import { FaRegCircle } from 'react-icons/fa'
import { BsCalendar2Date } from 'react-icons/bs'
import { FaRegSquareFull } from 'react-icons/fa6'
import { MdLabel } from 'react-icons/md'

const fieldTypes = [
  { label: 'Text Field', type: 'text', icon: <RiRectangleLine /> },
  { label: 'Number Input', type: 'number', icon: <RiRectangleLine /> },
  { label: 'Radio Button', type: 'radio', icon: <FaRegCircle /> },
  { label: 'Number Combo Box', type: 'numberCombo', icon: <RxDropdownMenu /> },
  { label: 'Combo Box / Dropdown', type: 'dropdown', icon: <RxDropdownMenu /> },
  { label: 'Checkbox', type: 'checkbox', icon: <FaRegSquareFull /> },
  { label: 'Datepicker', type: 'date', icon: <BsCalendar2Date /> },
  { label: 'Label', type: 'label', icon: <MdLabel /> },
  { label: 'Text Area', type: 'textarea', icon: <RxText /> },
]

const DraggableField = ({ field }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'FIELD',
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={dragRef}
      className={`p-3 rounded-lg bg-white shadow-md cursor-move flex items-center justify-between border ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-xl">{field.icon}</span>
        <span className="text-sm text-gray-800">{field.label}</span>
      </div>
      <PiDotsSixVerticalBold className="text-gray-500 text-xl" />
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className=" h-full rounded-lg space-y-3">
      <h2 className="text-lg font-semibold mb-4">Custom Fields</h2>
      {fieldTypes.map((field, idx) => (
        <DraggableField key={idx} field={field} />
      ))}
    </div>
  )
}

export default Sidebar