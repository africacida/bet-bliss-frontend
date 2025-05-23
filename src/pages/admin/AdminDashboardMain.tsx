
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AdminDashboardMain = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', color: 'bg-blue-500' },
    { title: 'Wallet Balance', value: '₵45,670', change: '+8%', color: 'bg-green-500' },
    { title: 'Active Jackpot Draws', value: '3', change: '0%', color: 'bg-purple-500' },
    { title: 'Lucky Draw Entries Today', value: '2,345', change: '+24%', color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { time: '10:30 AM', activity: 'New jackpot draw created', user: 'System' },
    { time: '10:15 AM', activity: 'User won lucky draw', user: 'john@example.com' },
    { time: '9:45 AM', activity: 'Withdrawal approved', user: 'sarah@example.com' },
    { time: '9:30 AM', activity: 'New user registered', user: 'mike@example.com' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your platform's performance and activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white text-xl font-bold">
                    {stat.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-900">Create New Jackpot Draw</p>
                <p className="text-sm text-blue-700">Set up a new lottery draw</p>
              </button>
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <p className="font-medium text-green-900">Manage Lucky Draw</p>
                <p className="text-sm text-green-700">Configure draw settings</p>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <p className="font-medium text-purple-900">View Reports</p>
                <p className="text-sm text-purple-700">Check platform analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
