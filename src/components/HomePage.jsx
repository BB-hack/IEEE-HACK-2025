import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, AlertCircle, Shield, Clock, BarChart3, Bell, Lock } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Fair Digital
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Queuing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Solving digital overload with equitable access. No more crashed servers, jumped queues, or unfair systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/join-queue')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                Join Queue Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/features')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem We Solve</h2>
            <p className="text-lg text-gray-600">Current digital systems fail under massive user surges</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">System Crashes</h3>
              <p className="text-gray-600">Railway bookings, exam registrations collapse under millions of concurrent users</p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unfair Access</h3>
              <p className="text-gray-600">Bots jump queues, privileged users get advantage, regular users suffer</p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Poor Experience</h3>
              <p className="text-gray-600">Users get disconnected, lose progress, face uncertainty and frustration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Solution: Fair & Transparent</h2>
            <p className="text-xl mb-12 opacity-90">Digital queuing that ensures equitable access for everyone</p>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Fair Queuing</h3>
                <p className="text-sm opacity-80">First come, first served with anti-bot protection</p>
              </div>
              
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Load Balancing</h3>
                <p className="text-sm opacity-80">Distributed processing across multiple servers</p>
              </div>
              
              <div className="text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm opacity-80">Live position tracking and notifications</p>
              </div>
              
              <div className="text-center">
                <Lock className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Blockchain Fairness</h3>
                <p className="text-sm opacity-80">Immutable queue order verification</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;