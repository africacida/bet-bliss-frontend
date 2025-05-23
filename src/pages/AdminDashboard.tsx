
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [drawDate, setDrawDate] = useState('');
  const [prizePool, setPrizePool] = useState('');

  if (!user?.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-gray-300">You don't have permission to access this page.</p>
      </div>
    );
  }

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', balance: 250.75, tickets: 3, entries: 15 },
    { id: '2', name: 'Sarah Connor', email: 'sarah@example.com', balance: 150.25, tickets: 2, entries: 8 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', balance: 75.50, tickets: 1, entries: 5 },
  ];

  const handleCreateDraw = () => {
    if (drawDate && prizePool) {
      toast({
        title: "Draw Created",
        description: `New jackpot draw scheduled for ${drawDate} with ₵${prizePool} prize pool.`,
      });
      setDrawDate('');
      setPrizePool('');
    }
  };

  const handleTriggerDraw = (type: string) => {
    toast({
      title: "Draw Triggered",
      description: `${type} draw has been triggered successfully.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🛠️ Admin Dashboard</h1>
        <p className="text-gray-300">Manage games, users, and system settings</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white">1,234</div>
            <div className="text-white/80 text-sm">Total Users</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-600 to-teal-600 border-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white">₵45,670</div>
            <div className="text-white/80 text-sm">Total Revenue</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white">567</div>
            <div className="text-white/80 text-sm">Active Tickets</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white">2,345</div>
            <div className="text-white/80 text-sm">Draw Entries Today</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Create Jackpot Draw */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">🎰 Create Jackpot Draw</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Draw Date & Time</label>
              <Input
                type="datetime-local"
                value={drawDate}
                onChange={(e) => setDrawDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Prize Pool (₵)</label>
              <Input
                type="number"
                placeholder="Enter prize amount"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button 
              onClick={handleCreateDraw}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500"
            >
              Create Draw
            </Button>
          </CardContent>
        </Card>

        {/* Trigger Draws */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">⚡ Manual Draw Triggers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => handleTriggerDraw('Jackpot')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Trigger Jackpot Draw
            </Button>
            <Button 
              onClick={() => handleTriggerDraw('Lucky Draw')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500"
            >
              Trigger Lucky Draw
            </Button>
            <div className="text-xs text-gray-400 mt-2">
              Use these buttons to manually trigger draws for testing or special events.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Management */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">👥 User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white p-3">User</th>
                  <th className="text-left text-white p-3">Email</th>
                  <th className="text-left text-white p-3">Balance</th>
                  <th className="text-left text-white p-3">Tickets</th>
                  <th className="text-left text-white p-3">Draw Entries</th>
                  <th className="text-left text-white p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10">
                    <td className="text-white p-3 font-semibold">{user.name}</td>
                    <td className="text-gray-300 p-3">{user.email}</td>
                    <td className="text-green-400 p-3">₵{user.balance.toFixed(2)}</td>
                    <td className="text-white p-3">{user.tickets}</td>
                    <td className="text-white p-3">{user.entries}</td>
                    <td className="p-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
