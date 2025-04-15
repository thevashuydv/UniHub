import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import EventCard from '../components/ui/EventCard';

// Mock data for demonstration
const clubs = [
  {
    id: '1',
    name: 'Tech Club',
    description: 'A community for tech enthusiasts to learn, collaborate, and innovate together. We organize workshops, hackathons, and tech talks to help members develop their technical skills and stay updated with the latest trends in technology.',
    longDescription: 'The Tech Club is a student-run organization dedicated to fostering a community of technology enthusiasts on campus. Our mission is to provide opportunities for students to enhance their technical skills, collaborate on innovative projects, and connect with industry professionals.\n\nWe organize a variety of events throughout the academic year, including workshops on programming languages and frameworks, hackathons where students can build projects in teams, tech talks featuring guest speakers from leading tech companies, and networking sessions with alumni working in the tech industry.\n\nWhether you\'re a computer science major or simply interested in technology, the Tech Club welcomes members from all academic backgrounds and skill levels. Join us to learn, collaborate, and innovate together!',
    logoUrl: 'https://via.placeholder.com/150?text=Tech',
    coverImageUrl: 'https://via.placeholder.com/1200x400?text=Tech+Club+Cover',
    memberCount: 120,
    category: 'Technology',
    foundedYear: 2015,
    meetingSchedule: 'Every Tuesday at 6:00 PM',
    location: 'Computer Science Building, Room 101',
    socialMedia: {
      website: 'https://techclub.university.edu',
      instagram: '@uni_techclub',
      twitter: '@uni_techclub'
    },
    leaders: [
      { name: 'John Smith', role: 'President', imageUrl: 'https://via.placeholder.com/100?text=JS' },
      { name: 'Sarah Johnson', role: 'Vice President', imageUrl: 'https://via.placeholder.com/100?text=SJ' },
      { name: 'Michael Lee', role: 'Treasurer', imageUrl: 'https://via.placeholder.com/100?text=ML' }
    ],
    upcomingEvents: [
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
        id: '6',
        title: 'Hackathon 2023',
        description: '48-hour coding challenge to build innovative solutions for real-world problems.',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
        location: 'Computer Science Building',
        clubId: '1',
        clubName: 'Tech Club',
        imageUrl: 'https://via.placeholder.com/400x200?text=Hackathon'
      }
    ],
    pastEvents: [
      {
        id: '10',
        title: 'Web Development Workshop',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website.',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        location: 'Computer Science Building, Room 101',
        clubId: '1',
        clubName: 'Tech Club',
        imageUrl: 'https://via.placeholder.com/400x200?text=Web+Dev'
      }
    ]
  },
  {
    id: '2',
    name: 'Art Society',
    description: 'Express your creativity through various art forms and showcase your talent.',
    longDescription: 'The Art Society is a vibrant community of artists and art enthusiasts dedicated to promoting creativity and artistic expression on campus. We provide a supportive environment for members to explore various art forms, develop their skills, and showcase their work.\n\nOur activities include regular art workshops covering techniques in painting, drawing, sculpture, and digital art; exhibitions to display student artwork; collaborative art projects; and visits to local galleries and museums.\n\nThe Art Society welcomes members of all skill levels, from beginners to experienced artists. Whether you\'re pursuing a degree in fine arts or simply enjoy art as a hobby, you\'ll find a place in our community.',
    logoUrl: 'https://via.placeholder.com/150?text=Art',
    coverImageUrl: 'https://via.placeholder.com/1200x400?text=Art+Society+Cover',
    memberCount: 85,
    category: 'Arts & Culture',
    foundedYear: 2010,
    meetingSchedule: 'Every Wednesday at 5:00 PM',
    location: 'Arts Building, Studio 3',
    socialMedia: {
      website: 'https://artsociety.university.edu',
      instagram: '@uni_artsociety',
      twitter: '@uni_artsociety'
    },
    leaders: [
      { name: 'Emily Johnson', role: 'President', imageUrl: 'https://via.placeholder.com/100?text=EJ' },
      { name: 'David Chen', role: 'Vice President', imageUrl: 'https://via.placeholder.com/100?text=DC' },
      { name: 'Sophia Garcia', role: 'Secretary', imageUrl: 'https://via.placeholder.com/100?text=SG' }
    ],
    upcomingEvents: [
      {
        id: '2',
        title: 'Art Exhibition',
        description: 'Explore the creative works of our talented student artists in this semester\'s art exhibition.',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        location: 'Art Gallery',
        clubId: '2',
        clubName: 'Art Society',
        imageUrl: 'https://via.placeholder.com/400x200?text=Art+Exhibition'
      }
    ],
    pastEvents: [
      {
        id: '11',
        title: 'Painting Workshop',
        description: 'Learn acrylic painting techniques with professional artist Jane Doe.',
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
        location: 'Arts Building, Studio 3',
        clubId: '2',
        clubName: 'Art Society',
        imageUrl: 'https://via.placeholder.com/400x200?text=Painting'
      }
    ]
  }
];

