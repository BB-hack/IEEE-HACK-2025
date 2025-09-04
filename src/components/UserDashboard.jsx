import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Clock, Activity, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const queueState = useSelector(state => state.queue);
  const dispatch = useDispatch();
  const [timeInQueue, setTimeInQueue] = useState(0);
  const [estimatedWait, setEstimatedWait] = useState(0);

  useEffect(() => {
    if (queueState.isActive) {
      const interval = setInterval(() => {
        setTimeInQueue(prev => prev + 1);
        
        // Simulate queue processing
        if (Math.random() > 0.7) {
          dispatch({
            type: 'UPDATE_POSITION',
            payload: { processed: 1 }
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [queueState.isActive, dispatch]);

  useEffect(() => {
    if (queueState.currentPosition) {
      setEstimatedWait(Math.ceil(queueState.currentPosition / queueState.processingRate / 60));
    }
  }, [queueState.currentPosition, queueState.processingRate]);

  if (!queueState.isActive) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Active Queue</h2>
          <p className="text-gray-600 mb-6">Join a queue to track your position</p>
          <Link to="/join-queue" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Join Queue
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.max(0, ((queueState.totalUsers - queueState.currentPosition + 1) / queueState.totalUsers) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Queue Position</h1>
            <p className="text-gray-600">Stay on this page to maintain your position</p>
          </div>

          {/* Position Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              #{queueState.currentPosition}
            </div>
            <p className="text-xl text-gray-600">of {queueState.totalUsers} users</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-blue-600">{estimatedWait}m</div>
              <div className="text-sm text-gray-600">Estimated Wait</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-green-600">{Math.floor(timeInQueue / 60)}:{(timeInQueue % 60).toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Time in Queue</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-purple-600">{queueState.processingRate}/s</div>
              <div className="text-sm text-gray-600">Processing Rate</div>
            </div>
          </div>

          {/* Action Button */}
          {queueState.currentPosition <= 5 && (
            <div className="mt-8 text-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                🎉 Almost your turn! Get ready to proceed.
              </div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Proceed to Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;