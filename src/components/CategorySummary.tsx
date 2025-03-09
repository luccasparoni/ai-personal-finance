import React from 'react';
import { getCategoryIcon } from '../utils/icons';
import { formatCurrency } from '../utils/format';

interface CategorySummaryProps {
  categoryTotals: Record<string, number>;
}

export function CategorySummary({ categoryTotals }: CategorySummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Summary</h2>
      <div className="space-y-3">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 p-1.5 rounded-full">
                {getCategoryIcon(category)}
              </div>
              <span className="text-sm text-gray-600">{category}</span>
            </div>
            <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}