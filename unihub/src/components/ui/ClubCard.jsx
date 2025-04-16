import React from 'react';
import { Link } from 'react-router-dom';
import { clubLogos } from '../../utils/imageData';

export default function ClubCard({ club }) {
  const { id, name, description, logoUrl, memberCount, category } = club;

  return (
    <div className="card hover:translate-y-[-5px] overflow-hidden rounded-xl">
      <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true"></div>
        <img
          src={logoUrl || clubLogos[name.toLowerCase().replace(/\s+/g, '')] || clubLogos.techClub}
          alt={name}
          className="h-20 w-20 object-contain relative z-10 transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold font-heading mb-2 truncate text-gray-800">{name}</h3>
        <div className="flex items-center mb-2">
          <span className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium">
            {category}
          </span>
          <span className="text-gray-500 text-sm ml-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <Link
          to={`/clubs/${id}`}
          className="w-full btn-primary px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1"
        >
          <span>View Club</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