export default function ClubDetailPage() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  // Find the club with the matching ID
  const club = clubs.find(club => club.id === id);
  
  // If club not found, show error message
  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Club Not Found</h1>
        <p className="text-gray-600 mb-8">The club you're looking for doesn't exist or has been removed.</p>
        <Link to="/clubs">
          <Button>Back to Clubs</Button>
        </Link>
      </div>
    );
  }
  
  // Handle follow/unfollow
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In a real app, this would make an API call to update the database
  };

  return (
    <div>
      {/* Club Header */}
      <div className="relative">
        <div className="h-64 w-full overflow-hidden">
          <img 
            src={club.coverImageUrl} 
            alt={club.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-24 flex items-end pb-4">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <img 
                src={club.logoUrl} 
                alt={club.name}
                className="h-24 w-24 sm:h-32 sm:w-32 object-contain"
              />
            </div>
            <div className="ml-4 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{club.name}</h1>
              <p className="text-white text-sm sm:text-base drop-shadow-lg">{club.category} • {club.memberCount} members</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Club Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Button 
              onClick={handleFollowToggle}
              variant={isFollowing ? 'secondary' : 'primary'}
            >
              {isFollowing ? 'Unfollow' : 'Follow Club'}
            </Button>
            <Button variant="secondary">Contact</Button>
          </div>
          <div className="flex space-x-4">
            {club.socialMedia.website && (
              <a href={club.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                </svg>
              </a>
            )}
            {club.socialMedia.instagram && (
              <a href={`https://instagram.com/${club.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {club.socialMedia.twitter && (
              <a href={`https://twitter.com/${club.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`${
                activeTab === 'about'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`${
                activeTab === 'members'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`${
                activeTab === 'discussions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Discussions
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'about' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {club.name}</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{club.longDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Club Information</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-32 text-gray-600">Founded:</span>
                      <span>{club.foundedYear}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Category:</span>
                      <span>{club.category}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Members:</span>
                      <span>{club.memberCount}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Meetings:</span>
                      <span>{club.meetingSchedule}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Location:</span>
                      <span>{club.location}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Club Leadership</h3>
                  <ul className="space-y-4">
                    {club.leaders.map((leader, index) => (
                      <li key={index} className="flex items-center">
                        <img 
                          src={leader.imageUrl} 
                          alt={leader.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-sm text-gray-600">{leader.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              {club.upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {club.upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events scheduled.</p>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Events</h2>
              {club.pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {club.pastEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No past events to display.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Club Members</h2>
            <p className="text-gray-500 mb-4">This club has {club.memberCount} members.</p>
            <p className="text-gray-700">To view the full member list, please follow the club.</p>
          </div>
        )}
        
        {activeTab === 'discussions' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Discussions</h2>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-500 text-center py-8">Be the first to start a discussion in this club!</p>
              <div className="mt-4">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Start a discussion..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <Button>Post Discussion</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
