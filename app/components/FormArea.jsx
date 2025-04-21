

// 'use client'
// import React, { useRef, useState } from 'react'
// import { useDrop } from 'react-dnd'
// import { v4 as uuidv4 } from 'uuid'
// import FieldPropertiesPanel from './FieldPropertiesPanel'


// const FormBuilder = () => {
//   const [fieldsets, setFieldsets] = useState([])
//   console.log(fieldsets)
//   const [selectedField, setSelectedField] = useState(null)
// const [selectedFieldsetIndex, setSelectedFieldsetIndex] = useState(null)
//   const isHandlingDrop = useRef(false)

//     const handleDropToNewFieldset = (item) => {
//     if (isHandlingDrop.current) return
//     isHandlingDrop.current = true
//     setTimeout(() => {
//       isHandlingDrop.current = false
//     }, 100)
  
//     const newField = buildField(item)
//     const id = uuidv4()
  
//     setFieldsets((prev) => {
//       const nextFieldsetNum = prev.length + 1
  
//       const newFieldset = {
//         fieldsetName: `Fieldset ${nextFieldsetNum}`,
//         fieldsetTextId: `fieldset-${id}`,
//         fields: [newField],
//       }
  
//       return [...prev, newFieldset]
//     })
//   }
//   const buildField = (item) => {
//     const defaultOptions =
//       item.type === 'select'
//         ? ['option1', 'option2', 'option3']
//         : item.type === 'radio'
//         ? ['optionA', 'optionB']
//         : item.type === 'range'
//         ? ['1', '2', '3', '4', '5']
//         : ''

//     return {
//       labelName: item.label,
//       labelTextId: item.label.toLowerCase().replace(/\s+/g, '') + '-' + uuidv4(),
//       inputType: item.type,
//       options: defaultOptions,
//     }
//   }

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'FIELD',
//     drop: (item, monitor) => {
//       if (monitor.didDrop()) return
//       handleDropToNewFieldset(item)
//       return { handled: true }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver({ shallow: true }),
//     }),
//   }))

//   const handleDropToExistingFieldset = (item, index) => {
//     const newField = buildField(item)
//     setFieldsets((prevFieldsets) =>
//       prevFieldsets.map((fs, i) =>
//         i === index ? { ...fs, fields: [...fs.fields, newField] } : fs
//       )
//     )
//   }

//   const updateField = (fieldsetId, fieldId, updatedField) => {
//     setFieldsets(prev =>
//       prev.map(fs =>
//         fs.fieldsetTextId === fieldsetId
//           ? {
//               ...fs,
//               fields: fs.fields.map(f =>
//                 f.labelTextId === fieldId ? { ...f, ...updatedField } : f
//               ),
//             }
//           : fs
//       )
//     )
//   }
//   const handleFieldClick = (fieldsetIndex, field) => {
//     setSelectedField(field)
//     setSelectedFieldsetIndex(fieldsetIndex)
//   }
//   const handleUpdateField = (updatedField) => {
//     setFieldsets((prev) =>
//       prev.map((fs, i) => {
//         if (i !== selectedFieldsetIndex) return fs;
  
//         const updatedFields = fs.fields.map((f) =>
//           f.labelTextId === updatedField.labelTextId ? updatedField : f
//         )
  
//         return {
//           ...fs,
//           fields: updatedFields,
//         }
//       })
//     )
  
//     // Close panel
//     setSelectedField(null)
//     setSelectedFieldsetIndex(null)
//   }
  
