'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PackageForm from '@/components/admin/PackageForm'
import Button from '@/components/admin/Button'
import Link from 'next/link'

export default function NewPackagePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.push('/admin/packages')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create package')
      }
    } catch (error) {
      console.error('Error creating package:', error)
      alert('An error occurred while creating the package')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">New Package</h1>
          <p className="text-gray-600">Create a new travel package</p>
        </div>
        <Link href="/admin/packages">
          <Button variant="outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Packages
          </Button>
        </Link>
      </div>

      <PackageForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

