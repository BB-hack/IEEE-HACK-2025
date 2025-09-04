import React from 'react'
import { Users, TrendingUp, Shield, Bell, BarChart3, Lock } from 'lucide-react';    
const FeaturesPage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Fair Digital Queuing",
      description: "First-come-first-served principle with advanced anti-bot protection",
      color: "blue"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Scalable Architecture",
      description: "Handle millions of concurrent users without system crashes",
      color: "green"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bot Protection",
      description: "Advanced CAPTCHA and behavioral analysis to prevent queue jumping",
      color: "red"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Notifications",
      description: "Instant updates on queue position and turn notifications",
      color: "purple"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Load Distribution",
      description: "Smart load balancing across multiple servers and regions",
      color: "orange"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Blockchain Transparency",
      description: "Immutable queue records for complete transparency and fairness",
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h1>
          <p className="text-xl text-gray-600">Advanced queuing technology for fair digital access</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-6 text-${feature.color}-600`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Real-World Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Railway Booking", desc: "Handle millions during ticket releases", icon: "🚂" },
              { title: "Exam Registration", desc: "Fair access to competitive exam seats", icon: "📝" },
              { title: "Government Services", desc: "Equitable access to public services", icon: "🏛️" },
              { title: "Event Ticketing", desc: "Concert and sports event bookings", icon: "🎫" }
            ].map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default FeaturesPage;
