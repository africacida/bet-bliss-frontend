
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  type: 'bet' | 'win' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'win': return 'text-green-400';
      case 'deposit': return 'text-blue-400';
      case 'withdraw': return 'text-orange-400';
      case 'bet': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/70 py-2">Type</th>
                <th className="text-left text-white/70 py-2">Description</th>
                <th className="text-right text-white/70 py-2">Amount</th>
                <th className="text-center text-white/70 py-2">Status</th>
                <th className="text-right text-white/70 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/10">
                  <td className={`py-3 font-medium capitalize ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </td>
                  <td className="py-3 text-white">{transaction.description}</td>
                  <td className="py-3 text-right text-white font-medium">
                    {transaction.type === 'win' || transaction.type === 'deposit' ? '+' : '-'}₵{transaction.amount}
                  </td>
                  <td className={`py-3 text-center capitalize ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </td>
                  <td className="py-3 text-right text-white/70">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
