'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PackageForm from './PackageForm'

interface EditPackageFormProps {
  packageId: string
  initialData: any
}

export default function EditPackageForm({ packageId, initialData }: EditPackageFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'PUT',
        body: formData,
      })

      if (response.ok) {
        router.push('/admin/packages')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update package')
      }
    } catch (error) {
      console.error('Error updating package:', error)
      alert('An error occurred while updating the package')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Transform initial data for the form
  const transformedData = {
    ...initialData,
    destinations: initialData.destinations || [],
    inclusions: initialData.inclusions || [],
    exclusions: initialData.exclusions || [],
    highlights: initialData.highlights || [],
    tags: initialData.tags || [],
    itinerary: initialData.itinerary || [],
    thumbnail: initialData.thumbnail || '',
  }

  return (
    <PackageForm
      initialData={transformedData}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}

