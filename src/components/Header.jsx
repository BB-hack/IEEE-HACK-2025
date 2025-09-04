import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Users, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">QueueFair</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`${isActive('/features') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Features
            </Link>
            <Link 
              to="/join-queue" 
              className={`${isActive('/join-queue') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Join Queue
            </Link>
            <Link 
              to="/user-dashboard" 
              className={`${isActive('/user-dashboard') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin" 
              className={`${isActive('/admin') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <Link to="/" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Home</Link>
              <Link to="/features" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Features</Link>
              <Link to="/join-queue" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Join Queue</Link>
              <Link to="/user-dashboard" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Dashboard</Link>
              <Link to="/admin" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;

