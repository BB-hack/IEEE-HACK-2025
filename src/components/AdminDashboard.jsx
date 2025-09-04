// import React from 'react'
// import { useSelector } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
// import { Users, TrendingUp, Clock, CheckCircle, Download, Pause, Play } from 'lucide-react';


// const AdminDashboard = () => {
//   const adminState = useSelector(state => state.admin);
//   const queueState = useSelector(state => state.queue);

//   const chartData = [
//     { name: '00:00', requests: 1200, processed: 980 },
//     { name: '04:00', requests: 800, processed: 750 },
//     { name: '08:00', requests: 2400, processed: 2100 },
//     { name: '12:00', requests: 3200, processed: 2800 },
//     { name: '16:00', requests: 2800, processed: 2600 },
//     { name: '20:00', requests: 1600, processed: 1400 }
//   ];

//   const pieData = [
//     { name: 'Railway', value: 45, color: '#3B82F6' },
//     { name: 'Exam', value: 32, color: '#10B981' },
//     { name: 'Government', value: 23, color: '#F59E0B' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Monitor and manage queue systems</p>
//         </div>

//         {/* Metrics Cards */}
//         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Requests</p>
//                 <p className="text-2xl font-bold text-gray-900">{adminState.metrics.totalRequests.toLocaleString()}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Peak Load</p>
//                 <p className="text-2xl font-bold text-gray-900">{adminState.metrics.peakLoad.toLocaleString()}</p>
//               </div>
//               <TrendingUp className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Wait Time</p>
//                 <p className="text-2xl font-bold text-gray-900">{adminState.metrics.avgWaitTime}s</p>
//               </div>
//               <Clock className="w-8 h-8 text-orange-500" />
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Success Rate</p>
//                 <p className="text-2xl font-bold text-gray-900">{adminState.metrics.successRate}%</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume Over Time</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} />
//                 <Line type="monotone" dataKey="processed" stroke="#10B981" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Distribution</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <RechartsPieChart>
//                 <Tooltip />
//                 <RechartsPieChart.Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </RechartsPieChart.Pie>
//               </RechartsPieChart>
//             </ResponsiveContainer>
//             <div className="mt-4 space-y-2">
//               {pieData.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm text-gray-600">{item.name}</span>
//                   </div>
//                   <span className="text-sm font-medium">{item.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Active Queues Table */}
//         <div className="bg-white rounded-xl shadow-sm mb-8">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">Active Queues</h3>
//               <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                 <Download className="w-4 h-4" />
//                 <span>Export Data</span>
//               </button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Queue Name</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Users in Queue</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Rate</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {adminState.queues.map((queue) => (
//                   <tr key={queue.id} className="hover:bg-gray-50">
//                     <td className="py-4 px-6">
//                       <div className="font-medium text-gray-900">{queue.name}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         queue.active 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {queue.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-gray-900">{queue.users.toLocaleString()}</td>
//                     <td className="py-4 px-6 text-gray-900">{queue.processing}/s</td>
//                     <td className="py-4 px-6">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800 font-medium">Manage</button>
//                         <button className="text-gray-600 hover:text-gray-800">
//                           {queue.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Real-time Queue Monitor */}
//         <div className="bg-white rounded-xl shadow-sm">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Live Queue Monitor</h3>
//           </div>
//           <div className="p-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {queueState.users.slice(0, 6).map((user, index) => (
//                 <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div>
//                     <div className="font-medium text-gray-900">User #{user.position}</div>
//                     <div className="text-sm text-gray-500">ID: {user.id}</div>
//                   </div>
//                   <div className={`px-2 py-1 text-xs font-medium rounded-full ${
//                     user.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
//                     user.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                     'bg-green-100 text-green-800'
//                   }`}>
//                     {user.status}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AdminDashboard;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   PieChart as RechartsPieChart, Cell 
// } from 'recharts';
// import { Users, TrendingUp, Clock, CheckCircle, Download, Pause, Play } from 'lucide-react';

// const AdminDashboard = () => {
//   const adminState = useSelector(state => state.admin);
//   const queueState = useSelector(state => state.queue);

//   const chartData = [
//     { name: '00:00', requests: 1200, processed: 980 },
//     { name: '04:00', requests: 800, processed: 750 },
//     { name: '08:00', requests: 2400, processed: 2100 },
//     { name: '12:00', requests: 3200, processed: 2800 },
//     { name: '16:00', requests: 2800, processed: 2600 },
//     { name: '20:00', requests: 1600, processed: 1400 }
//   ];

//   const pieData = [
//     { name: 'Railway', value: 45, color: '#3B82F6' },
//     { name: 'Exam', value: 32, color: '#10B981' },
//     { name: 'Government', value: 23, color: '#F59E0B' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Monitor and manage queue systems</p>
//         </div>

