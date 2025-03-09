import React, { useState } from 'react';
import { Sparkles, Send, Calendar, DollarSign, HelpCircle } from 'lucide-react';

interface LLMInputProps {
  onSubmit: (input: string) => void;
  onAddTransaction?: (transaction: {
    description: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
}

// Categories for the dropdown
const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Housing',
  'Utilities',
  'Education',
  'Others'
];

export function LLMInput({ onSubmit, onAddTransaction }: LLMInputProps) {
  const [input, setInput] = useState('');
  const [isAIMode, setIsAIMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // Fields for manual transaction entry
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
      onSubmit(input);
      setInput('');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount && category && date) {
      if (onAddTransaction) {
        onAddTransaction({
          description,
          amount: parseFloat(amount),
          category,
          date
        });
      }
      // Reset fields
      setDescription('');
      setAmount('');
      setCategory(categories[0]);
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4">
      <div className="flex flex-wrap justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-0">
          {isAIMode ? 'Smart Transaction Entry' : 'Manual Entry'}
        </h2>
        
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-xs sm:text-sm font-medium text-gray-600">Manual</span>
          <div className="relative">
            <input 
              type="checkbox" 
              checked={isAIMode}
              onChange={() => setIsAIMode(!isAIMode)}
              className="sr-only peer" 
            />
            <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </div>
          <span className="ml-2 text-xs sm:text-sm font-medium text-gray-600">AI</span>
        </label>
      </div>

      {isAIMode ? (
        <form onSubmit={handleAISubmit} className="relative">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Sparkles 
                  className={`w-5 h-5 text-emerald-500 ${isAnimating ? 'animate-ping' : ''}`} 
                />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="gasoline 150 yesterday"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button 
                type="button"
                onClick={toggleHelp}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              className="bg-emerald-500 text-white p-2 sm:px-4 sm:py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          {/* Help tooltip */}
          {showHelp && (
            <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 max-w-md">
              <h3 className="font-semibold text-gray-800 mb-1">How to use AI Input</h3>
              <p className="mb-2">
                Type any natural language description of your transaction, and our AI will understand and add it for you.
              </p>
              <div className="bg-gray-50 p-2 rounded-md mb-2">
                <p className="font-medium text-gray-700">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>"gasoline 150 yesterday"</li>
                  <li>"paid 80 dollars for dinner at Italian restaurant on Tuesday"</li>
                  <li>"monthly rent 1200 for April"</li>
                  <li>"spent 25 on uber to airport this morning"</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                The AI recognizes descriptions, amounts, categories, and dates in various formats.
              </p>
              <button 
                onClick={toggleHelp} 
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Grocery shopping"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-xs font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}