//   const handleUpdateFieldsetName = (newName) => {
//     setFieldsets((prev) =>
//       prev.map((fs, i) =>
//         i === selectedFieldsetIndex ? { ...fs, fieldsetName: newName } : fs
//       )
//     )
//   }
//   const handleDeleteField = () => {
//     setFieldsets((prev) =>
//       prev.map((fs, i) =>
//         i === selectedFieldsetIndex
//           ? {
//               ...fs,
//               fields: fs.fields.filter((f) => f.labelTextId !== selectedField.labelTextId),
//             }
//           : fs
//       )
//     )
//     setSelectedField(null)
//     setSelectedFieldsetIndex(null)
//   }
//   const updateFieldsetName = (fieldsetId, newName) => {
//     setFieldsets(prev =>
//       prev.map(fs =>
//         fs.fieldsetTextId === fieldsetId ? { ...fs, fieldsetName: newName } : fs
//       )
//     )
//   }
//   const handleApply = () => {
//     if (!selectedField) return;
//     onApplyChanges(selectedField);
//     onChangeFieldsetName(fieldsetNameInput);
//   }
//   return (
//     <div className="">
//       <h2 className="text-lg font-semibold mb-4">Your Modules</h2>
//       <div
//         ref={drop}
//         className={` border-2 min-h-screen rounded w-3/4 ${isOver ? 'border-green-400 bg-green-50' : ''}`}
//       >
//         {fieldsets.length === 0 && (
//           <p className="text-gray-500 italic text-sm">Drag a field to get started...</p>
//         )}
//         {fieldsets.map((fs, i) => (
//           <Fieldset
//             key={fs.fieldsetTextId}
//             fieldset={fs}
//             onFieldClick={(field) => handleFieldClick(i, field)}
//             onDropField={(item) => handleDropToExistingFieldset(item, i)}
//             setSelectedField={setSelectedField}
//             updateFieldsetName={updateFieldsetName}
//           />
//         ))}
//       </div>
//       <FieldPropertiesPanel
//   selectedField={selectedField}
//   fieldsetName={
//     selectedFieldsetIndex !== null
//       ? fieldsets[selectedFieldsetIndex]?.fieldsetName
//       : ''
//   }
//   onChangeLabel={(label) =>
//     setSelectedField((prev) => ({ ...prev, labelName: label }))
//   }
//   onChangeOptions={(options) =>
//     setSelectedField((prev) => ({ ...prev, options }))
//   }
  
//   onDeleteField={handleDeleteField}
//   onChangeFieldsetName={handleUpdateFieldsetName}
//   onApplyChanges={(updatedField) => handleUpdateField(updatedField)}
// />
//     </div>
//   )
// }

// const Fieldset = ({ fieldset, onDropField, setSelectedField, updateFieldsetName }) => {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'FIELD',
//     drop: (item, monitor) => {
//       if (monitor.didDrop()) return
//       onDropField(item)
//       return { handled: true }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }))

//   return (
//     <fieldset
//       ref={drop}
//       className={`mb-6 p-4 border rounded bg-white shadow-sm transition-all ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}
//     >
//       <input
//         className="font-semibold text-lg mb-4 w-full border-b"
//         value={fieldset.fieldsetName}
//         onChange={(e) => updateFieldsetName(fieldset.fieldsetTextId, e.target.value)}
//       />
//       <div className="space-y-4">
//         {fieldset.fields.map((field, idx) => (
//           <div onClick={() => setSelectedField({ ...field, fieldsetId: fieldset.fieldsetTextId })} key={field.labelTextId + idx}>
//             <Field field={field} />
//           </div>
//         ))}
//       </div>
//     </fieldset>
//   )
// }

