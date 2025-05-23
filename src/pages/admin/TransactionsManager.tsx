
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/admin/DataTable';
import { toast } from '@/hooks/use-toast';

const TransactionsManager = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    { id: 'TXN001', type: 'Deposit', amount: 100.00, user: 'john@example.com', status: 'Completed', date: '2024-01-15 10:30' },
    { id: 'TXN002', type: 'Withdraw', amount: 50.00, user: 'sarah@example.com', status: 'Pending', date: '2024-01-15 09:15' },
    { id: 'TXN003', type: 'Win', amount: 250.00, user: 'mike@example.com', status: 'Completed', date: '2024-01-14 20:45' },
    { id: 'TXN004', type: 'Ticket Purchase', amount: 5.00, user: 'emily@example.com', status: 'Completed', date: '2024-01-14 18:20' },
    { id: 'TXN005', type: 'Withdraw', amount: 75.00, user: 'john@example.com', status: 'Rejected', date: '2024-01-14 16:10' },
  ];

  const columns = [
    { key: 'id', header: 'Transaction ID' },
    { 
      key: 'type', 
      header: 'Type',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Deposit' ? 'bg-green-100 text-green-800' :
          value === 'Withdraw' ? 'bg-red-100 text-red-800' :
          value === 'Win' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value: number) => `₵${value.toFixed(2)}`
    },
    { key: 'user', header: 'User' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'date', header: 'Date' },
  ];

  const handleApprove = (transaction: any) => {
    toast({
      title: "Transaction Approved",
      description: `Transaction ${transaction.id} has been approved.`,
    });
  };

  const handleReject = (transaction: any) => {
    toast({
      title: "Transaction Rejected",
      description: `Transaction ${transaction.id} has been rejected.`,
    });
  };

  const transactionActions = (row: any) => (
    <div className="space-x-2">
      {row.status === 'Pending' && (
        <>
          <Button size="sm" onClick={() => handleApprove(row)}>
            Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleReject(row)}>
            Reject
          </Button>
        </>
      )}
      {row.status !== 'Pending' && (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )}
    </div>
  );

  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
    const typeMatch = typeFilter === 'all' || transaction.type.toLowerCase().includes(typeFilter.toLowerCase());
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2>
          <p className="text-gray-600">Monitor and manage all platform transactions</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdraw">Withdrawals</option>
                <option value="win">Winnings</option>
                <option value="ticket">Ticket Purchases</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <DataTable 
        data={filteredTransactions} 
        columns={columns} 
        actions={transactionActions}
      />
    </div>
  );
};

export default TransactionsManager;
