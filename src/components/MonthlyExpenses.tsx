import React from 'react';
import { formatCurrency } from '../utils/format';
import { Transaction } from '../types';

interface MonthlyExpensesProps {
  transactions: Transaction[];
  monthlyBudget: number;
}

export function MonthlyExpenses({ transactions, monthlyBudget }: MonthlyExpensesProps) {
  // Group transactions by month
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const monthYear = transaction.date.substring(0, 7); // Get YYYY-MM
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // Sort months in descending order
  const sortedMonths = Object.keys(groupedTransactions).sort().reverse();

  // Calculate remaining budget for each month
  const getMonthStatus = (monthTransactions: Transaction[]) => {
    const totalSpent = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    const remaining = monthlyBudget - totalSpent;
    const percentage = (remaining / monthlyBudget) * 100;

    return {
      remaining,
      color: percentage <= 0 ? 'bg-red-100 text-red-800' : 
             percentage <= 20 ? 'bg-yellow-100 text-yellow-800' : 
             'bg-emerald-100 text-emerald-800'
    };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMonths.map(month => {
          const monthTransactions = groupedTransactions[month];
          const { remaining, color } = getMonthStatus(monthTransactions);
          const [year, monthNum] = month.split('-');
          const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' });

          return (
            <div key={month} className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  {monthName} {year}
                </h3>
                <div className={`mt-2 p-2 rounded-lg ${color}`}>
                  <p className="text-sm">
                    Remaining: {formatCurrency(remaining)}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {monthTransactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(transaction => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}