// const Field = ({ field }) => {
//   const common = 'border rounded px-3 py-2 w-full'
//   switch (field.inputType) {
//     case 'text':
//     case 'number':
//     case 'email':
//     case 'password':
//     case 'date':
//     case 'file':
//       return (
//         <div className="p-4 border-gray-300 border rounded-lg ">
//           <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
//           <input type={field.inputType} placeholder={field.labelName} className={common} disabled />
//         </div>
//       )
//     case 'textarea':
//       return (
//         <div className="p-4 border-gray-300 border rounded-lg ">
//           <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
//           <textarea placeholder={field.labelName} className={`${common} resize-none`} rows="3" disabled />
//         </div>
//       )
//     case 'select':
//       return (
//         <div className="p-4 border-gray-300 border rounded-lg ">
//           <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
//           <select className={common} disabled>
//             {field.options.map((opt, i) => (
//               <option key={i} value={opt}>{opt}</option>
//             ))}
//           </select>
//         </div>
//       )
//     case 'checkbox':
//       return (
//         <div className="flex items-center space-x-2">
//           <input type="checkbox" className="form-checkbox" disabled />
//           <label>{field.labelName}</label>
//         </div>
//       )
//     case 'radio':
//       return (
//         <div className="p-4 border-gray-300 border rounded-lg ">
//           <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
//           <div className="space-x-4">
//             {field.options.map((opt, i) => (
//               <label key={i} className="inline-flex items-center space-x-1">
//                 <input type="radio" name={field.labelTextId} disabled />
//                 <span>{opt}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )
//     default:
//       return null
//   }
// }

// export default FormBuilder


'use client'
import React, { useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import FieldPropertiesPanel from './FieldPropertiesPanel'

const FormBuilder = () => {
  const [fieldsets, setFieldsets] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [selectedFieldsetIndex, setSelectedFieldsetIndex] = useState(null)
  const isHandlingDrop = useRef(false)
  console.log(fieldsets)
  const handleDropToNewFieldset = (item) => {
    if (isHandlingDrop.current) return
    isHandlingDrop.current = true
    setTimeout(() => {
      isHandlingDrop.current = false
    }, 100)

    const newField = buildField(item)
    const id = uuidv4()

    setFieldsets((prev) => {
      const nextFieldsetNum = prev.length + 1
      const newFieldset = {
        fieldsetName: `Fieldset ${nextFieldsetNum}`,
        fieldsetTextId: `fieldset-${id}`,
        fields: [newField],
      }

      return [...prev, newFieldset]
    })
  }

  const buildField = (item) => {
    const defaultOptions =
      item.type === 'select'
        ? ['option1', 'option2', 'option3']
        : item.type === 'radio'
        ? ['optionA', 'optionB']
        : item.type === 'range'
        ? ['1', '2', '3', '4', '5']
        : ''

    return {
      labelName: item.label,
      labelTextId: item.label.toLowerCase().replace(/\s+/g, '') + '-' + uuidv4(),
      inputType: item.type,
      options: defaultOptions,
    }
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item, monitor) => {
      if (monitor.didDrop()) return
      handleDropToNewFieldset(item)
      return { handled: true }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }))

  const handleDropToExistingFieldset = (item, index) => {
    const newField = buildField(item)
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fs, i) =>
        i === index ? { ...fs, fields: [...fs.fields, newField] } : fs
      )
    )
  }

  const updateField = (fieldsetId, fieldId, updatedField) => {
    setFieldsets((prev) =>
      prev.map((fs) =>
        fs.fieldsetTextId === fieldsetId
          ? {
              ...fs,
              fields: fs.fields.map((f) =>
                f.labelTextId === fieldId ? { ...f, ...updatedField } : f
              ),
            }
          : fs
      )
    )
  }

  const handleFieldClick = (fieldsetIndex, field) => {
    setSelectedField({ ...field, fieldsetId: fieldsets[fieldsetIndex].fieldsetTextId })
    setSelectedFieldsetIndex(fieldsetIndex)
  }

  const handleUpdateField = (updatedField) => {
    setFieldsets((prev) =>
      prev.map((fs) =>
        fs.fieldsetTextId === updatedField.fieldsetId
          ? {
              ...fs,
              fields: fs.fields.map((f) =>
                f.labelTextId === updatedField.labelTextId ? updatedField : f
              ),
            }
          : fs
      )
    )
  
    // Clear panel
    setSelectedField(null)
    setSelectedFieldsetIndex(null)
  }
  

  const handleUpdateFieldsetName = (newName) => {
    setFieldsets((prev) =>
      prev.map((fs) =>
        fs.fieldsetTextId === selectedFieldsetIndex
          ? { ...fs, fieldsetName: newName }
          : fs
      )
    )
  }

  const handleDeleteField = () => {
    setFieldsets((prev) =>
      prev.map((fs, i) =>
        i === selectedFieldsetIndex
          ? {
              ...fs,
              fields: fs.fields.filter((f) => f.labelTextId !== selectedField.labelTextId),
            }
          : fs
      )
    )
    setSelectedField(null)
    setSelectedFieldsetIndex(null)
  }
  
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Your Modules</h2>
      <div
        ref={drop}
        className={`border-2 min-h-screen rounded w-3/4 ${isOver ? 'border-green-400 bg-green-50' : ''}`}
      >
        {fieldsets.length === 0 && (
          <p className="text-gray-500 italic text-sm">Drag a field to get started...</p>
        )}
        {fieldsets.map((fs, i) => (
          <Fieldset
            key={fs.fieldsetTextId}
            fieldset={fs}
            onFieldClick={(field) => handleFieldClick(i, field)}
            onDropField={(item) => handleDropToExistingFieldset(item, i)}
            setSelectedField={setSelectedField}
            updateFieldsetName={(name) => handleUpdateFieldsetName(name)}
          />
        ))}
      </div>

      {selectedField && (
        <FieldPropertiesPanel
          selectedField={selectedField}
          fieldsetName={fieldsets[selectedFieldsetIndex]?.fieldsetName || ''}
          onChangeLabel={(label) =>
            setSelectedField((prev) => ({ ...prev, labelName: label }))
          }
          onChangeOptions={(options) =>
            setSelectedField((prev) => ({ ...prev, options }))
          }
          onDeleteField={handleDeleteField}
          onChangeFieldsetName={(name) => handleUpdateFieldsetName(name)}
          onApplyChanges={(updatedField) => handleUpdateField(updatedField)}
        />
      )}
    </div>
  )
}

