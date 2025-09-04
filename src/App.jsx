// import './App.css'
// import { Provider } from "react-redux";
// import store from "./store/store"; // ✅ your Redux store
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// import HomePage from './components/HomePage';
// import FeaturesPage from './components/FeaturesPage';
// import JoinQueuePage from './components/JoinQueuePage';
// import UserDashboard from './components/UserDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import AboutPage from './components/AboutPage';
// import Header from './components/Header';

// import { Users } from 'lucide-react';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Header />
          
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/features" element={<FeaturesPage />} />
//             <Route path="/join-queue" element={<JoinQueuePage />} />
//             <Route path="/user-dashboard" element={<UserDashboard />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/about" element={<AboutPage />} />
//           </Routes>

//           {/* Footer */}
//           <footer className="bg-gray-900 text-white py-12">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid md:grid-cols-4 gap-8">
//                 {/* Brand */}
//                 <div>
//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                       <Users className="w-5 h-5 text-white" />
//                     </div>
//                     <span className="text-xl font-bold">QueueFair</span>
//                   </div>
//                   <p className="text-gray-400">
//                     Fair digital queuing for everyone. Solving overload with equitable access.
//                   </p>
//                 </div>

//                 {/* Product Links */}
//                 <div>
//                   <h3 className="font-semibold mb-4">Product</h3>
//                   <ul className="space-y-2 text-gray-400">
//                     <li><Link to="/features" className="hover:text-white">Features</Link></li>
//                     <li><Link to="/join-queue" className="hover:text-white">Join Queue</Link></li>
//                     <li><Link to="/admin" className="hover:text-white">Admin Dashboard</Link></li>
//                   </ul>
//                 </div>

//                 {/* Company Links */}
//                 <div>
//                   <h3 className="font-semibold mb-4">Company</h3>
//                   <ul className="space-y-2 text-gray-400">
//                     <li><Link to="/about" className="hover:text-white">About</Link></li>
//                     <li><a href="#" className="hover:text-white">Contact</a></li>
//                     <li><a href="#" className="hover:text-white">Privacy</a></li>
//                   </ul>
//                 </div>

//                 {/* Use Cases */}
//                 <div>
//                   <h3 className="font-semibold mb-4">Use Cases</h3>
//                   <ul className="space-y-2 text-gray-400">
//                     <li>Railway Booking</li>
//                     <li>Exam Registration</li>
//                     <li>Government Services</li>
//                     <li>Event Ticketing</li>
//                   </ul>
//                 </div>
//               </div>
              
