import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { userAvatars } from '../utils/imageData';

// Mock data for demonstration
const discussions = [
  {
    id: '1',
    title: 'Tips for first-year students',
    content: 'Hey everyone! I\'m a senior student and wanted to share some tips for those who are just starting their university journey. What advice would you add?',
    author: {
      id: '1',
      name: 'John Smith',
      imageUrl: userAvatars.male1
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    commentCount: 15,
    upvotes: 32,
    tags: ['Advice', 'First Year']
  },
  {
    id: '2',
    title: 'Best study spots on campus',
    content: 'I\'m looking for quiet places to study on campus. The library is always packed during finals week. Any hidden gems you can recommend?',
    author: {
      id: '2',
      name: 'Emily Johnson',
      imageUrl: userAvatars.female1
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    commentCount: 23,
    upvotes: 45,
    tags: ['Study', 'Campus Life']
  },
  {
    id: '3',
    title: 'Annual Tech Conference - Discussion Thread',
    content: 'Let\'s discuss the upcoming Annual Tech Conference. What sessions are you most excited about? Anyone interested in forming a group to attend together?',
    author: {
      id: '3',
      name: 'Michael Lee',
      imageUrl: userAvatars.male2
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    commentCount: 8,
    upvotes: 17,
    tags: ['Events', 'Tech Club']
  },
  {
    id: '4',
    title: 'Volunteer opportunities this semester',
    content: 'Hi everyone! I\'m looking for volunteer opportunities this semester. Does anyone know of any organizations or events that need volunteers?',
    author: {
      id: '4',
      name: 'Sarah Garcia',
      imageUrl: userAvatars.female2
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    commentCount: 12,
    upvotes: 28,
    tags: ['Volunteering', 'Community Service']
  },
  {
    id: '5',
    title: 'Recommendations for elective courses',
    content: 'I need to choose an elective for next semester. Any recommendations for interesting and not-too-difficult courses?',
    author: {
      id: '5',
      name: 'David Chen',
      imageUrl: userAvatars.male3
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    commentCount: 31,
    upvotes: 52,
    tags: ['Academics', 'Courses']
  }
];

// Categories for filtering
const categories = ['All', 'Academics', 'Campus Life', 'Events', 'Advice', 'Clubs', 'Volunteering'];

export default function DiscussionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular'

  // Filter discussions based on search term and category
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || discussion.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Sort discussions
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Campus Discussions</h1>
        <Button>Start New Discussion</Button>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
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
        <div>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Discussions List */}
      {sortedDiscussions.length > 0 ? (
        <div className="space-y-6">
          {sortedDiscussions.map(discussion => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={discussion.author.imageUrl}
                    alt={discussion.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <Link to={`/discussions/${discussion.id}`} className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                    {discussion.title}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>{discussion.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(discussion.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{discussion.content.length > 200 ? `${discussion.content.substring(0, 200)}...` : discussion.content}</p>
                  <div className="mt-4 flex flex-wrap items-center">
                    <div className="flex items-center mr-6">
                      <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{discussion.upvotes}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>{discussion.commentCount}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      {discussion.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No discussions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
