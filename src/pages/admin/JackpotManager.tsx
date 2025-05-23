
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/admin/DataTable';
import AdminModal from '@/components/admin/AdminModal';
import { toast } from '@/hooks/use-toast';

const JackpotManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEntriesModal, setShowEntriesModal] = useState(false);
  const [selectedDraw, setSelectedDraw] = useState<any>(null);

  const draws = [
    { id: 'JD001', date: '2024-01-15 20:00', prize: '₵10,000', ticketsSold: 450, status: 'Active' },
    { id: 'JD002', date: '2024-01-08 20:00', prize: '₵8,500', ticketsSold: 340, status: 'Completed' },
    { id: 'JD003', date: '2024-01-01 20:00', prize: '₵12,000', ticketsSold: 600, status: 'Completed' },
  ];

  const mockEntries = [
    { user: 'john@example.com', numbers: '12, 24, 36, 42, 45, 49', purchased: '2024-01-10' },
    { user: 'sarah@example.com', numbers: '5, 15, 25, 35, 40, 48', purchased: '2024-01-11' },
    { user: 'mike@example.com', numbers: '1, 7, 14, 21, 28, 35', purchased: '2024-01-12' },
  ];

  const columns = [
    { key: 'id', header: 'Draw ID' },
    { key: 'date', header: 'Date & Time' },
    { key: 'prize', header: 'Prize Pool' },
    { key: 'ticketsSold', header: 'Tickets Sold' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const entriesColumns = [
    { key: 'user', header: 'User' },
    { key: 'numbers', header: 'Selected Numbers' },
    { key: 'purchased', header: 'Purchase Date' },
  ];

  const handleCreateDraw = () => {
    toast({
      title: "Draw Created",
      description: "New jackpot draw has been created successfully.",
    });
    setShowCreateModal(false);
  };

  const handleTriggerDraw = (draw: any) => {
    toast({
      title: "Draw Triggered",
      description: `Jackpot draw ${draw.id} has been triggered.`,
    });
  };

  const handleViewEntries = (draw: any) => {
    setSelectedDraw(draw);
    setShowEntriesModal(true);
  };

  const drawActions = (row: any) => (
    <div className="space-x-2">
      <Button size="sm" variant="outline" onClick={() => handleViewEntries(row)}>
        View Entries
      </Button>
      {row.status === 'Active' && (
        <Button size="sm" onClick={() => handleTriggerDraw(row)}>
          Trigger Draw
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jackpot Manager</h2>
          <p className="text-gray-600">Manage lottery draws and view entries</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Create New Draw
        </Button>
      </div>

      {/* Draws Table */}
      <DataTable 
        data={draws} 
        columns={columns} 
        actions={drawActions}
      />

      {/* Create Draw Modal */}
      <AdminModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Jackpot Draw"
        description="Set up a new lottery draw with date, time, and prize pool"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
            <Input type="datetime-local" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Price (₵)</label>
            <Input type="number" placeholder="5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prize Pool (₵)</label>
            <Input type="number" placeholder="10000" />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleCreateDraw}>Create Draw</Button>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
          </div>
        </div>
      </AdminModal>

      {/* View Entries Modal */}
      <AdminModal
        isOpen={showEntriesModal}
        onClose={() => setShowEntriesModal(false)}
        title={`Entries for Draw ${selectedDraw?.id}`}
        description="View all user entries for this draw"
      >
        <DataTable data={mockEntries} columns={entriesColumns} />
      </AdminModal>
    </div>
  );
};

export default JackpotManager;
