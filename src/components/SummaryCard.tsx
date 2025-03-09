import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function SummaryCard({ title, value, Icon, iconColor, iconBgColor }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}