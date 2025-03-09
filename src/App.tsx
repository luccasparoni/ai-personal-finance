import React, { useState } from 'react';
import { DollarSign, Wallet, TrendingUp, CreditCard, BarChart } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from 'chart.js';

import { Header } from './components/Header';
import { ChartSection } from './components/ChartSection';
import { TransactionList } from './components/TransactionList';
import { MonthComparison } from './components/MonthComparison';
import { AllExpenses } from './components/AllExpenses';
import { MonthlyExpenses } from './components/MonthlyExpenses';
import { LLMInput } from './components/LLMInput';
import { formatCurrency } from './utils/format';
import { Transaction } from './types';
import { StatisticsView } from './components/StatisticsView';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

// Mock data - in a real app this would come from a database
const mockTransactions: Transaction[] = [
  { id: 1, description: 'Grocery Shopping', amount: 156.32, category: 'Shopping', date: '2024-03-15' },
  { id: 2, description: 'Coffee Shop', amount: 4.50, category: 'Food', date: '2024-03-14' },
  { id: 3, description: 'Gas Station', amount: 45.00, category: 'Transport', date: '2024-03-13' },
  { id: 4, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2024-03-01' },
  { id: 5, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2024-03-02' },
  { id: 6, description: 'Uber Ride', amount: 25.00, category: 'Transport', date: '2024-03-15' },
  { id: 7, description: 'Online Course', amount: 199.99, category: 'Education', date: '2024-03-10' },
  { id: 8, description: 'Restaurant', amount: 85.00, category: 'Food', date: '2024-03-08' },
  { id: 9, description: 'Movie Tickets', amount: 30.00, category: 'Others', date: '2024-03-05' },
];

const previousMonthTransactions: Transaction[] = [
  { id: 101, description: 'Grocery Shopping', amount: 142.50, category: 'Shopping', date: '2024-02-15' },
  { id: 102, description: 'Coffee Shop', amount: 6.50, category: 'Food', date: '2024-02-14' },
  { id: 103, description: 'Gas Station', amount: 40.00, category: 'Transport', date: '2024-02-13' },
  { id: 104, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2024-02-01' },
  { id: 105, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2024-02-02' },
  { id: 106, description: 'Taxi', amount: 32.50, category: 'Transport', date: '2024-02-20' },
  { id: 107, description: 'Lunch', amount: 15.75, category: 'Food', date: '2024-02-18' },
  { id: 108, description: 'Gym Membership', amount: 50.00, category: 'Others', date: '2024-02-05' },
  { id: 109, description: 'Books', amount: 45.85, category: 'Education', date: '2024-02-10' },
  { id: 110, description: 'Electronics', amount: 120.00, category: 'Shopping', date: '2024-02-25' },
  { id: 111, description: 'Dinner Out', amount: 68.20, category: 'Food', date: '2024-02-28' },
];

// Historical monthly data for full year (for Statistics view)
const historicalMonthlyData = [
  {
    month: 'January 2024',
    transactions: [
      { id: 201, description: 'Grocery Shopping', amount: 138.45, category: 'Shopping', date: '2024-01-10' },
      { id: 202, description: 'Coffee Shop', amount: 5.25, category: 'Food', date: '2024-01-14' },
      { id: 203, description: 'Gas Station', amount: 42.30, category: 'Transport', date: '2024-01-05' },
      { id: 204, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2024-01-01' },
      { id: 205, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2024-01-02' },
      { id: 206, description: 'Online Course', amount: 50.00, category: 'Education', date: '2024-01-15' },
      { id: 207, description: 'Movies', amount: 25.00, category: 'Others', date: '2024-01-22' },
    ]
  },
  {
    month: 'December 2023',
    transactions: [
      { id: 301, description: 'Holiday Shopping', amount: 250.45, category: 'Shopping', date: '2023-12-15' },
      { id: 302, description: 'Coffee Shop', amount: 15.25, category: 'Food', date: '2023-12-10' },
      { id: 303, description: 'Gas Station', amount: 38.90, category: 'Transport', date: '2023-12-05' },
      { id: 304, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2023-12-01' },
      { id: 305, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2023-12-02' },
      { id: 306, description: 'Holiday Dinner', amount: 125.00, category: 'Food', date: '2023-12-24' },
      { id: 307, description: 'Gifts', amount: 350.00, category: 'Others', date: '2023-12-20' },
    ]
  },
  {
    month: 'November 2023',
    transactions: [
      { id: 401, description: 'Grocery Shopping', amount: 180.15, category: 'Shopping', date: '2023-11-12' },
      { id: 402, description: 'Coffee Shop', amount: 12.40, category: 'Food', date: '2023-11-08' },
      { id: 403, description: 'Gas Station', amount: 51.20, category: 'Transport', date: '2023-11-15' },
      { id: 404, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2023-11-01' },
      { id: 405, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2023-11-02' },
      { id: 406, description: 'Online Learning', amount: 100.00, category: 'Education', date: '2023-11-10' },
      { id: 407, description: 'Entertainment', amount: 45.00, category: 'Others', date: '2023-11-25' },
    ]
  },
  {
    month: 'October 2023',
    transactions: [
      { id: 501, description: 'Grocery Shopping', amount: 162.30, category: 'Shopping', date: '2023-10-08' },
      { id: 502, description: 'Coffee Shop', amount: 10.50, category: 'Food', date: '2023-10-12' },
      { id: 503, description: 'Gas Station', amount: 45.75, category: 'Transport', date: '2023-10-18' },
      { id: 504, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2023-10-01' },
      { id: 505, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2023-10-02' },
      { id: 506, description: 'Books', amount: 85.00, category: 'Education', date: '2023-10-15' },
      { id: 507, description: 'Halloween Supplies', amount: 65.00, category: 'Others', date: '2023-10-28' },
    ]
  },
  {
    month: 'September 2023',
    transactions: [
      { id: 601, description: 'Grocery Shopping', amount: 155.80, category: 'Shopping', date: '2023-09-10' },
      { id: 602, description: 'Coffee Shop', amount: 8.75, category: 'Food', date: '2023-09-15' },
      { id: 603, description: 'Gas Station', amount: 48.50, category: 'Transport', date: '2023-09-20' },
      { id: 604, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2023-09-01' },
      { id: 605, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2023-09-02' },
      { id: 606, description: 'School Supplies', amount: 120.00, category: 'Education', date: '2023-09-05' },
      { id: 607, description: 'Movie Night', amount: 35.00, category: 'Others', date: '2023-09-25' },
    ]
  },
  {
    month: 'August 2023',
    transactions: [
      { id: 701, description: 'Grocery Shopping', amount: 148.95, category: 'Shopping', date: '2023-08-12' },
      { id: 702, description: 'Coffee Shop', amount: 9.25, category: 'Food', date: '2023-08-18' },
      { id: 703, description: 'Gas Station', amount: 55.10, category: 'Transport', date: '2023-08-25' },
      { id: 704, description: 'Rent', amount: 1200.00, category: 'Housing', date: '2023-08-01' },
      { id: 705, description: 'Internet Bill', amount: 65.00, category: 'Utilities', date: '2023-08-02' },
      { id: 706, description: 'Summer Course', amount: 150.00, category: 'Education', date: '2023-08-05' },
      { id: 707, description: 'Beach Trip', amount: 95.00, category: 'Others', date: '2023-08-15' },
    ]
  }
];

// Create data for historical category averages (past 3 months)
const pastMonthsTransactions = [
  // January
  [
    { amount: 135.25, category: 'Shopping' },
    { amount: 8.75, category: 'Food' },
    { amount: 42.30, category: 'Transport' },
    { amount: 1200.00, category: 'Housing' },
    { amount: 65.00, category: 'Utilities' },
    { amount: 50.00, category: 'Education' },
    { amount: 25.00, category: 'Others' },
  ],
  // December
  [
    { amount: 250.45, category: 'Shopping' },
    { amount: 15.25, category: 'Food' },
    { amount: 38.90, category: 'Transport' },
    { amount: 1200.00, category: 'Housing' },
    { amount: 65.00, category: 'Utilities' },
    { amount: 0.00, category: 'Education' },
    { amount: 75.00, category: 'Others' },
  ],
  // November
  [
    { amount: 180.15, category: 'Shopping' },
    { amount: 12.40, category: 'Food' },
    { amount: 51.20, category: 'Transport' },
    { amount: 1200.00, category: 'Housing' },
    { amount: 65.00, category: 'Utilities' },
    { amount: 100.00, category: 'Education' },
    { amount: 45.00, category: 'Others' },
  ]
];

// Calculate category averages
const categoryAverages = {} as Record<string, number>;
const categories = ['Shopping', 'Food', 'Transport', 'Housing', 'Utilities', 'Education', 'Others'];

categories.forEach(category => {
  const values = pastMonthsTransactions.map(month => {
    const found = month.find(item => item.category === category);
    return found ? found.amount : 0;
  });
  
  categoryAverages[category] = values.reduce((sum, val) => sum + val, 0) / values.length;
});

// Calculate daily totals for previous month
const prevMonthDailyTotals = previousMonthTransactions.reduce((acc, curr) => {
  acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
  return acc;
}, {} as Record<string, number>);

const monthlyBudget = 3000;

function App() {
  const [selectedMonth, setSelectedMonth] = useState('March 2024');
  const [view, setView] = useState<'dashboard' | 'all' | 'monthly' | 'statistics'>('dashboard');
  const [transactions, setTransactions] = useState(mockTransactions);
  
  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = monthlyBudget - totalSpent;
  const budgetPercentage = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));
  
  // Calculate category totals for current month
  const categoryTotals = transactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate category totals for previous month
  const previousCategoryTotals = previousMonthTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate daily totals for current month
  const currentMonthDailyTotals = transactions.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for donut chart with vibrant colors
  const donutChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#9966FF', // Purple
        '#FF9F40', // Orange
        '#059669', // Emerald
      ],
      borderWidth: 0,
      cutout: '70%'
    }],
  };

  // Prepare data for historical average donut chart
  const historicalDonutData = {
    labels: Object.keys(categoryAverages),
    datasets: [{
      data: Object.values(categoryAverages),
      backgroundColor: [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#9966FF', // Purple
        '#FF9F40', // Orange
        '#059669', // Emerald
      ],
      borderWidth: 0,
      cutout: '70%'
    }],
  };

  // Prepare data for current month bar chart
  const currentMonthBarData = {
    labels: Object.keys(currentMonthDailyTotals),
    datasets: [{
      label: 'Current Month Daily Spending',
      data: Object.values(currentMonthDailyTotals),
      backgroundColor: '#36A2EB',
    }],
  };
  
  // Prepare data for previous month bar chart
  const previousMonthBarData = {
    labels: Object.keys(prevMonthDailyTotals),
    datasets: [{
      label: 'Previous Month Daily Spending',
      data: Object.values(prevMonthDailyTotals),
      backgroundColor: '#FF9F40',
    }],
  };

  const previousMonthTotal = previousMonthTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const handleLLMInput = (input: string) => {
    console.log('Processing LLM input:', input);
    // Here you would typically send this to your LLM service
  };
  
  const handleAddTransaction = (transaction: {
    description: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date
    };
    
    setTransactions([...transactions, newTransaction]);
  };
  
  const handleViewChange = (newView: 'dashboard' | 'all' | 'monthly' | 'statistics') => {
    setView(newView);
  };

  if (view === 'statistics') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          selectedMonth={selectedMonth} 
          onMonthSelect={setSelectedMonth}
          currentView={view}
          onViewChange={handleViewChange}
        />
        
        <div className="max-w-screen-lg mx-auto px-4 py-3">
          <div className="mb-4">
            <LLMInput 
              onSubmit={handleLLMInput} 
              onAddTransaction={handleAddTransaction}
            />
          </div>
          
          <StatisticsView
            historicalData={historicalMonthlyData}
            categories={categories}
          />
        </div>
      </div>
    );
  }

  if (view === 'monthly') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          selectedMonth={selectedMonth} 
          onMonthSelect={setSelectedMonth}
          currentView={view}
          onViewChange={handleViewChange}
        />
        
        <div className="max-w-screen-lg mx-auto px-4 py-3">
          <div className="mb-4">
            <LLMInput 
              onSubmit={handleLLMInput} 
              onAddTransaction={handleAddTransaction}
            />
          </div>
          
          <MonthlyExpenses 
            transactions={[...transactions, ...previousMonthTransactions]}
            monthlyBudget={monthlyBudget}
          />
        </div>
      </div>
    );
  }

  if (view === 'all') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          selectedMonth={selectedMonth} 
          onMonthSelect={setSelectedMonth}
          currentView={view}
          onViewChange={handleViewChange}
        />
        
        <div className="max-w-screen-lg mx-auto px-4 py-3">
          <div className="mb-4">
            <LLMInput 
              onSubmit={handleLLMInput} 
              onAddTransaction={handleAddTransaction}
            />
          </div>
          
          <AllExpenses 
            transactions={[...transactions, ...previousMonthTransactions]} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        selectedMonth={selectedMonth} 
        onMonthSelect={setSelectedMonth}
        currentView={view}
        onViewChange={handleViewChange}
      />

      <main className="container mx-auto px-4 py-3">
        <div className="max-w-screen-lg mx-auto mb-4">
          <LLMInput 
            onSubmit={handleLLMInput} 
            onAddTransaction={handleAddTransaction}
          />
        </div>

        <div className="max-w-screen-lg mx-auto">
          {/* Summary Cards - 2/3 width on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Total Spent</p>
                <p className="text-sm font-bold text-gray-800">{formatCurrency(totalSpent)}</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-1 bg-emerald-500 rounded-full" 
                    style={{ width: `${budgetPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{budgetPercentage}% of budget</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Wallet className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Remaining</p>
                <p className="text-sm font-bold text-gray-800">{formatCurrency(remainingBudget)}</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-1 bg-blue-500 rounded-full" 
                    style={{ width: `${100 - budgetPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{100 - budgetPercentage}% remaining</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Budget</p>
                <p className="text-sm font-bold text-gray-800">{formatCurrency(monthlyBudget)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedMonth}
                </p>
              </div>
            </div>
          </div>

          {/* Charts and Comparison Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Charts Section - 8/12 width */}
            <div className="lg:col-span-8">
              <ChartSection
                donutChartData={donutChartData}
                historicalDonutData={historicalDonutData}
                currentMonthBarData={currentMonthBarData}
                previousMonthBarData={previousMonthBarData}
              />
            </div>
            
            {/* Month Comparison - 4/12 width */}
            <div className="lg:col-span-4">
              <MonthComparison
                currentMonth={{
                  total: totalSpent,
                  categories: categoryTotals,
                }}
                previousMonth={{
                  total: previousMonthTotal,
                  categories: previousCategoryTotals,
                }}
                alwaysExpanded={true}
              />
            </div>
          </div>

          {/* Transactions */}
          <div className="mb-4">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;