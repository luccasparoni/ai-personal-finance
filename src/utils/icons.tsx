import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Home, 
  DollarSign,
  GraduationCap,
  MoreHorizontal
} from 'lucide-react';

export function getCategoryIcon(category: string) {
  switch (category) {
    case 'Shopping':
      return <ShoppingBag className="w-5 h-5" />;
    case 'Food':
      return <Coffee className="w-5 h-5" />;
    case 'Transport':
      return <Car className="w-5 h-5" />;
    case 'Housing':
      return <Home className="w-5 h-5" />;
    case 'Education':
      return <GraduationCap className="w-5 h-5" />;
    case 'Others':
      return <MoreHorizontal className="w-5 h-5" />;
    default:
      return <DollarSign className="w-5 h-5" />;
  }
}