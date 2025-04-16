import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function WelcomeModal() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Always show the modal for demonstration purposes
  // In a production environment, you would use the commented code below
  useEffect(() => {
    // Always show the modal when the component mounts
    setIsOpen(true);

    // Uncomment this for production to only show on first visit
    // const hasVisited = localStorage.getItem('unihub_visited');
    // if (!hasVisited) {
    //   setIsOpen(true);
    //   localStorage.setItem('unihub_visited', 'true');
    // }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        {/* Modal panel */}
        <div className="inline-block align-top bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:mt-16 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl leading-6 font-bold font-heading text-gray-900" id="modal-title">
                  Welcome to <span className="gradient-text">UniHub</span>
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Join thousands of students already using UniHub to discover events, connect with clubs, and engage with campus life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!currentUser ? (
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="card border border-gray-200 p-6 mb-4">
                <h4 className="font-heading font-semibold text-lg mb-3">Get Started</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Create an account to join clubs, attend events, and connect with your campus community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/sign-up"
                    className="btn-primary px-4 py-2 rounded-lg text-sm inline-flex items-center justify-center gap-1 w-full sm:w-auto"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Sign Up</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    to="/sign-in"
                    className="bg-white text-primary-600 border border-primary-500 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm inline-flex items-center justify-center gap-1 w-full sm:w-auto transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Continue as Guest
                </button>
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
