'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from './Modal'

interface DeletePackageButtonProps {
  packageId: string
  packageTitle: string
}

export default function DeletePackageButton({ packageId, packageTitle }: DeletePackageButtonProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        setIsModalOpen(false)
      } else {
        alert('Failed to delete package')
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      alert('An error occurred while deleting the package')
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Package"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        variant="danger"
      >
        <p>Are you sure you want to delete &quot;{packageTitle}&quot;?</p>
        <p className="mt-2 text-sm text-gray-600">This action cannot be undone.</p>
      </Modal>
    </>
  )
}

