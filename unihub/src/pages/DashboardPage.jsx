import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import EventCard from '../components/ui/EventCard';
import Button from '../components/ui/Button';

// Mock data for demonstration
const upcomingEvents = [
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
  }
];

const followedClubs = [
  {
    id: '1',
    name: 'Tech Club',
    logoUrl: 'https://via.placeholder.com/150?text=Tech',
    category: 'Technology',
    upcomingEventCount: 2
  },
  {
    id: '2',
    name: 'Art Society',
    logoUrl: 'https://via.placeholder.com/150?text=Art',
    category: 'Arts & Culture',
    upcomingEventCount: 1
  }
];

const notifications = [
  {
    id: '1',
    type: 'event_reminder',
    title: 'Event Reminder: Annual Tech Conference',
    message: 'Don\'t forget about the Annual Tech Conference tomorrow!',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: false
  },
  {
    id: '2',
    type: 'new_event',
    title: 'New Event: Hackathon 2023',
    message: 'Tech Club has posted a new event: Hackathon 2023',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true
  },
  {
    id: '3',
    type: 'club_update',
    title: 'Club Update: Art Society',
    message: 'Art Society has updated their club information',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    read: true
  }
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.firstName || 'User'}!</h1>
        <p className="text-gray-600">Here's what's happening in your campus community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Upcoming Events</h2>
              <Link to="/events" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You haven't RSVP'd to any upcoming events.</p>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <p className="text-sm text-gray-500">Yesterday</p>
                <p className="font-medium">You RSVP'd to Annual Tech Conference</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm text-gray-500">3 days ago</p>
                <p className="font-medium">You followed Tech Club</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="text-sm text-gray-500">1 week ago</p>
                <p className="font-medium">You commented on Art Exhibition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={user.imageUrl || 'https://via.placeholder.com/100?text=User'}
                alt={user.fullName || 'User'}
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.fullName || 'User'}</h2>
                <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress || ''}</p>
              </div>
            </div>
            <div className="flex justify-between text-center border-t border-gray-200 pt-4">
              <div>
                <p className="text-2xl font-bold">{followedClubs.length}</p>
                <p className="text-gray-600 text-sm">Clubs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                <p className="text-gray-600 text-sm">Events</p>
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-600 text-sm">Badges</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/profile">
                <Button variant="secondary" className="w-full">Edit Profile</Button>
              </Link>
            </div>
          </div>

          {/* Followed Clubs */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Clubs</h2>
              <Link to="/clubs" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Discover More
              </Link>
            </div>
            {followedClubs.length > 0 ? (
              <ul className="space-y-4">
                {followedClubs.map(club => (
                  <li key={club.id} className="flex items-center">
                    <img
                      src={club.logoUrl}
                      alt={club.name}
                      className="h-10 w-10 mr-3"
                    />
                    <div className="flex-grow">
                      <Link to={`/clubs/${club.id}`} className="font-medium hover:text-indigo-600">
                        {club.name}
                      </Link>
                      <p className="text-sm text-gray-600">{club.upcomingEventCount} upcoming events</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You haven't followed any clubs yet.</p>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notifications to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
