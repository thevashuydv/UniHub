import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventForm({ event = null, clubId, onSubmit }) {
  const navigate = useNavigate();
  const isEditing = !!event;
  
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    time: event?.time || '',
    location: event?.location || '',
    capacity: event?.capacity || '',
    imageUrl: event?.imageUrl || '',
    registrationRequired: event?.registrationRequired || false,
    registrationDeadline: event?.registrationDeadline ? new Date(event.registrationDeadline).toISOString().split('T')[0] : '',
    tags: event?.tags?.join(', ') || '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = 'Date cannot be in the past';
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.capacity && isNaN(Number(formData.capacity))) {
      newErrors.capacity = 'Capacity must be a number';
    }
    
    if (formData.registrationRequired && !formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Registration deadline is required when registration is required';
    } else if (
      formData.registrationRequired && 
      formData.registrationDeadline && 
      new Date(formData.registrationDeadline) > new Date(formData.date)
    ) {
      newErrors.registrationDeadline = 'Registration deadline must be before the event date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process form data
      const processedData = {
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        clubId,
      };
      
      // If editing, keep the existing ID and attendees
      if (isEditing) {
        processedData.id = event.id;
        processedData.attendees = event.attendees || [];
      } else {
        processedData.id = Date.now().toString();
        processedData.attendees = [];
        processedData.createdAt = new Date().toISOString();
      }
      
      await onSubmit(processedData);
      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({
        submit: 'Failed to save event. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{errors.submit}</h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title*
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.title ? 'border-red-300' : ''
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.description ? 'border-red-300' : ''
                }`}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Provide a detailed description of your event.
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date*
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.date ? 'border-red-300' : ''
                }`}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time*
            </label>
            <div className="mt-1">
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.time ? 'border-red-300' : ''
                }`}
              />
              {errors.time && (
                <p className="mt-2 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.location ? 'border-red-300' : ''
                }`}
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity (optional)
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="capacity"
                id="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.capacity ? 'border-red-300' : ''
                }`}
              />
              {errors.capacity && (
                <p className="mt-2 text-sm text-red-600">{errors.capacity}</p>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Leave blank for unlimited capacity.
            </p>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <div className="mt-1">
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Provide a URL to an image for your event.
            </p>
          </div>
          
          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="registrationRequired"
                  name="registrationRequired"
                  type="checkbox"
                  checked={formData.registrationRequired}
                  onChange={handleChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="registrationRequired" className="font-medium text-gray-700">
                  Registration Required
                </label>
                <p className="text-gray-500">
                  Check this if attendees need to register for the event.
                </p>
              </div>
            </div>
          </div>
          
          {formData.registrationRequired && (
            <div className="sm:col-span-3">
              <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">
                Registration Deadline*
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="registrationDeadline"
                  id="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.registrationDeadline ? 'border-red-300' : ''
                  }`}
                />
                {errors.registrationDeadline && (
                  <p className="mt-2 text-sm text-red-600">{errors.registrationDeadline}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="sm:col-span-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (optional)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Comma-separated list of tags (e.g., "workshop, technology, career").
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/admin/events')}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
