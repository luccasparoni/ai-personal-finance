import React from 'react';
import { getCategoryIcon } from '../utils/icons';
import { formatCurrency } from '../utils/format';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <span className="font-medium text-gray-900">
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}