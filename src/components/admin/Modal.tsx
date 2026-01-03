'use client'

import React, { useEffect } from 'react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  variant?: 'default' | 'danger'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brownCoffee">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          
          <div className="mb-6 text-gray-700">
            {children}
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                variant={variant === 'danger' ? 'danger' : 'primary'}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

