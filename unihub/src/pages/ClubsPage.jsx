import React, { useState } from 'react';
import ClubCard from '../components/ui/ClubCard';

// Mock data for demonstration
const allClubs = [
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
  },
  {
    id: '4',
    name: 'Community Service Club',
    description: 'Make a difference in the local community through volunteer work and charity events.',
    logoUrl: 'https://via.placeholder.com/150?text=Community',
    memberCount: 110,
    category: 'Community Service'
  },
  {
    id: '5',
    name: 'Literary Society',
    description: 'For lovers of literature, poetry, and creative writing.',
    logoUrl: 'https://via.placeholder.com/150?text=Literary',
    memberCount: 65,
    category: 'Arts & Culture'
  },
  {
    id: '6',
    name: 'Debate Club',
    description: 'Enhance your public speaking and critical thinking skills through competitive debates.',
    logoUrl: 'https://via.placeholder.com/150?text=Debate',
    memberCount: 75,
    category: 'Academic'
  },
  {
    id: '7',
    name: 'Photography Club',
    description: 'Capture moments and learn photography techniques from fellow enthusiasts.',
    logoUrl: 'https://via.placeholder.com/150?text=Photo',
    memberCount: 80,
    category: 'Arts & Culture'
  },
  {
    id: '8',
    name: 'Sports Club',
    description: 'Stay active and participate in various sports activities and competitions.',
    logoUrl: 'https://via.placeholder.com/150?text=Sports',
    memberCount: 150,
    category: 'Sports'
  },
  {
    id: '9',
    name: 'Environmental Club',
    description: 'Promote sustainability and environmental awareness on campus.',
    logoUrl: 'https://via.placeholder.com/150?text=Environment',
    memberCount: 70,
    category: 'Community Service'
  }
];

// Categories for filtering
const categories = ['All', 'Technology', 'Arts & Culture', 'Business', 'Community Service', 'Academic', 'Sports'];

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter clubs based on search term and category
  const filteredClubs = allClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Campus Clubs</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search clubs..."
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
      
      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No clubs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