//               {/* Footer Bottom */}
//               <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//                 <p>&copy; 2024 QueueFair. All rights reserved. Fair access for everyone.</p>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { LogIn, LogOut, Ticket, Plus, User, Key, Clock, CheckCircle, XCircle, Home, Info, ShoppingBag, Search, Calendar, MapPin, Drama, Mic, BarChartIcon, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- LLM Configuration ---
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=`;
const SYSTEM_PROMPT_DETAILS = "You are an event planner. Your task is to create a comprehensive and engaging event schedule and details based on the user's booked ticket. Your response should be formatted as a detailed, multi-paragraph plan. Do not include any titles or markdown headers, just the raw text of the event details. Do not mention that you are an AI or language model.";
const SYSTEM_PROMPT_DESCRIPTION = "You are a professional copywriter for an events and ticketing company. Your task is to write a compelling, marketing-focused description for an event ticket. The description should be engaging and descriptive, and should not use markdown or titles.";

const generateContent = async (systemPrompt, userQuery) => {
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ "google_search": {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('API response missing content.');
    return text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return "Sorry, I couldn't generate a response at this time. Please try again later.";
  }
};
// --- End of LLM Configuration ---

// --- React Context for State Management ---
const AppContext = createContext();

const AppStateProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [queue, setQueue] = useState(null);
  const [tickets, setTickets] = useState([
    { id: '1', title: 'Mega Music Fest', description: 'Experience a weekend of non-stop music with top artists from around the globe. This festival ticket grants you access to all stages, exclusive after-parties, and a vibrant community of music lovers.', price: 199.00, available: 50, booked: 0 },
    { id: '2', title: 'Comedy Night Live', description: 'Laugh until you cry with a lineup of hilarious stand-up comedians. Enjoy an evening of sharp wit and side-splitting jokes in an intimate theater setting. A perfect night out with friends.', price: 45.50, available: 30, booked: 0 },
    { id: '3', title: 'Movie Screening: The Andromeda Strain', description: 'A special screening of the classic sci-fi thriller "The Andromeda Strain." Relive the tension and mystery on the big screen with an enhanced visual and sound experience.', price: 15.00, available: 100, booked: 0 },
    { id: '4', title: 'Art & Culture Fair', description: 'Explore a vibrant fair showcasing local and international artists. Discover unique paintings, sculptures, and installations, and participate in interactive workshops. A creative adventure for all ages.', price: 30.75, available: 25, booked: 0 },
  ]);
  const [bookedTickets, setBookedTickets] = useState([]);

  const state = { auth, message, queue, tickets, bookedTickets };
  const actions = {
    login: (user) => setAuth({ isLoggedIn: true, user }),
    logout: () => setAuth({ isLoggedIn: false, user: null }),
    setMessage: (msg) => setMessage(msg),
    joinQueue: (queueData) => setQueue(queueData),
    exitQueue: () => setQueue(null),
    addTicket: (newTicket) => setTickets(prev => [...prev, newTicket]),
    bookTicket: (ticketId) => {
      const ticketToBook = tickets.find(t => t.id === ticketId);
      if (ticketToBook && ticketToBook.available > 0) {
        setTickets(prev =>
          prev.map(ticket =>
            ticket.id === ticketId
              ? { ...ticket, available: ticket.available - 1, booked: ticket.booked + 1 }
              : ticket
          )
        );
        setBookedTickets(prev => [...prev, { ...ticketToBook, bookingDate: new Date().toISOString() }]);
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
// --- End of React Context ---

// A reusable component to display messages to the user.
const Message = () => {
  const { state } = useContext(AppContext);
  const { text, type } = state.message;
  if (!text) return null;
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };
  return (
    <div className={`p-4 rounded-xl shadow-md mb-6 transition-all duration-300 ease-in-out ${
      type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
      type === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' :
      'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
    } transform scale-100`}>
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="font-medium">{text}</span>
      </div>
    </div>
  );
};

// Login View for mock user authentication.
const LoginView = () => {
  const { actions } = useContext(AppContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const MOCK_USERS = [
    { username: 'admin', password: 'password', role: 'admin' },
    { username: 'user', password: 'password', role: 'user' },
  ];
  const handleLogin = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      actions.login(user);
      actions.setMessage({ text: `Welcome, ${user.username}!`, type: 'info' });
      navigate(user.role === 'admin' ? '/admin' : '/events');
    } else {
      actions.setMessage({ text: 'Invalid username or password.', type: 'error' });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-lg bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center flex items-center justify-center space-x-3">
          <LogIn className="h-8 sm:h-10 w-8 sm:w-10 text-blue-400" />
          <span>Login to Account</span>
        </h1>
        <p className="text-gray-400 text-center text-sm sm:text-base">Sign in to book or manage events</p>
        <Message />
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-400 block">Username</label>
            <div className="mt-2 relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-xl pl-12 pr-4 py-3 bg-gray-700 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin or user"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 block">Password</label>
            <div className="mt-2 relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl pl-12 pr-4 py-3 bg-gray-700 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 sm:py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

// Admin View to create and manage tickets. Now with Gemini API integration and charts.
const AdminView = () => {
  const { state, actions } = useContext(AppContext);
  const tickets = state.tickets;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Data for the chart
  const chartData = tickets.map(ticket => ({
    name: ticket.title,
    available: ticket.available,
    booked: ticket.booked,
  }));

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now().toString(),
      title,
      description,
      price: parseFloat(price),
      available: parseInt(quantity, 10),
      booked: 0
    };
    actions.addTicket(newTicket);
    actions.setMessage({ text: 'Ticket created successfully!', type: 'success' });
    setTitle('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const userQuery = `Event Title: "${title}". Generate a short, compelling description for this event ticket.`;
    const generatedText = await generateContent(SYSTEM_PROMPT_DESCRIPTION, userQuery);
    setDescription(generatedText);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-8 text-center">Admin Dashboard</h1>
        <Message />
        
        {/* Statistics and Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-900 p-6 rounded-3xl shadow-xl flex items-center space-x-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
              <p className="text-xl font-bold text-white">$1,234.56</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl shadow-xl flex items-center space-x-4">
            <div className="p-3 bg-green-600 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Tickets Sold</p>
              <p className="text-xl font-bold text-white">{tickets.reduce((sum, ticket) => sum + ticket.booked, 0)}</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl shadow-xl flex items-center space-x-4">
            <div className="p-3 bg-purple-600 rounded-full">
              <BarChartIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Events</p>
              <p className="text-xl font-bold text-white">{tickets.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-6 flex items-center space-x-2">
            <BarChartIcon className="h-6 sm:h-7 w-6 sm:w-7 text-blue-500" />
            <span>Ticket Sales Overview</span>
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px' }}
                labelStyle={{ color: '#e5e7eb' }}
                itemStyle={{ color: '#d1d5db' }}
              />
              <Legend />
              <Bar dataKey="booked" stackId="a" fill="#3b82f6" name="Booked" />
              <Bar dataKey="available" stackId="a" fill="#10b981" name="Available" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Create New Ticket Form */}
        <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-6 flex items-center space-x-2">
            <Plus className="h-6 sm:h-7 w-6 sm:w-7 text-green-500" />
            <span>Create New Event Ticket</span>
          </h2>
          <form onSubmit={handleCreateTicket} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400">Event Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors py-2 px-3" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400">Description</label>
              <div className="relative">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="mt-1 block w-full rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors py-2 px-3" required></textarea>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !title}
                  className="absolute right-3 bottom-3 py-1.5 px-3 rounded-xl text-xs font-bold text-blue-100 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
                >
                  {isGenerating ? 'Generating...' : '✨ Generate'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Price ($)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" className="mt-1 block w-full rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors py-2 px-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" step="1" className="mt-1 block w-full rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors py-2 px-3" required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full flex justify-center py-3 sm:py-4 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105">
                Create Ticket
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-6">All Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800 rounded-xl">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Available</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Booked</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap font-medium text-white text-sm sm:text-base">{ticket.title}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">${ticket.price.toFixed(2)}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">{ticket.available}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">{ticket.booked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal to display the generated event details.
const DetailsModal = ({ show, onClose, details, isGenerating }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 max-w-lg md:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text from-blue-400 to-green-400">Event Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <XCircle className="h-7 sm:h-8 w-7 sm:w-8" />
          </button>
        </div>
        {isGenerating ? (
          <div className="text-center py-10 text-gray-400">
            <div className="animate-spin h-8 sm:h-10 w-8 sm:w-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p>Generating event details...</p>
          </div>
        ) : (
          <div className="text-gray-300 whitespace-pre-wrap text-sm sm:text-base">
            {details}
          </div>
        )}
      </div>
    </div>
  );
};

// User View to browse and book tickets. Now with Gemini API integration and search.
const UserView = () => {
  const { state, actions } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTickets = state.tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAttempt = (ticket) => {
    if (ticket.available > 0) {
      actions.joinQueue({ ticketId: ticket.id, ticketTitle: ticket.title, eta: 5 });
      navigate('/queue');
    } else {
      actions.setMessage({ text: 'Sorry, this ticket is sold out!', type: 'error' });
    }
  };

  const handleGenerateDetails = async (ticket) => {
    setIsGenerating(true);
    setShowModal(true);
    const userQuery = `Event Title: "${ticket.title}". Description: "${ticket.description}". Generate a detailed schedule and information about this event.`;
    const generatedText = await generateContent(SYSTEM_PROMPT_DETAILS, userQuery);
    setDetails(generatedText);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8 flex flex-col items-center">
      <DetailsModal show={showModal} onClose={() => setShowModal(false)} details={details} isGenerating={isGenerating} />
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center gradient-text from-blue-400 to-green-400">
          Available Events
        </h1>
        <Message />
        <div className="relative mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="bg-gray-900 p-6 rounded-3xl shadow-xl flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
              <div>
                <img
                  src={`https://placehold.co/600x400/1e293b/d1d5db?text=${encodeURIComponent(ticket.title)}`}
                  alt={ticket.title}
                  className="rounded-xl mb-4 w-full h-40 object-cover"
                />
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">{ticket.title}</h2>
                <p className="text-gray-400 mb-4 text-sm sm:text-base line-clamp-3">{ticket.description}</p>
                <div className="flex justify-between items-center text-sm font-semibold mb-4 text-gray-300">
                  <span className="text-green-400 text-lg">${ticket.price.toFixed(2)}</span>
                  <span>{ticket.available} available</span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => handleBookAttempt(ticket)}
                  className={`w-full py-3 sm:py-4 px-4 rounded-xl shadow-lg text-lg font-bold transition-all transform ${
                    ticket.available > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={ticket.available === 0}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Ticket className="h-6 w-6" />
                    <span>{ticket.available > 0 ? 'Book Ticket' : 'Sold Out'}</span>
                  </div>
                </button>
                <button
                  onClick={() => handleGenerateDetails(ticket)}
                  className="w-full py-2 px-4 rounded-xl shadow-lg text-sm font-bold transition-all transform bg-gray-700 text-gray-200 hover:bg-gray-600"
                >
                  ✨ View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Waiting Room view for the queuing mechanism.
const WaitingRoom = () => {
  const { state, actions } = useContext(AppContext);
  const navigate = useNavigate();
  const queue = state.queue;
  const [eta, setEta] = useState(queue.eta);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prevEta => {
        if (prevEta <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevEta - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (eta === 0) {
      if (queue) {
        const ticketToBook = state.tickets.find(t => t.id === queue.ticketId);
        if (ticketToBook && ticketToBook.available > 0) {
          actions.bookTicket(queue.ticketId);
          actions.setMessage({ text: `Successfully booked ticket for ${queue.ticketTitle}!`, type: 'success' });
        } else {
          actions.setMessage({ text: `Sorry, this event is now sold out!`, type: 'error' });
        }
      }
      actions.exitQueue();
      navigate('/events');
    }
  }, [eta, navigate, queue, actions, state.tickets]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-md bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 animate-pulse">
        <Clock className="h-16 sm:h-20 w-16 sm:w-20 mx-auto text-blue-400" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Welcome to the Waiting Room</h1>
        <p className="text-sm sm:text-lg text-gray-400">
          High demand for tickets. Please wait, and we'll grant you access shortly.
        </p>
        <p className="text-5xl sm:text-6xl font-black gradient-text from-green-400 to-blue-400">
          {eta}s
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">Your approximate waiting time.</p>
      </div>
    </div>
  );
};

// New component to display a user's booking history.
const BookedTicketsView = () => {
  const { state } = useContext(AppContext);
  const { bookedTickets } = state;
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDetails = async (ticket) => {
    setIsGenerating(true);
    setShowModal(true);
    const userQuery = `Event Title: "${ticket.title}". Description: "${ticket.description}". Generate a detailed schedule and information about this event.`;
    const generatedText = await generateContent(SYSTEM_PROMPT_DETAILS, userQuery);
    setDetails(generatedText);
    setIsGenerating(false);
  };

  const getIconForTitle = (title) => {
    if (title.toLowerCase().includes('music')) return <Mic className="h-10 w-10 text-blue-400" />;
    if (title.toLowerCase().includes('comedy')) return <Drama className="h-10 w-10 text-green-400" />;
    if (title.toLowerCase().includes('movie')) return <Ticket className="h-10 w-10 text-red-400" />;
    return <Calendar className="h-10 w-10 text-purple-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8 flex flex-col items-center">
      <DetailsModal show={showModal} onClose={() => setShowModal(false)} details={details} isGenerating={isGenerating} />
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center gradient-text from-green-400 to-blue-400">
          My Booked Tickets
        </h1>
        <Message />
        {bookedTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bookedTickets.map(ticket => (
              <div key={ticket.bookingDate} className="bg-gray-900 p-6 rounded-3xl shadow-xl flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-gray-800 mb-4">
                    {getIconForTitle(ticket.title)}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">{ticket.title}</h2>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base line-clamp-3">{ticket.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Booked on: {new Date(ticket.bookingDate).toLocaleDateString()}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleGenerateDetails(ticket)}
                  className="mt-4 w-full py-2 px-4 rounded-xl shadow-lg text-sm font-bold transition-all transform bg-gray-700 text-gray-200 hover:bg-gray-600"
                >
                  ✨ View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-gray-900 rounded-3xl shadow-xl">
            <h2 className="text-2xl text-gray-400 font-bold">No tickets booked yet.</h2>
            <p className="text-gray-500 mt-2">Start your adventure by booking a ticket from the "Available Events" page!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Landing Page.
const HomeView = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center text-center p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      <div className="space-y-6 max-w-4xl mx-auto z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold gradient-text from-blue-400 to-green-400 animate-fade-in">
          Your Next Event Awaits
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 animate-fade-in-2">
          Find and book tickets for the best events, concerts, and shows. We ensure seamless, stress-free access for everyone.
        </p>
        <Link to="/events" className="inline-block mt-8 py-4 px-8 sm:px-12 rounded-full shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-110 animate-fade-in-2">
          Explore Events
        </Link>
      </div>
      <style jsx>{`
        .bg-dots-pattern {
          background-image: radial-gradient(circle at 1px 1px, #4a5568 1px, transparent 0);
          background-size: 20px 20px;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-2 { animation: fade-in 1s ease-out 0.5s forwards; }
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
};

// A simple About Page.
const AboutView = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center gradient-text from-green-400 to-blue-400">
          Our Mission: Fair & Equitable Access
        </h1>
        <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <p className="text-base sm:text-lg text-gray-300">
            This platform was built to tackle the "Digital Queues & Ticketing Overload" problem statement. We've all experienced the frustration of trying to book a ticket for a high-demand event, only to have the system crash or fail under peak load.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            Our goal is to develop a **fair and resilient digital queuing mechanism** that can handle millions of requests without bias or failure. We achieve this by using a transparent, blockchain-inspired approach to ensure equitable access during high-demand events.
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            This project is a testament to our commitment to building robust, user-centric systems that guarantee a seamless experience, even when faced with overwhelming demand.
          </p>
        </div>
      </div>
    </div>
  );
};

