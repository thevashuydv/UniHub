import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { userAvatars } from '../../utils/imageData';

export default function UserProfile({ size = 'md' }) {
  const { currentUser, logout } = useAuth();
  
  if (!currentUser) return null;
  
  // Determine avatar size based on prop
  const avatarSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  // Get random avatar from userAvatars
  const avatarKeys = Object.keys(userAvatars);
  const randomAvatar = userAvatars[avatarKeys[currentUser.uid.charCodeAt(0) % avatarKeys.length]];
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center focus:outline-none"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className={`${avatarSizeClasses[size]} rounded-full object-cover border-2 border-white`}
          src={randomAvatar}
          alt="User avatar"
        />
      </button>
      
      {/* Dropdown menu */}
      <div
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Settings
        </Link>
        <button
          onClick={logout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
