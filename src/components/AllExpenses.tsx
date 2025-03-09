import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Transaction } from '../types';
import { getCategoryIcon } from '../utils/icons';
import { formatCurrency } from '../utils/format';

interface AllExpensesProps {
  transactions: Transaction[];
}

export function AllExpenses({ transactions }: AllExpensesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map(t => t.category));
    return Array.from(uniqueCategories);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, selectedCategory]);

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">All Expenses</h2>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-800">
              Total amount: <span className="font-semibold">{formatCurrency(totalAmount)}</span>
              {' '}({filteredTransactions.length} transactions)
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => (
            <div key={`${transaction.id}-${transaction.date}`} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
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
    </main>
  );
}