// A consistent Footer component.
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-sm sm:text-base">
          © 2024 EventZone. All rights reserved.
        </div>
        <div className="flex space-x-4 sm:space-x-6 text-sm sm:text-base">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

// The Header/Navbar component.
const Header = () => {
  const { state, actions } = useContext(AppContext);
  const { isLoggedIn, user } = state.auth;
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate('/login');
  };
  return (
    <header className="bg-gray-900 shadow-xl p-4 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Drama className="h-8 sm:h-10 w-8 sm:w-10 text-blue-400" />
          <span className="text-xl sm:text-2xl font-bold text-white">EventZone</span>
        </div>
        <div className="hidden md:flex flex-grow items-center justify-center space-x-8">
          <Link to="/" className="flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors">
            <Home className="h-5 w-5 mr-2" /> Home
          </Link>
          <Link to="/about" className="flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors">
            <Info className="h-5 w-5 mr-2" /> About
          </Link>
          {isLoggedIn && user.role === 'user' && (
            <Link to="/events" className="flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors">
              <ShoppingBag className="h-5 w-5 mr-2" /> Events
            </Link>
          )}
          {isLoggedIn && user.role === 'user' && (
            <Link to="/my-tickets" className="flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors">
              <Ticket className="h-5 w-5 mr-2" /> My Tickets
            </Link>
          )}
          {isLoggedIn && user.role === 'admin' && (
            <Link to="/admin" className="flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors">
              <Plus className="h-5 w-5 mr-2" /> Admin
            </Link>
          )}
        </div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-medium text-gray-400 hidden lg:block">Hello, {user.username}!</span>
            <button onClick={handleLogout} className="flex items-center space-x-2 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-lg font-bold text-white bg-red-500 hover:bg-red-600 transition-colors transform hover:scale-105">
              <LogOut className="h-5 sm:h-6 w-5 sm:w-6" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center space-x-2 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors transform hover:scale-105">
            <LogIn className="h-5 sm:h-6 w-5 sm:w-6" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

// The main application component, handling routing and data fetching.
const App = () => {
  const { state } = useContext(AppContext);
  const isLoggedIn = state.auth.isLoggedIn;
  const userRole = state.auth.user?.role;
  const queue = state.queue;

  return (
      <div className="font-sans antialiased text-gray-900 bg-gray-950 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/login" element={<LoginView />} />
          {isLoggedIn && userRole === 'user' && <Route path="/events" element={<UserView />} />}
          {isLoggedIn && userRole === 'user' && <Route path="/my-tickets" element={<BookedTicketsView />} />}
          {isLoggedIn && userRole === 'admin' && <Route path="/admin" element={<AdminView />} />}
          {queue && <Route path="/queue" element={<WaitingRoom />} />}
          <Route path="*" element={<HomeView />} />
        </Routes>
        <Footer />
      </div>
  );
};

// This wrapper is needed to provide the state context to the main App component.
const AppWrapper = () => (
  <AppStateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppStateProvider>
);

export default AppWrapper;

///