import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

interface ChartSectionProps {
  donutChartData: any;
  historicalDonutData: any;
  currentMonthBarData: any;
  previousMonthBarData: any;
}

export function ChartSection({ 
  donutChartData, 
  historicalDonutData, 
  currentMonthBarData,
  previousMonthBarData
}: ChartSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donut Charts Section - 1/2 width */}
        <div>
          <div className="grid grid-cols-1 gap-4">
            {/* Current Month Donut Chart */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Current Month Spending</h2>
              <div className="h-56 relative flex items-center justify-center">
                <Doughnut 
                  data={donutChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
            
            {/* Historical Donut Chart */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">3-Month Category Average</h2>
              <div className="h-56 relative flex items-center justify-center">
                <Doughnut 
                  data={historicalDonutData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bar Charts Section - 1/2 width */}
        <div>
          <div className="space-y-6">
            {/* Current Month Bar Chart */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Current Month Daily Spending</h2>
              <div className="h-56">
                <Bar 
                  data={currentMonthBarData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              </div>
            </div>
            
            {/* Previous Month Bar Chart */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Previous Month Daily Spending</h2>
              <div className="h-56">
                <Bar 
                  data={previousMonthBarData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}