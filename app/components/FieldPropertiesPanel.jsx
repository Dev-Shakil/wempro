'use client'
import React, { useEffect, useState } from 'react'

const FieldPropertiesPanel = ({
  selectedField,
  fieldsetName,
  onDeleteField,
  onApplyChanges,
  onChangeFieldsetName,
}) => {
  const [labelName, setLabelName] = useState('')
  const [options, setOptions] = useState([])
  const [fieldsetInput, setFieldsetInput] = useState('')

  useEffect(() => {
    if (selectedField) {
      setLabelName(selectedField.labelName)
      setOptions(selectedField.options || [])
      setFieldsetInput(fieldsetName || '')
    }
  }, [selectedField, fieldsetName])

  if (!selectedField) return null

  const handleApply = () => {
    onApplyChanges({
      ...selectedField,
      labelName,
      options,
    })
    onChangeFieldsetName(fieldsetInput)
  }

  const handleDelete = () => {
    onDeleteField()
  }

  return (
    <div className="w-1/4 p-4 h-fit border-l bg-gray-50">
      <h2 className="font-semibold text-lg mb-4">Field Properties</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Field Label</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
        />
      </div>

      {Array.isArray(options) && options.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Options (comma separated)</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={options.join(',')}
            onChange={(e) => setOptions(e.target.value.split(','))}
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Fieldset Name</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={fieldsetInput}
          onChange={(e) => setFieldsetInput(e.target.value)}
        />
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default FieldPropertiesPanel