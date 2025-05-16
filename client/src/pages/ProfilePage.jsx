import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>
      <div className="text-lg text-gray-700 space-y-4">
        <p><span className="font-semibold">Username:</span> {profile.username}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
