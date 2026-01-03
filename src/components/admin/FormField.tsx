import React from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  required?: boolean
  error?: string
  children?: React.ReactNode
  textarea?: boolean
  rows?: number
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  children,
  textarea = false,
  rows = 4,
}: FormFieldProps) {
  const baseInputStyles = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none transition-all text-gray-900 bg-white'
  const errorStyles = error ? 'border-red-500' : 'border-gray-300'
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseInputStyles} ${errorStyles} text-gray-900 bg-white`}
        />
      ) : children ? (
        children
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseInputStyles} ${errorStyles}`}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