//         {/* Metrics Cards */}
//         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Requests</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {adminState.metrics?.totalRequests?.toLocaleString() || 0}
//                 </p>
//               </div>
//               <Users className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Peak Load</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {adminState.metrics?.peakLoad?.toLocaleString() || 0}
//                 </p>
//               </div>
//               <TrendingUp className="w-8 h-8 text-green-500" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Wait Time</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {adminState.metrics?.avgWaitTime ?? 0}s
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-orange-500" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Success Rate</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {adminState.metrics?.successRate ?? 0}%
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume Over Time</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} />
//                 <Line type="monotone" dataKey="processed" stroke="#10B981" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Distribution</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <RechartsPieChart>
//                 <Tooltip />
//                 <RechartsPieChart.Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </RechartsPieChart.Pie>
//               </RechartsPieChart>
//             </ResponsiveContainer>
//             <div className="mt-4 space-y-2">
//               {pieData.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm text-gray-600">{item.name}</span>
//                   </div>
//                   <span className="text-sm font-medium">{item.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Active Queues Table */}
//         <div className="bg-white rounded-xl shadow-sm mb-8">
//           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">Active Queues</h3>
//             <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               <Download className="w-4 h-4" />
//               <span>Export Data</span>
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Queue Name</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Users in Queue</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Rate</th>
//                   <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {adminState.queues?.map((queue) => (
//                   <tr key={queue.id} className="hover:bg-gray-50">
//                     <td className="py-4 px-6">
//                       <div className="font-medium text-gray-900">{queue.name}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         queue.active 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {queue.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-gray-900">{queue.users?.toLocaleString() || 0}</td>
//                     <td className="py-4 px-6 text-gray-900">{queue.processing ?? 0}/s</td>
//                     <td className="py-4 px-6">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800 font-medium">Manage</button>
//                         <button className="text-gray-600 hover:text-gray-800">
//                           {queue.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Real-time Queue Monitor */}
//         <div className="bg-white rounded-xl shadow-sm">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Live Queue Monitor</h3>
//           </div>
//           <div className="p-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {queueState.users?.slice(0, 6).map((user, index) => (
//                 <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div>
//                     <div className="font-medium text-gray-900">User #{user.position ?? index + 1}</div>
//                     <div className="text-sm text-gray-500">ID: {user.id ?? 'N/A'}</div>
//                   </div>
//                   <div className={`px-2 py-1 text-xs font-medium rounded-full ${
//                     user.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
//                     user.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                     'bg-green-100 text-green-800'
//                   }`}>
//                     {user.status ?? 'waiting'}
//                   </div>
//                 </div>
//               )) || <p>No active users</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React from 'react';
import { useSelector } from 'react-redux';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Users, TrendingUp, Clock, CheckCircle, Download, Pause, Play } from 'lucide-react';

const AdminDashboard = () => {
  const adminState = useSelector(state => state.admin);
  const queueState = useSelector(state => state.queue);

  const chartData = [
    { name: '00:00', requests: 1200, processed: 980 },
    { name: '04:00', requests: 800, processed: 750 },
    { name: '08:00', requests: 2400, processed: 2100 },
    { name: '12:00', requests: 3200, processed: 2800 },
    { name: '16:00', requests: 2800, processed: 2600 },
    { name: '20:00', requests: 1600, processed: 1400 }
  ];

  const pieData = [
    { name: 'Railway', value: 45, color: '#3B82F6' },
    { name: 'Exam', value: 32, color: '#10B981' },
    { name: 'Government', value: 23, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage queue systems</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminState.metrics?.totalRequests?.toLocaleString() || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peak Load</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminState.metrics?.peakLoad?.toLocaleString() || 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminState.metrics?.avgWaitTime ?? 0}s
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminState.metrics?.successRate ?? 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="processed" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Queues Table */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Queues</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Queue Name</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Users in Queue</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Rate</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminState.queues?.map((queue) => (
                  <tr key={queue.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{queue.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        queue.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {queue.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{queue.users?.toLocaleString() || 0}</td>
                    <td className="py-4 px-6 text-gray-900">{queue.processing ?? 0}/s</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Manage</button>
                        <button className="text-gray-600 hover:text-gray-800">
                          {queue.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Queue Monitor */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Live Queue Monitor</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queueState.users?.slice(0, 6).map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">User #{user.position ?? index + 1}</div>
                    <div className="text-sm text-gray-500">ID: {user.id ?? 'N/A'}</div>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                    user.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.status ?? 'waiting'}
                  </div>
                </div>
              )) || <p>No active users</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
