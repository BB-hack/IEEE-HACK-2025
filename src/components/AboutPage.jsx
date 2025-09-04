import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About QueueFair</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              QueueFair is a revolutionary digital queuing solution designed to solve the fundamental problems 
              of unfair access and system overload in high-demand digital services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To create equitable access to digital services during high-demand periods, ensuring that every 
              user has a fair chance regardless of their technical advantages or connection speed.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Problem We Solve</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>System crashes during high-traffic events (railway bookings, exam registrations)</li>
              <li>Unfair queue jumping by bots and automated systems</li>
              <li>Poor user experience with disconnections and lost progress</li>
              <li>Lack of transparency in queue management</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-gray-600 mb-4">
              QueueFair implements cutting-edge technologies to ensure fairness and scalability:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Distributed Load Balancing:</strong> Spread requests across multiple servers</li>
              <li><strong>Anti-Bot Protection:</strong> Advanced algorithms to detect and prevent automated queue jumping</li>
              <li><strong>Blockchain Transparency:</strong> Immutable record of queue positions for complete fairness</li>
              <li><strong>Real-time Updates:</strong> Live position tracking and notifications</li>
              <li><strong>Priority Management:</strong> Support for emergency and special cases</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact</h2>
            <p className="text-gray-600">
              By implementing QueueFair, organizations can handle millions of concurrent users while maintaining 
              system stability and ensuring every user receives fair treatment. This leads to increased user 
              satisfaction, reduced server costs, and improved service reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