const Fieldset = ({ fieldset, onDropField, setSelectedField, updateFieldsetName }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item, monitor) => {
      if (monitor.didDrop()) return
      onDropField(item)
      return { handled: true }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <fieldset
      ref={drop}
      className={`mb-6 p-4 border rounded bg-white shadow-sm transition-all ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}
    >
      <input
        className="font-semibold text-lg mb-4 w-full border-b"
        value={fieldset.fieldsetName}
        onChange={(e) => updateFieldsetName(e.target.value)}
      />
      <div className="space-y-4">
        {fieldset.fields.map((field, idx) => (
          <div onClick={() => setSelectedField(field)} key={field.labelTextId + idx}>
            <Field field={field} />
          </div>
        ))}
      </div>
    </fieldset>
  )
}

const Field = ({ field }) => {
  const common = 'border rounded px-3 py-2 w-full'
  switch (field.inputType) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    case 'date':
    case 'file':
      return (
        <div className="p-4 border-gray-300 border rounded-lg">
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <input type={field.inputType} placeholder={field.labelName} className={common} disabled />
        </div>
      )
    case 'textarea':
      return (
        <div className="p-4 border-gray-300 border rounded-lg">
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <textarea placeholder={field.labelName} className={`${common} resize-none`} rows="3" disabled />
        </div>
      )
    case 'select':
      return (
        <div className="p-4 border-gray-300 border rounded-lg">
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <select className={common} disabled>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" disabled />
          <label>{field.labelName}</label>
        </div>
      )
    case 'radio':
      return (
        <div className="p-4 border-gray-300 border rounded-lg">
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <div className="space-x-4">
            {field.options.map((opt, i) => (
              <label key={i} className="inline-flex items-center space-x-2">
                <input type="radio" name={field.labelName} value={opt} disabled />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    case 'range':
      return (
        <div className="p-4 border-gray-300 border rounded-lg">
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <input type="range" className={common} disabled />
        </div>
      )
    default:
      return null
  }
}

export default FormBuilder
