import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EventCard from '../components/ui/EventCard';
import Button from '../components/ui/Button';
import { userAvatars, clubLogos, eventImages } from '../utils/imageData';

export default function DashboardPage() {
  const { currentUser, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [followedClubs, setFollowedClubs] = useState([]);

  // Load user data and notifications
  useEffect(() => {
    if (!loading && currentUser) {
      // Load notifications
      const storedNotifications = JSON.parse(localStorage.getItem('unihub_notifications') || '[]');
      const userNotifications = storedNotifications.filter(notification => notification.userId === currentUser.uid);
      setNotifications(userNotifications);

      // Load followed clubs
      const storedClubs = JSON.parse(localStorage.getItem('unihub_clubs') || '[]');
      const userFollowedClubs = storedClubs.filter(club => club.followers?.includes(currentUser.uid));

      // Transform to the expected format
      const formattedClubs = userFollowedClubs.map(club => ({
        id: club.id,
        name: club.name,
        logoUrl: club.logoUrl || 'https://via.placeholder.com/150?text=' + club.name.charAt(0),
        category: club.category,
        upcomingEventCount: club.upcomingEvents?.length || 0
      }));

      setFollowedClubs(formattedClubs);
    }
  }, [loading, currentUser]);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem('unihub_notifications') || '[]');
    const updatedAllNotifications = allNotifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    localStorage.setItem('unihub_notifications', JSON.stringify(updatedAllNotifications));
  };

  // Initialize empty upcoming events array
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.displayName?.split(' ')[0] || 'User'}!</h1>
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
              <div className="text-center py-8">
                <div className="bg-gray-50 rounded-lg p-6 inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">You haven't RSVP'd to any upcoming events.</p>
                </div>
                <Link to="/events" className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center gap-1">
                  <span>Explore Events</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            {followedClubs.length > 0 || notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.length > 0 && (
                  <div className="border-l-4 border-indigo-500 pl-4 py-2">
                    <p className="text-sm text-gray-500">Just now</p>
                    <p className="font-medium">You started following {followedClubs[0]?.name || 'a club'}</p>
                  </div>
                )}
                {followedClubs.length > 0 && (
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="text-sm text-gray-500">Today</p>
                    <p className="font-medium">You discovered new clubs on UniHub</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="bg-gray-50 rounded-lg p-6 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">No activity yet.</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Follow clubs and interact with events to see your activity here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={userAvatars.male1 || 'https://via.placeholder.com/100?text=User'}
                alt={currentUser?.displayName || 'User'}
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentUser?.displayName || 'User'}</h2>
                <p className="text-gray-600">{currentUser?.email || ''}</p>
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
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-gray-600 text-sm">Notifications</p>
              </div>
            </div>
            {followedClubs.length === 0 && upcomingEvents.length === 0 && (
              <div className="mt-4 bg-primary-50 rounded-lg p-3 text-sm text-primary-800">
                <p className="font-medium">Welcome to UniHub!</p>
                <p className="mt-1">Start by exploring clubs and events to personalize your dashboard.</p>
              </div>
            )}
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
              <div className="text-center py-6">
                <div className="bg-gray-50 rounded-lg p-6 inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500">You haven't followed any clubs yet.</p>
                </div>
                <Link to="/clubs" className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center gap-1">
                  <span>Discover Clubs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
            <ul className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <li
                      key={notification.id}
                      className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                        {notification.clubId && (
                          <Link
                            to={`/clubs/${notification.clubId}`}
                            className="text-xs text-primary-600 hover:text-primary-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Club
                          </Link>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-gray-50 rounded-lg p-6 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <p className="text-gray-500">No notifications yet.</p>
                    </div>
                  </div>
                )}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
