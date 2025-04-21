

'use client'
import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

const FormBuilder = () => {
  const [fieldsets, setFieldsets] = useState([])
  const [fieldsetCount, setFieldsetCount] = useState(1) // 🔥 Ensures unique fieldset names
  console.log(fieldsets)
  const handleDropToNewFieldset = (item) => {
    setFieldsetCount((prev) => {
      const id = uuidv4()
      const newField = buildField(item)
  
      const newFieldset = {
        fieldsetName: `Fieldset ${prev}`, // ✅ Use the current value here
        fieldsetTextId: `fieldset-${id}`,
        fields: [newField],
      }
  
      setFieldsets((prevFieldsets) => [...prevFieldsets, newFieldset])
      return prev + 1 // ✅ return the incremented value
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
      // 🔥 Prevent drop propagation
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
    const updated = [...fieldsets]
    updated[index].fields.push(newField)
    setFieldsets(updated)
  }

  return (
    <div
      ref={drop}
      className={`p-4 border-2 min-h-screen rounded border-dashed ${isOver ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
    >
      {fieldsets.length === 0 && (
        <p className="text-gray-500 italic text-sm">Drag a field to get started...</p>
      )}
      {fieldsets.map((fs, i) => (
        <Fieldset
          key={fs.fieldsetTextId}
          fieldset={fs}
          onDropField={(item) => handleDropToExistingFieldset(item, i)}
        />
      ))}
    </div>
  )
}

const Fieldset = ({ fieldset, onDropField }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item, monitor) => {
      if (monitor.didDrop()) return // ✅ prevent duplicate handling
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
      <legend className="font-semibold text-lg mb-4">{fieldset.fieldsetName}</legend>
      <div className="space-y-4">
        {fieldset.fields.map((field, idx) => (
          <Field key={field.labelTextId + idx} field={field} />
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
        <div>
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <input type={field.inputType} placeholder={field.labelName} className={common} />
        </div>
      )
    case 'textarea':
      return (
        <div>
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <textarea placeholder={field.labelName} className={`${common} resize-none`} rows="3" />
        </div>
      )
    case 'select':
      return (
        <div>
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <select className={common}>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <label>{field.labelName}</label>
        </div>
      )
    case 'radio':
      return (
        <div>
          <label className="block mb-1 font-medium text-sm">{field.labelName}</label>
          <div className="space-x-4">
            {field.options.map((opt, i) => (
              <label key={i} className="inline-flex items-center space-x-1">
                <input type="radio" name={field.labelTextId} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}

export default FormBuilder

