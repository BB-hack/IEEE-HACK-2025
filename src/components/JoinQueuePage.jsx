import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Play, Shield } from 'lucide-react';


const JoinQueuePage = () => {
  const [userId, setUserId] = useState('');
  const [selectedService, setSelectedService] = useState('railway');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const services = [
    { id: 'railway', name: 'Railway Booking', users: 1247, waitTime: '~12 mins' },
    { id: 'exam', name: 'Exam Registration', users: 892, waitTime: '~8 mins' },
    { id: 'government', name: 'Government Services', users: 543, waitTime: '~5 mins' }
  ];

  const handleJoinQueue = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      dispatch({
        type: 'JOIN_QUEUE',
        payload: { userId: userId.trim(), service: selectedService }
      });
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the Fair Queue</h1>
          <p className="text-xl text-gray-600">Enter your details to secure your place in line</p>
        </div>

        {/* Service Selection */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Service</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedService === service.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">Queue: {service.users} users</p>
                <p className="text-sm text-gray-600">Wait: {service.waitTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Registration Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enter Queue</h2>
          <form onSubmit={handleJoinQueue} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Anti-bot protection enabled</span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Join Fair Queue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default JoinQueuePage;