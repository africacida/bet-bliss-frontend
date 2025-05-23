
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/admin/DataTable';
import AdminModal from '@/components/admin/AdminModal';
import { toast } from '@/hooks/use-toast';

const UsersManager = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', balance: 250.75, status: 'Active', joined: '2024-01-15' },
    { id: '2', name: 'Sarah Connor', email: 'sarah@example.com', balance: 150.25, status: 'Active', joined: '2024-01-10' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', balance: 75.50, status: 'Suspended', joined: '2024-01-05' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', balance: 320.00, status: 'Active', joined: '2024-01-20' },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'balance', 
      header: 'Balance',
      render: (value: number) => `₵${value.toFixed(2)}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'joined', header: 'Joined Date' },
  ];

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleWalletAction = (user: any) => {
    setSelectedUser(user);
    setShowWalletModal(true);
  };

  const handleSuspendUser = (user: any) => {
    toast({
      title: "User Status Updated",
      description: `${user.name} has been ${user.status === 'Active' ? 'suspended' : 'activated'}.`,
    });
  };

  const userActions = (row: any) => (
    <div className="space-x-2">
      <Button size="sm" variant="outline" onClick={() => handleViewUser(row)}>
        View Profile
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleWalletAction(row)}>
        Wallet
      </Button>
      <Button 
        size="sm" 
        variant={row.status === 'Active' ? 'destructive' : 'default'}
        onClick={() => handleSuspendUser(row)}
      >
        {row.status === 'Active' ? 'Suspend' : 'Activate'}
      </Button>
    </div>
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage user accounts and wallets</p>
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Users Table */}
      <DataTable 
        data={filteredUsers} 
        columns={columns} 
        actions={userActions}
      />

      {/* User Profile Modal */}
      <AdminModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Profile"
        description={`View details for ${selectedUser?.name}`}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Balance</label>
                <p className="text-gray-900">₵{selectedUser.balance.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="text-gray-900">{selectedUser.status}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recent Activity</label>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Purchased jackpot ticket - 2 hours ago</p>
                <p className="text-sm text-gray-600">• Joined lucky draw - 4 hours ago</p>
                <p className="text-sm text-gray-600">• Deposited ₵100 - 1 day ago</p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Wallet Modal */}
      <AdminModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        title="Wallet Management"
        description={`Manage wallet for ${selectedUser?.name}`}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Balance</label>
              <p className="text-2xl font-bold text-gray-900">₵{selectedUser.balance.toFixed(2)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Amount</label>
                <Input type="number" placeholder="Enter amount" />
                <Button className="w-full mt-2" variant="default">Credit Wallet</Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Debit Amount</label>
                <Input type="number" placeholder="Enter amount" />
                <Button className="w-full mt-2" variant="destructive">Debit Wallet</Button>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default UsersManager;
