import React, { useState } from 'react';
import { ArrowDown, ArrowUp, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../utils/format';

interface MonthComparisonProps {
  currentMonth: {
    total: number;
    categories: Record<string, number>;
  };
  previousMonth: {
    total: number;
    categories: Record<string, number>;
  };
  alwaysExpanded?: boolean;
}

export function MonthComparison({ currentMonth, previousMonth, alwaysExpanded = false }: MonthComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(alwaysExpanded);
  
  const totalDiff = currentMonth.total - previousMonth.total;
  const percentChange = ((totalDiff / previousMonth.total) * 100).toFixed(1);
  const isHigherSpending = totalDiff > 0;

  // Get all unique categories from both months
  const allCategories = new Set([
    ...Object.keys(currentMonth.categories),
    ...Object.keys(previousMonth.categories)
  ]);

  // Format percentage change
  const formatPercentChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 'New' : '0%';
    const change = ((curr - prev) / prev) * 100;
    return `${Math.abs(change).toFixed(1)}%`;
  };
  
  const toggleExpand = () => {
    if (!alwaysExpanded) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 ${isHigherSpending ? 'bg-red-50' : 'bg-green-50'}`}>
        <h2 className="text-sm font-semibold text-gray-800">Month over Month</h2>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${
            isHigherSpending ? 'text-red-500' : 'text-green-500'
          }`}>
            {isHigherSpending ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold">{formatPercentChange(currentMonth.total, previousMonth.total)}</span>
          </div>
          <span className="text-xs">vs. last month</span>
        </div>
      </div>
      
      {/* Total summary */}
      <div 
        className={`px-4 py-2 border-b border-gray-100 flex justify-between items-center ${!alwaysExpanded ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={toggleExpand}
      >
        <div>
          <span className="text-xs text-gray-500">Total Spending</span>
          <div className="flex items-baseline space-x-2">
            <span className="font-medium">{formatCurrency(currentMonth.total)}</span>
            <span className="text-xs text-gray-400">{formatCurrency(previousMonth.total)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`px-2 py-1 rounded-full text-xs mr-2 ${
            isHigherSpending ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {isHigherSpending ? `+${totalDiff.toFixed(2)}` : totalDiff.toFixed(2)}
          </div>
          {!alwaysExpanded && (
            isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )
          )}
        </div>
      </div>
      
      {/* Category comparison table - Only shown when expanded or alwaysExpanded is true */}
      {(isExpanded || alwaysExpanded) && (
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-500">Category</th>
                <th className="text-right px-2 py-2 font-medium text-gray-500 hidden sm:table-cell">Previous</th>
                <th className="text-right px-2 py-2 font-medium text-gray-500">Current</th>
                <th className="text-right px-4 py-2 font-medium text-gray-500">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from(allCategories).map(category => {
                const currAmount = currentMonth.categories[category] || 0;
                const prevAmount = previousMonth.categories[category] || 0;
                const diff = currAmount - prevAmount;
                const isHigher = diff > 0;
                
                return (
                  <tr key={category} className={isHigher ? 'bg-red-50' : diff < 0 ? 'bg-green-50' : ''}>
                    <td className="px-4 py-2 font-medium text-gray-700">{category}</td>
                    <td className="text-right px-2 py-2 text-gray-500 hidden sm:table-cell">{formatCurrency(prevAmount)}</td>
                    <td className="text-right px-2 py-2">{formatCurrency(currAmount)}</td>
                    <td className="text-right px-4 py-2">
                      <div className={`flex items-center justify-end space-x-1 ${
                        diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {diff !== 0 && (
                          diff > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                        <span>{formatPercentChange(currAmount, prevAmount)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}