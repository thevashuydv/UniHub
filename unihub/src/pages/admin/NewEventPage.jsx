import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import EventForm from '../../components/admin/EventForm';
import { useAuth } from '../../contexts/AuthContext';

export default function NewEventPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch club data
  useEffect(() => {
    if (currentUser) {
      // In a real app, you would fetch this data from Firestore
      // For now, we'll use mock data
      const storedClubs = JSON.parse(localStorage.getItem('unihub_clubs') || '[]');
      const adminClub = storedClubs.find(club => club.adminId === currentUser.uid);
      
      if (adminClub) {
        setClubData(adminClub);
      } else {
        setError('You need to create a club before you can create events.');
      }
      
      setLoading(false);
    }
  }, [currentUser]);

  const handleSubmit = async (eventData) => {
    try {
      // In a real app, you would save this to Firestore
      // For now, we'll use localStorage
      const storedEvents = JSON.parse(localStorage.getItem('unihub_events') || '[]');
      storedEvents.push(eventData);
      localStorage.setItem('unihub_events', JSON.stringify(storedEvents));
      
      // Create notification for followers
      if (clubData.followers && clubData.followers.length > 0) {
        const storedNotifications = JSON.parse(localStorage.getItem('unihub_notifications') || '[]');
        
        clubData.followers.forEach(userId => {
          storedNotifications.push({
            id: Date.now().toString() + userId,
            userId,
            type: 'new_event',
            title: `New Event: ${eventData.title}`,
            message: `${clubData.name} has posted a new event: ${eventData.title} on ${new Date(eventData.date).toLocaleDateString()}.`,
            date: new Date().toISOString(),
            read: false,
            clubId: clubData.id,
            eventId: eventData.id
          });
        });
        
        localStorage.setItem('unihub_notifications', JSON.stringify(storedNotifications));
      }
      
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Error</h2>
              <p className="mt-1 text-sm text-red-600">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/clubs/register')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Register a Club
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Event</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new event for {clubData.name}.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <EventForm clubId={clubData.id} onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}
