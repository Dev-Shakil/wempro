import React, { useState, useEffect } from 'react'

const FieldPropertiesPanel = ({
  selectedField,
  fieldsetName,
  onChangeLabel,
  onChangeOptions,
  onDeleteField,
  onChangeFieldsetName,
  onApplyChanges
}) => {
  const [labelName, setLabelName] = useState(selectedField?.labelName || "");
const [options, setOptions] = useState(selectedField?.options || []);
  const [newOption, setNewOption] = useState('')

  useEffect(() => {
    if (selectedField) {
      setLabelName(selectedField.labelName)
      setOptions(selectedField.options || [])
    }
  }, [selectedField])

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption.trim()])
      setNewOption('')
    }
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    setOptions(updatedOptions)
  }

  const handleLabelChange = (event) => {
    setLabel(event.target.value)
    onChangeLabel(event.target.value)
  }

  

  return (
    <div className="border-2 p-4 rounded-md shadow-lg bg-white max-w-xs mx-auto">
      <h3 className="text-lg font-semibold mb-4">Field Properties</h3>
      <div className="mb-4">
        <label className="block mb-2">Fieldset Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          value={fieldsetName}
          onChange={(e) => onChangeFieldsetName(e.target.value)}
        />
      </div>

      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Label Name</label>
  <input
    type="text"
    value={labelName}
    onChange={(e) => setLabelName(e.target.value)}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
  />
</div>
      {selectedField?.inputType === 'select' || selectedField?.inputType === 'radio' ? (
        <>
          <div className="mb-4">
            <label className="block mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  className="w-3/4 px-3 py-2 border rounded-md"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex mb-4">
              <input
                type="text"
                className="w-3/4 px-3 py-2 border rounded-md"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
              />
              <button
                type="button"
                className="ml-2 text-green-500"
                onClick={handleAddOption}
              >
                Add
              </button>
            </div>
          </div>
        </>
      ) : null}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="text-red-500"
          onClick={onDeleteField}
        >
          Delete Field
        </button>
        <button
  className="px-4 py-2 bg-blue-500 text-white rounded"
  onClick={() => {
    onApplyChanges({
      ...selectedField,
      labelName,
      options,
    });
  }}
>
  Apply
</button>
      </div>
    </div>
  )
}

export default FieldPropertiesPanel
