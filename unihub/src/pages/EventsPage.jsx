import React, { useState } from 'react';
import EventCard from '../components/ui/EventCard';
import { eventImages } from '../utils/imageData';

// Mock data for demonstration
const allEvents = [
  {
    id: '1',
    title: 'Annual Tech Conference',
    description: 'Join us for the biggest tech conference of the year with speakers from leading tech companies.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'Main Auditorium',
    clubId: '1',
    clubName: 'Tech Club',
    imageUrl: eventImages.techConference,
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'Explore the creative works of our talented student artists in this semester\'s art exhibition.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: 'Art Gallery',
    clubId: '2',
    clubName: 'Art Society',
    imageUrl: eventImages.artExhibition,
    category: 'Arts & Culture'
  },
  {
    id: '3',
    title: 'Entrepreneurship Workshop',
    description: 'Learn the essentials of starting your own business from successful entrepreneurs.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    location: 'Business School, Room 101',
    clubId: '3',
    clubName: 'Entrepreneurship Club',
    imageUrl: eventImages.entrepreneurshipWorkshop,
    category: 'Business'
  },
  {
    id: '4',
    title: 'Charity Run',
    description: 'Join our annual charity run to raise funds for local community projects.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    location: 'University Sports Field',
    clubId: '4',
    clubName: 'Community Service Club',
    imageUrl: eventImages.charityRun,
    category: 'Sports'
  },
  {
    id: '5',
    title: 'Poetry Reading Night',
    description: 'An evening of poetry reading and literary discussions with guest poets.',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    location: 'University Library',
    clubId: '5',
    clubName: 'Literary Society',
    imageUrl: eventImages.poetryNight,
    category: 'Arts & Culture'
  },
  {
    id: '6',
    title: 'Hackathon 2023',
    description: '48-hour coding challenge to build innovative solutions for real-world problems.',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    location: 'Computer Science Building',
    clubId: '1',
    clubName: 'Tech Club',
    imageUrl: eventImages.hackathon,
    category: 'Technology'
  }
];

// Categories for filtering
const categories = ['All', 'Technology', 'Arts & Culture', 'Business', 'Sports', 'Academic'];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter events based on search term and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Campus Events</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
