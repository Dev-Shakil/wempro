// import React from "react";
// import { RiRectangleLine } from "react-icons/ri";
// import { RxDropdownMenu } from "react-icons/rx";
// import { FaRegCircle } from "react-icons/fa";
// import { BsCalendar2Date } from "react-icons/bs";
// import { FaRegSquareFull } from "react-icons/fa6";
// import { MdLabel } from "react-icons/md";
// import { RxText } from "react-icons/rx";
// import { PiDotsSixVerticalBold } from "react-icons/pi";
// const Sidebar = () => {
//   const fieldIcons = [
//     <RiRectangleLine />,
//     <RiRectangleLine />,
//     <RxDropdownMenu />,
//     <RxDropdownMenu />,
//     <FaRegCircle />,
//     <FaRegSquareFull />,
//     <BsCalendar2Date />,
//     <MdLabel />,
//     <RxText />,
//   ];
//   return (
//     <div className="">
//       <h2 className="text-lg font-semibold mb-4">Custom Field</h2>
//       <div className="space-y-4">
//         {[
//           "Text Field",
//           "Number Input",
//           "Radio Button",
//           "Number Combo Box",
//           "Combo Box / Dropdown",
//           "Checkbox",
//           "Datepicker",
//           "Label",
//           "Text Area",
//         ].map((field, i) => (
//           <div
//             key={i}
//             className="p-3 rounded-lg bg-white cursor-pointer flex items-center justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <span className="text-gray-600 text-2xl">{fieldIcons[i]}</span>
//               {field}
//             </div>
//             <PiDotsSixVerticalBold className="text-gray-600 text-2xl"/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// 'use client'
// import React from "react";
// import { useDrag } from "react-dnd";
// import { PiDotsSixVerticalBold } from "react-icons/pi";
// import { RiRectangleLine } from "react-icons/ri";
// import { RxDropdownMenu } from "react-icons/rx";
// import { FaRegCircle } from "react-icons/fa";
// import { BsCalendar2Date } from "react-icons/bs";
// import { FaRegSquareFull } from "react-icons/fa6";
// import { MdLabel } from "react-icons/md";
// import { RxText } from "react-icons/rx";

// const fieldTypes = [
//   { label: "Text Field", type: "text", icon: <RiRectangleLine /> },
//   { label: "Number Input", type: "number", icon: <RiRectangleLine /> },
//   { label: "Radio Button", type: "radio", icon: <FaRegCircle /> },
//   { label: "Number Combo Box", type: "numberCombo", icon: <RxDropdownMenu /> },
//   { label: "Combo Box / Dropdown", type: "dropdown", icon: <RxDropdownMenu /> },
//   { label: "Checkbox", type: "checkbox", icon: <FaRegSquareFull /> },
//   { label: "Datepicker", type: "date", icon: <BsCalendar2Date /> },
//   { label: "Label", type: "label", icon: <MdLabel /> },
//   { label: "Text Area", type: "textarea", icon: <RxText /> }
// ];

// const DraggableItem = ({ field }) => {
//   const [{ isDragging }, dragRef] = useDrag(() => ({
//     type: "form-element",
//     item: field,
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={dragRef}
//       className={`p-3 rounded-lg bg-white cursor-move flex items-center justify-between ${isDragging ? "opacity-50" : ""}`}
//     >
//       <div className="flex items-center gap-4">
//         <span className="text-gray-600 text-2xl">{field.icon}</span>
//         {field.label}
//       </div>
//       <PiDotsSixVerticalBold className="text-gray-600 text-2xl" />
//     </div>
//   );
// };

// const Sidebar = () => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">Custom Field</h2>
//       <div className="space-y-4">
//         {fieldTypes.map((field, idx) => (
//           <DraggableItem key={idx} field={field} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// 'use client'
// import React from 'react'
// import { useDrag } from 'react-dnd'

// const items = [
//   { type: 'text', label: 'Text Field' },
//   { type: 'number', label: 'Number Input' },
//   { type: 'select', label: 'Select Box' },
//   { type: 'textarea', label: 'Textarea' },
//   { type: 'checkbox', label: 'Checkbox' },
//   { type: 'radio', label: 'Radio Group' },
//   { type: 'email', label: 'Email Input' },
//   { type: 'password', label: 'Password Input' },
//   { type: 'date', label: 'Date Picker' },
//   { type: 'file', label: 'File Upload' },
// ]

// const Sidebar = () => {
//   return (
//     <div className="p-4 bg-gray-100 h-full">
//       <h2 className="text-lg font-semibold mb-4">Drag a Field</h2>
//       {items.map((item, index) => (
//         <DraggableField key={index} item={item} />
//       ))}
//     </div>
//   )
// }

// const DraggableField = ({ item }) => {
//   const [, drag] = useDrag(() => ({
//     type: 'FIELD',
//     item,
//   }))

//   return (
//     <div
//       ref={drag}
//       className="bg-white border rounded p-2 cursor-move mb-2 shadow text-sm"
//     >
//       {item.label}
//     </div>
//   )
// }

// export default Sidebar

'use client'
import React from 'react'
import { useDrag } from 'react-dnd'

const items = [
  { type: 'text', label: 'Text Field' },
  { type: 'number', label: 'Number Input' },
  { type: 'select', label: 'Select Box' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio Group' },
  { type: 'email', label: 'Email Input' },
  { type: 'password', label: 'Password Input' },
  { type: 'date', label: 'Date Picker' },
  { type: 'file', label: 'File Upload' },
]

const Sidebar = () => {
  return (
    <div className="p-4 bg-gray-100 h-full">
      <h2 className="text-lg font-semibold mb-4">Drag a Field</h2>
      {items.map((item, index) => (
        <DraggableField key={index} item={item} />
      ))}
    </div>
  )
}

export const DraggableField = ({ item }) => {
  const [, drag] = useDrag(() => ({
    type: 'FIELD',
    item,
  }))

  return (
    <div
      ref={drag}
      className="bg-white border rounded p-2 cursor-move mb-2 shadow text-sm"
    >
      {item.label}
    </div>
  )
}

export default Sidebar