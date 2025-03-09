import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../utils/format';
import { Transaction } from '../types';

interface MonthData {
  month: string;
  transactions: Transaction[];
}

interface StatisticsViewProps {
  historicalData: MonthData[];
  categories: string[];
}

export function StatisticsView({ historicalData, categories }: StatisticsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Organize data by month and category
  const categoryDataByMonth = historicalData.map(monthData => {
    const categorySums: Record<string, number> = {};
    
    // Initialize all categories to zero for this month
    categories.forEach(cat => {
      categorySums[cat] = 0;
    });
    
    // Sum up the transactions for each category
    monthData.transactions.forEach(transaction => {
      categorySums[transaction.category] = (categorySums[transaction.category] || 0) + transaction.amount;
    });
    
    return {
      month: monthData.month,
      categorySums
    };
  });
  
  // Calculate monthly totals
  const monthlyTotals = categoryDataByMonth.map(data => {
    const total = Object.values(data.categorySums).reduce((sum, val) => sum + val, 0);
    return {
      month: data.month,
      total
    };
  });
  
  // Calculate category means across all months
  const categoryMeans: Record<string, number> = {};
  categories.forEach(category => {
    const values = categoryDataByMonth.map(data => data.categorySums[category] || 0);
    categoryMeans[category] = values.reduce((sum, val) => sum + val, 0) / values.length;
  });
  
  // Prepare data for line chart - spending by category over time
  const monthLabels = categoryDataByMonth.map(data => data.month);
  
  // Colors for each category
  const categoryColors: Record<string, string> = {
    'Shopping': '#FF6384', // Pink
    'Food': '#36A2EB',     // Blue
    'Transport': '#FFCE56', // Yellow
    'Housing': '#4BC0C0',   // Teal
    'Utilities': '#9966FF', // Purple
    'Education': '#FF9F40', // Orange
    'Others': '#059669',    // Emerald
  };
  
  const lineChartData = {
    labels: monthLabels,
    datasets: categories.map(category => ({
      label: category,
      data: categoryDataByMonth.map(data => data.categorySums[category] || 0),
      borderColor: categoryColors[category] || '#000000',
      backgroundColor: (categoryColors[category] || '#000000') + '20', // Add transparency
      borderWidth: 2,
      tension: 0.1,
      fill: selectedCategory === category,
      hidden: selectedCategory !== null && selectedCategory !== category
    }))
  };
  
  // Toggle category selection for the chart
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category); // Select the category
    }
  };

  // Check if a category value is greater than its mean
  const isGreaterThanMean = (category: string, value: number) => {
    return value > (categoryMeans[category] || 0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Spending Statistics</h1>
      
      {/* Monthly Category Summary Table - Now above the chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Category Breakdown</h2>
        <p className="text-sm text-gray-500 mb-4">Click on a category to highlight it in the chart below. Values in red exceed the category mean.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500 sticky left-0 bg-gray-50">Category</th>
                {categoryDataByMonth.map(data => (
                  <th key={data.month} className="px-3 py-2 text-right font-medium text-gray-500">{data.month}</th>
                ))}
                <th className="px-3 py-2 text-right font-medium text-gray-500 bg-gray-100">Mean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map(category => (
                <tr 
                  key={category} 
                  className={`hover:bg-gray-50 ${selectedCategory === category ? 'bg-emerald-50' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <td className="px-3 py-3 font-medium text-gray-700 sticky left-0 bg-white">{category}</td>
                  {categoryDataByMonth.map(data => {
                    const value = data.categorySums[category] || 0;
                    const isHigherThanMean = isGreaterThanMean(category, value);
                    
                    return (
                      <td 
                        key={`${category}-${data.month}`} 
                        className={`px-3 py-3 text-right ${
                          isHigherThanMean ? 'text-red-600 font-medium' : ''
                        }`}
                      >
                        {formatCurrency(value)}
                      </td>
                    );
                  })}
                  <td className="px-3 py-3 text-right font-medium bg-gray-100">
                    {formatCurrency(categoryMeans[category] || 0)}
                  </td>
                </tr>
              ))}
              
              {/* Total Row */}
              <tr className="bg-gray-50 font-medium border-t-2 border-gray-300">
                <td className="px-3 py-3 text-gray-700 sticky left-0 bg-gray-50">Total</td>
                {monthlyTotals.map(data => (
                  <td key={`total-${data.month}`} className="px-3 py-3 text-right">
                    {formatCurrency(data.total)}
                  </td>
                ))}
                <td className="px-3 py-3 text-right bg-gray-100">
                  {formatCurrency(
                    monthlyTotals.reduce((sum, data) => sum + data.total, 0) / monthlyTotals.length
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Line Chart - Category Spending Over Time */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Spending Over Time</h2>
        <div className="h-64 sm:h-80">
          <Line 
            data={lineChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Amount ($)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month'
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    boxHeight: 8
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                    }
                  }
                }
              },
              interaction: {
                mode: 'index',
                intersect: false
              }
            }} 
          />
        </div>
      </div>
      
      {/* Category Distribution Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Category Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryDataByMonth.map((data, idx) => {
            const total = monthlyTotals[idx].total;
            
            return (
              <div key={data.month} className="border rounded-lg p-4">
                <h3 className="text-base font-medium text-gray-700 mb-2">{data.month}</h3>
                <p className="text-sm text-gray-500 mb-3">Total: {formatCurrency(total)}</p>
                
                <div className="space-y-2">
                  {categories.map(category => {
                    const amount = data.categorySums[category] || 0;
                    const percentage = total > 0 ? (amount / total) * 100 : 0;
                    
                    return (
                      <div key={category} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: categoryColors[category] || '#000000' }}
                        ></div>
                        <span className="text-xs font-medium text-gray-700 w-20">{category}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: categoryColors[category] || '#000000'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 w-16 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                        <span className="text-xs text-gray-700 ml-2 w-20 text-right">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 