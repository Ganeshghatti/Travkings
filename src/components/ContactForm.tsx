'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Corporate Management',
    travelDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: formData.service,
          travelDate: formData.travelDate || undefined,
          message: formData.message,
          source: 'contact_form',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      // Success
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Corporate Management',
        travelDate: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 p-12 md:p-20 border border-slate-100 shadow-sm">
      <h3 className="text-3xl font-medium tracking-headline text-brownCoffee uppercase mb-12">
        Send Us a Message
      </h3>
      
      {submitStatus === 'success' && (
        <div className="mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded">
          <p className="font-medium">Thank you for your inquiry!</p>
          <p className="text-sm mt-1">We&apos;ve received your message and will get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded">
          <p className="font-medium">Error submitting inquiry</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label 
              htmlFor="name" 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white border border-slate-200 p-5 rounded-none focus:outline-none focus:border-brandy text-brownCoffee transition-all"
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-3">
            <label 
              htmlFor="email" 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white border border-slate-200 p-5 rounded-none focus:outline-none focus:border-brandy text-brownCoffee transition-all"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label 
              htmlFor="service" 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
            >
              Service Needed
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full bg-white border border-slate-200 p-5 rounded-none focus:outline-none focus:border-brandy text-brownCoffee appearance-none"
            >
              <option value="Corporate Management">Air Ticketing</option>
              <option value="Luxury Holidays">Hotels & Holidays</option>
              <option value="Air Ticketing">Visa Assistance</option>
              <option value="Visa Assistance">Corporate Travel</option>
              <option value="Tour Packages">Other Services</option>
            </select>
          </div>
          <div className="space-y-3">
            <label 
              htmlFor="travelDate" 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
            >
              Travel Date
            </label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 p-5 rounded-none focus:outline-none focus:border-brandy text-brownCoffee transition-all"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label 
            htmlFor="phone" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border border-slate-200 p-5 rounded-none focus:outline-none focus:border-brandy text-brownCoffee transition-all"
            placeholder="Enter phone number"
          />
        </div>
        <div className="space-y-3">
          <label 
            htmlFor="message" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-brownCoffee/40"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-white border border-slate-200 p-5 rounded-none h-48 focus:outline-none focus:border-brandy text-brownCoffee transition-all"
            placeholder="Describe your dream journey..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brandy hover:bg-brownCoffee text-white font-medium text-xs uppercase tracking-[0.2em] py-6 transition-all duration-500 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  )
}

