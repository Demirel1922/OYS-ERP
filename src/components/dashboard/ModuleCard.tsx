import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Module } from '@/types';
import { 
  Package, 
  ClipboardList, 
  Warehouse, 
  ShoppingCart, 
  Truck, 
  Factory,
  CheckCircle,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '1': FileText,
  '2': ClipboardList,
  '3': Warehouse,
  '3a': Package,
  '3b': Package,
  '4': ShoppingCart,
  '5': Truck,
  '6': Factory,
  '7': CheckCircle,
  '8': Truck,
  '9': BarChart3,
  '10': Settings,
};

interface ModuleCardProps {
  module: Module;
  isChild?: boolean;
}

export function ModuleCard({ module, isChild = false }: ModuleCardProps) {
  const navigate = useNavigate();
  const Icon = iconMap[module.id] || Package;

  const handleClick = () => {
    if (!module.hasChildren) {
      navigate(module.route);
    }
  };

  return (
    <Card
      className={`
        cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        ${isChild ? 'border-l-4 border-l-blue-500' : ''}
      `}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg bg-blue-50 ${isChild ? 'bg-blue-100' : ''}`}>
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          {module.adminOnly && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              Admin
            </span>
          )}
        </div>
        <CardTitle className={`mt-3 ${isChild ? 'text-base' : 'text-lg'}`}>
          {module.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{module.description}</p>
        <div className="mt-3 text-xs text-gray-400">
          Modül ID: {module.id}
        </div>
      </CardContent>
    </Card>
  );
}
