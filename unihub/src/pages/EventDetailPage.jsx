import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';

// Mock data for demonstration
const events = [
  {
    id: '1',
    title: 'Annual Tech Conference',
    description: 'Join us for the biggest tech conference of the year with speakers from leading tech companies. This event will feature keynote presentations, panel discussions, workshops, and networking opportunities. Topics will include artificial intelligence, blockchain, cybersecurity, and emerging technologies.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'Main Auditorium',
    clubId: '1',
    clubName: 'Tech Club',
    imageUrl: 'https://via.placeholder.com/800x400?text=Tech+Conference',
    attendees: 45,
    maxAttendees: 200,
    organizer: 'John Smith',
    schedule: [
      { time: '9:00 AM', activity: 'Registration and Coffee' },
      { time: '10:00 AM', activity: 'Opening Keynote' },
      { time: '11:30 AM', activity: 'Panel Discussion' },
      { time: '1:00 PM', activity: 'Lunch Break' },
      { time: '2:00 PM', activity: 'Workshops' },
      { time: '4:30 PM', activity: 'Networking Session' },
      { time: '5:30 PM', activity: 'Closing Remarks' }
    ]
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'Explore the creative works of our talented student artists in this semester\'s art exhibition. The exhibition will showcase paintings, sculptures, digital art, and mixed media pieces created by students from various departments. This is a great opportunity to appreciate the artistic talent on campus and engage with the creators.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: 'Art Gallery',
    clubId: '2',
    clubName: 'Art Society',
    imageUrl: 'https://via.placeholder.com/800x400?text=Art+Exhibition',
    attendees: 30,
    maxAttendees: 100,
    organizer: 'Emily Johnson',
    schedule: [
      { time: '10:00 AM', activity: 'Exhibition Opens' },
      { time: '11:00 AM', activity: 'Guided Tour' },
      { time: '1:00 PM', activity: 'Meet the Artists' },
      { time: '3:00 PM', activity: 'Art Workshop' },
      { time: '5:00 PM', activity: 'Exhibition Closes' }
    ]
  }
];

export default function EventDetailPage() {
  const { id } = useParams();
  const [isAttending, setIsAttending] = useState(false);
  
  // Find the event with the matching ID
  const event = events.find(event => event.id === id);
  
  // If event not found, show error message
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }
  
  // Format date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Handle RSVP
  const handleRSVP = () => {
    setIsAttending(!isAttending);
    // In a real app, this would make an API call to update the database
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/events" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Events
        </Link>
      </div>
      
      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-80 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{event.attendees} / {event.maxAttendees} attending</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Organized by: {event.organizer}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link to={`/clubs/${event.clubId}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              {event.clubName}
            </Link>
            <Button 
              onClick={handleRSVP}
              variant={isAttending ? 'secondary' : 'primary'}
            >
              {isAttending ? 'Cancel RSVP' : 'RSVP to Event'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Discussion</h2>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-500 text-center py-8">Be the first to start a discussion about this event!</p>
              <div className="mt-4">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Write a comment..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <Button>Post Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Event Schedule</h2>
            <ul className="space-y-4">
              {event.schedule.map((item, index) => (
                <li key={index} className="flex">
                  <div className="w-24 flex-shrink-0 text-gray-600">{item.time}</div>
                  <div className="flex-grow">{item.activity}</div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Share This Event</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white p-2 rounded-full">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="bg-blue-400 text-white p-2 rounded-full">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="bg-green-500 text-white p-2 rounded-full">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                </svg>
              </button>
              <button className="bg-red-600 text-white p-2 rounded-full">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 6.75h-1.513c-.96 0-1.15.435-1.15 1.072v1.428h2.287l-.3 2.313h-1.987v5.937h-2.4v-5.937H9.037V9.25h2.4V7.725c0-2.383 1.457-3.675 3.577-3.675 1.02 0 1.892.075 2.145.11v2.59h-1.659z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
