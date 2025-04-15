import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/ui/EventCard';
import ClubCard from '../components/ui/ClubCard';
import Button from '../components/ui/Button';
import { scrollToElement } from '../utils/scrollUtils';

// Mock data for demonstration
const featuredEvents = [
  {
    id: '1',
    title: 'Annual Tech Conference',
    description: 'Join us for the biggest tech conference of the year with speakers from leading tech companies.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'Main Auditorium',
    clubId: '1',
    clubName: 'Tech Club',
    imageUrl: 'https://via.placeholder.com/400x200?text=Tech+Conference'
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'Explore the creative works of our talented student artists in this semester\'s art exhibition.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: 'Art Gallery',
    clubId: '2',
    clubName: 'Art Society',
    imageUrl: 'https://via.placeholder.com/400x200?text=Art+Exhibition'
  },
  {
    id: '3',
    title: 'Entrepreneurship Workshop',
    description: 'Learn the essentials of starting your own business from successful entrepreneurs.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    location: 'Business School, Room 101',
    clubId: '3',
    clubName: 'Entrepreneurship Club',
    imageUrl: 'https://via.placeholder.com/400x200?text=Workshop'
  }
];

const popularClubs = [
  {
    id: '1',
    name: 'Tech Club',
    description: 'A community for tech enthusiasts to learn, collaborate, and innovate together.',
    logoUrl: 'https://via.placeholder.com/150?text=Tech',
    memberCount: 120,
    category: 'Technology'
  },
  {
    id: '2',
    name: 'Art Society',
    description: 'Express your creativity through various art forms and showcase your talent.',
    logoUrl: 'https://via.placeholder.com/150?text=Art',
    memberCount: 85,
    category: 'Arts & Culture'
  },
  {
    id: '3',
    name: 'Entrepreneurship Club',
    description: 'Develop your business acumen and entrepreneurial skills through workshops and networking.',
    logoUrl: 'https://via.placeholder.com/150?text=Business',
    memberCount: 95,
    category: 'Business'
  }
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl font-heading mb-4">
              Welcome to <span className="text-white">Uni<span className="text-pink-300">Hub</span></span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl text-indigo-100">
              Your campus life, simplified and connected.
            </p>
            <div className="mt-6 max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                <p className="text-white/90 text-sm">Join thousands of students already using UniHub to discover events, connect with clubs, and engage with campus life.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <nav className="flex space-x-8">
                <button
                  onClick={() => scrollToElement('featured-events', 80)}
                  className="text-white hover:text-pink-200 font-medium transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Events</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollToElement('popular-clubs', 80)}
                  className="text-white hover:text-pink-200 font-medium transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Clubs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollToElement('cta', 80)}
                  className="text-white hover:text-pink-200 font-medium transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Get Started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </nav>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/events" className="btn-primary px-6 py-3 rounded-full text-base font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <span>Explore Events</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/clubs" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 rounded-full text-base font-medium inline-flex items-center gap-2 shadow-lg transition-all duration-300">
                <span>Discover Clubs</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="featured-events" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured <span className="gradient-text">Events</span></h2>
            <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All Events
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Clubs Section */}
      <section id="popular-clubs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Popular <span className="gradient-text">Clubs</span></h2>
            <Link to="/clubs" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All Clubs
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-4 text-gray-900">Ready to <span className="gradient-text">Get Involved</span>?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Join clubs, attend events, and connect with your campus community. Create your profile today to get personalized recommendations.
          </p>
          <Link to="/sign-up" className="btn-primary px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span>Create Your Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
