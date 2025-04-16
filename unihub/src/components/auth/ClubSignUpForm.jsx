import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

export default function ClubSignUpForm() {
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    category: '',
    foundedYear: new Date().getFullYear(),
    meetingSchedule: '',
    logoUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signupAdmin } = useAuth();
  const navigate = useNavigate();
  
  const categories = [
    'Technology',
    'Arts & Culture',
    'Business',
    'Community Service',
    'Academic',
    'Sports',
    'Religious',
    'Political',
    'Environmental',
    'Other'
  ];
  
  function handleAdminChange(e) {
    const { name, value } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  function handleClubChange(e) {
    const { name, value } = e.target;
    setClubData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  function handleNextStep() {
    // Validate admin form
    if (step === 1) {
      if (adminData.password !== adminData.confirmPassword) {
        return setError('Passwords do not match');
      }
      
      if (adminData.password.length < 6) {
        return setError('Password must be at least 6 characters');
      }
      
      setError('');
      setStep(2);
    }
  }
  
  function handlePrevStep() {
    setStep(1);
    setError('');
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate club form
    if (!clubData.name || !clubData.description || !clubData.category) {
      return setError('Please fill in all required fields');
    }
    
    try {
      setError('');
      setLoading(true);
      await signupAdmin(
        adminData.email,
        adminData.password,
        adminData.firstName,
        adminData.lastName,
        clubData
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Club signup error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }
  
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      default:
        return 'Failed to create account. Please try again.';
    }
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Register Your Club</h2>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
            }`}>
              1
            </div>
            <span className="text-xs mt-1">Admin Info</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${step === 1 ? 'w-0' : 'w-full'} bg-primary-600 transition-all duration-300`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
            }`}>
              2
            </div>
            <span className="text-xs mt-1">Club Info</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {step === 1 ? (
        // Step 1: Admin Information
        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={adminData.firstName}
                onChange={handleAdminChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={adminData.lastName}
                onChange={handleAdminChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={adminData.email}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={adminData.password}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={adminData.confirmPassword}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            className="w-full py-2"
          >
            Next
          </Button>
        </form>
      ) : (
        // Step 2: Club Information
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Club Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={clubData.name}
              onChange={handleClubChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Tech Club"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={clubData.description}
              onChange={handleClubChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe your club's purpose and activities"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={clubData.category}
              onChange={handleClubChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year
              </label>
              <input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={clubData.foundedYear}
                onChange={handleClubChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div>
              <label htmlFor="meetingSchedule" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Schedule
              </label>
              <input
                id="meetingSchedule"
                name="meetingSchedule"
                type="text"
                value={clubData.meetingSchedule}
                onChange={handleClubChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Every Tuesday at 5 PM"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={clubData.logoUrl}
              onChange={handleClubChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://example.com/logo.png"
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-2"
              onClick={handlePrevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 py-2"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Club'}
            </Button>
          </div>
        </form>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-primary-600 hover:text-primary-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
