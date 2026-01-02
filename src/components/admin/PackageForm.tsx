'use client'

import { useState, useEffect } from 'react'
import FormField from './FormField'
import Button from './Button'
import Image from 'next/image'

interface PackageFormData {
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  currency: string
  duration: number
  destination: string
  destinations: string[]
  category: string
  inclusions: string[]
  exclusions: string[]
  highlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities: string[]
  }>
  isActive: boolean
  isFeatured: boolean
  minTravelers: number
  maxTravelers?: number
  tags: string[]
  thumbnail?: File | string
}

interface PackageFormProps {
  initialData?: Partial<PackageFormData>
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting?: boolean
}

const categories = ['luxury', 'adventure', 'family', 'corporate', 'honeymoon', 'group', 'solo', 'other']
const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED']

export default function PackageForm({ initialData, onSubmit, isSubmitting = false }: PackageFormProps) {
  const [formData, setFormData] = useState<PackageFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    price: initialData?.price || 0,
    currency: initialData?.currency || 'USD',
    duration: initialData?.duration || 1,
    destination: initialData?.destination || '',
    destinations: initialData?.destinations || [],
    category: initialData?.category || 'other',
    inclusions: initialData?.inclusions || [],
    exclusions: initialData?.exclusions || [],
    highlights: initialData?.highlights || [],
    itinerary: initialData?.itinerary || [],
    isActive: initialData?.isActive ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    minTravelers: initialData?.minTravelers || 1,
    maxTravelers: initialData?.maxTravelers,
    tags: initialData?.tags || [],
    thumbnail: initialData?.thumbnail,
  })

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [newDestination, setNewDestination] = useState('')
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')
  const [newHighlight, setNewHighlight] = useState('')
  const [newTag, setNewTag] = useState('')

  // Generate slug from title
  useEffect(() => {
    if (!initialData?.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, initialData?.slug])

  // Handle thumbnail preview
  useEffect(() => {
    if (typeof formData.thumbnail === 'string' && formData.thumbnail) {
      setThumbnailPreview(`/packages/${formData.thumbnail}`)
    } else if (formData.thumbnail instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(formData.thumbnail)
    }
  }, [formData.thumbnail])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'thumbnail' && value instanceof File) {
        formDataToSend.append(key, value)
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value))
      } else if (typeof value === 'boolean') {
        formDataToSend.append(key, value.toString())
      } else if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    })

    await onSubmit(formDataToSend)
  }

  const addArrayItem = (field: 'destinations' | 'inclusions' | 'exclusions' | 'highlights' | 'tags', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
    }
    if (field === 'destinations') setNewDestination('')
    if (field === 'inclusions') setNewInclusion('')
    if (field === 'exclusions') setNewExclusion('')
    if (field === 'highlights') setNewHighlight('')
    if (field === 'tags') setNewTag('')
  }

  const removeArrayItem = (field: 'destinations' | 'inclusions' | 'exclusions' | 'highlights' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
          />
        </div>
        <FormField
          label="Short Description"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          textarea
          rows={3}
        />
        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          textarea
          rows={6}
          required
        />
      </div>

      {/* Pricing & Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Pricing & Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            required
          />
          <FormField
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          >
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </FormField>
          <FormField
            label="Duration (days)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            required
          />
          <FormField
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Thumbnail</h2>
        {thumbnailPreview && (
          <div className="mb-4">
            <Image
              src={thumbnailPreview}
              alt="Thumbnail preview"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
        />
        {!initialData && (
          <p className="text-sm text-gray-500 mt-2">Thumbnail is required for new packages</p>
        )}
      </div>

      {/* Destinations Array */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Additional Destinations</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('destinations', newDestination))}
            placeholder="Add destination"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
          />
          <Button type="button" onClick={() => addArrayItem('destinations', newDestination)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.destinations.map((dest, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {dest}
              <button
                type="button"
                onClick={() => removeArrayItem('destinations', index)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Inclusions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Inclusions</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newInclusion}
            onChange={(e) => setNewInclusion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('inclusions', newInclusion))}
            placeholder="Add inclusion"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
          />
          <Button type="button" onClick={() => addArrayItem('inclusions', newInclusion)}>
            Add
          </Button>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {formData.inclusions.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeArrayItem('inclusions', index)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Exclusions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Exclusions</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newExclusion}
            onChange={(e) => setNewExclusion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('exclusions', newExclusion))}
            placeholder="Add exclusion"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
          />
          <Button type="button" onClick={() => addArrayItem('exclusions', newExclusion)}>
            Add
          </Button>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {formData.exclusions.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeArrayItem('exclusions', index)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Highlights</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('highlights', newHighlight))}
            placeholder="Add highlight"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
          />
          <Button type="button" onClick={() => addArrayItem('highlights', newHighlight)}>
            Add
          </Button>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {formData.highlights.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeArrayItem('highlights', index)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Tags</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('tags', newTag))}
            placeholder="Add tag"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
          />
          <Button type="button" onClick={() => addArrayItem('tags', newTag)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span key={index} className="bg-uocGold/10 text-uocGold px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {tag}
              <button
                type="button"
                onClick={() => removeArrayItem('tags', index)}
                className="text-uocGold hover:text-uocGold/80"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 text-uocGold border-gray-300 rounded focus:ring-uocGold"
            />
            <label htmlFor="isActive" className="ml-2 text-gray-700">Active</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
              className="w-4 h-4 text-uocGold border-gray-300 rounded focus:ring-uocGold"
            />
            <label htmlFor="isFeatured" className="ml-2 text-gray-700">Featured</label>
          </div>
          <FormField
            label="Min Travelers"
            name="minTravelers"
            type="number"
            value={formData.minTravelers}
            onChange={(e) => setFormData(prev => ({ ...prev, minTravelers: parseInt(e.target.value) || 1 }))}
          />
          <FormField
            label="Max Travelers (optional)"
            name="maxTravelers"
            type="number"
            value={formData.maxTravelers || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, maxTravelers: e.target.value ? parseInt(e.target.value) : undefined }))}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update Package' : 'Create Package'}
        </Button>
      </div>
    </form>
  )
}

