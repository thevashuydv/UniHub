import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';
import ClubSignUpForm from '../components/auth/ClubSignUpForm';

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState('user');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === 'user' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('user')}
              >
                Student
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === 'club' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('club')}
              >
                Club Admin
              </button>
            </div>
          </div>

          {activeTab === 'user' ? <SignUpForm /> : <ClubSignUpForm />}
        </div>
      </div>
    </div>
  );
}
