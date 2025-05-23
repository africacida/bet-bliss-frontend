
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/admin/DataTable';
import { toast } from '@/hooks/use-toast';

const LuckyDrawManager = () => {
  const [isGameActive, setIsGameActive] = useState(true);
  const [interval, setInterval] = useState('60');
  const [entryCost, setEntryCost] = useState('2');
  const [availableItems, setAvailableItems] = useState(['🍎', '🍌', '🍇', '🍒', '🍊']);

  const recentDraws = [
    { time: '14:30:00', winningItem: '🍎', totalEntries: 45, winners: 3 },
    { time: '14:29:00', winningItem: '🍌', totalEntries: 38, winners: 2 },
    { time: '14:28:00', winningItem: '🍇', totalEntries: 52, winners: 4 },
    { time: '14:27:00', winningItem: '🍒', totalEntries: 41, winners: 1 },
  ];

  const columns = [
    { key: 'time', header: 'Time' },
    { 
      key: 'winningItem', 
      header: 'Winning Item',
      render: (value: string) => <span className="text-2xl">{value}</span>
    },
    { key: 'totalEntries', header: 'Total Entries' },
    { key: 'winners', header: 'Winners' },
  ];

  const handleToggleGame = () => {
    setIsGameActive(!isGameActive);
    toast({
      title: isGameActive ? "Game Stopped" : "Game Started",
      description: `Lucky draw game has been ${isGameActive ? 'stopped' : 'started'}.`,
    });
  };

  const handleUpdateSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Lucky draw settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lucky Draw Manager</h2>
        <p className="text-gray-600">Configure and monitor real-time lucky draws</p>
      </div>

      {/* Game Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Game Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Game Status</p>
                <p className="text-sm text-gray-600">
                  {isGameActive ? 'Running' : 'Stopped'}
                </p>
              </div>
              <Button 
                onClick={handleToggleGame}
                variant={isGameActive ? "destructive" : "default"}
              >
                {isGameActive ? 'Stop Game' : 'Start Game'}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Draw Interval (seconds)
              </label>
              <Input
                type="number"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Cost (₵)
              </label>
              <Input
                type="number"
                value={entryCost}
                onChange={(e) => setEntryCost(e.target.value)}
                placeholder="2"
              />
            </div>

            <Button onClick={handleUpdateSettings} className="w-full">
              Update Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {availableItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{item}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setAvailableItems(items => items.filter((_, i) => i !== index))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Add new item (emoji)" />
                <Button>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Draws */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Draws</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={recentDraws} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LuckyDrawManager;
