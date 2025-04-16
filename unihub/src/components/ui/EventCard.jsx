import React from 'react';
import { Link } from 'react-router-dom';
import { eventImages } from '../../utils/imageData';

export default function EventCard({ event }) {
  const { id, title, description, date, location, clubId, clubName, imageUrl } = event;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="card hover:translate-y-[-5px] overflow-hidden rounded-xl">
      <div className="h-48 overflow-hidden rounded-t-xl relative group">
        <img
          src={imageUrl || eventImages[title.toLowerCase().replace(/\s+/g, '')] || eventImages.techConference}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm truncate">{description}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold font-heading mb-2 truncate text-gray-800">{title}</h3>
        <div className="flex items-center mb-2 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center mb-3 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <Link to={`/clubs/${clubId}`} className="text-primary-600 text-sm hover:underline font-medium">
            {clubName}
          </Link>
          <Link to={`/events/${id}`} className="btn-primary px-4 py-2 rounded-lg text-sm inline-flex items-center gap-1">
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
