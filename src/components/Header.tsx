import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Calendar, ChevronDown, LayoutDashboard, ListPlus, BarChart3, Menu as MenuIcon, X, BarChart } from 'lucide-react';

interface HeaderProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
  currentView: 'dashboard' | 'all' | 'monthly' | 'statistics';
  onViewChange: (view: 'dashboard' | 'all' | 'monthly' | 'statistics') => void;
}

const months = [
  'March 2024',
  'February 2024',
  'January 2024',
  'December 2023',
  'November 2023',
];

export function Header({ selectedMonth, onMonthSelect, currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleViewSelect = (view: 'dashboard' | 'all' | 'monthly' | 'statistics') => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-green-500 sticky top-0 z-10">
      <div className="container mx-auto px-3">
        <div className="py-2">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/10384/10384161.png" 
                alt="Finance Logo" 
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  SmartSpend
                </h1>
                <p className="text-emerald-100 text-xs hidden sm:block">
                  Personal Finance Dashboard
                </p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Menu as="div" className="relative">
                <Menu.Button className="bg-emerald-700 bg-opacity-30 rounded-lg px-3 py-1.5 flex items-center space-x-1 text-emerald-50 hover:bg-opacity-40 transition-colors text-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{selectedMonth}</span>
                  <ChevronDown className="w-3 h-3" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  {months.map((month) => (
                    <Menu.Item key={month}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-emerald-50 text-emerald-900' : 'text-gray-900'
                          } w-full text-left px-3 py-1.5 text-sm`}
                          onClick={() => onMonthSelect(month)}
                        >
                          {month}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              
              <button 
                onClick={() => handleViewSelect('dashboard')}
                className={`
                  flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs transition-colors
                  ${currentView === 'dashboard' 
                    ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                    : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                `}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => handleViewSelect('all')}
                className={`
                  flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs transition-colors
                  ${currentView === 'all' 
                    ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                    : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                `}
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>All Expenses</span>
              </button>
              
              <button 
                onClick={() => handleViewSelect('monthly')}
                className={`
                  flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs transition-colors
                  ${currentView === 'monthly' 
                    ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                    : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                `}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Monthly</span>
              </button>
              
              <button 
                onClick={() => handleViewSelect('statistics')}
                className={`
                  flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs transition-colors
                  ${currentView === 'statistics' 
                    ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                    : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                `}
              >
                <BarChart className="w-3.5 h-3.5" />
                <span>Statistics</span>
              </button>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <Menu as="div" className="relative">
                <Menu.Button className="bg-emerald-700 bg-opacity-30 rounded-lg px-2 py-1 flex items-center space-x-1 text-emerald-50 hover:bg-opacity-40 transition-colors text-xs">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium truncate max-w-[80px]">{selectedMonth}</span>
                  <ChevronDown className="w-3 h-3" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  {months.map((month) => (
                    <Menu.Item key={month}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-emerald-50 text-emerald-900' : 'text-gray-900'
                          } w-full text-left px-3 py-1.5 text-sm`}
                          onClick={() => onMonthSelect(month)}
                        >
                          {month}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              
              <button
                onClick={toggleMobileMenu}
                className="bg-emerald-700 bg-opacity-30 rounded-lg p-1.5 text-emerald-50 hover:bg-opacity-40 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="pt-2 pb-1 md:hidden">
              <div className="grid grid-cols-2 gap-1">
                <button 
                  onClick={() => handleViewSelect('dashboard')}
                  className={`
                    flex flex-col items-center justify-center rounded-lg py-2 transition-colors
                    ${currentView === 'dashboard' 
                      ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                      : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                  `}
                >
                  <LayoutDashboard className="w-4 h-4 mb-1" />
                  <span className="text-xs">Dashboard</span>
                </button>
                
                <button 
                  onClick={() => handleViewSelect('all')}
                  className={`
                    flex flex-col items-center justify-center rounded-lg py-2 transition-colors
                    ${currentView === 'all' 
                      ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                      : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                  `}
                >
                  <ListPlus className="w-4 h-4 mb-1" />
                  <span className="text-xs">All Expenses</span>
                </button>
                
                <button 
                  onClick={() => handleViewSelect('monthly')}
                  className={`
                    flex flex-col items-center justify-center rounded-lg py-2 transition-colors
                    ${currentView === 'monthly' 
                      ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                      : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                  `}
                >
                  <BarChart3 className="w-4 h-4 mb-1" />
                  <span className="text-xs">Monthly</span>
                </button>
                
                <button 
                  onClick={() => handleViewSelect('statistics')}
                  className={`
                    flex flex-col items-center justify-center rounded-lg py-2 transition-colors
                    ${currentView === 'statistics' 
                      ? 'bg-white text-emerald-700 font-medium shadow-sm' 
                      : 'bg-emerald-700 bg-opacity-30 text-emerald-50 hover:bg-opacity-40'}
                  `}
                >
                  <BarChart className="w-4 h-4 mb-1" />
                  <span className="text-xs">Statistics</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}