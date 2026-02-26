import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Module } from '@/types';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
  isExpanded?: boolean;
  showExpandIcon?: boolean;
  isChild?: boolean;
}

export function ModuleCard({
  module,
  onClick,
  isExpanded = false,
  showExpandIcon = false,
  isChild = false,
}: ModuleCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`
        cursor-pointer transition-all duration-200 hover:shadow-md
        ${isChild ? 'border-l-4 border-l-blue-500' : ''}
        hover:border-blue-400
      `}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className={`${isChild ? 'text-base' : 'text-lg'} font-semibold`}>
            {module.title}
          </CardTitle>
          {showExpandIcon && (
            <div className="text-gray-400">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {module.description}
        </CardDescription>
        {isChild && (
          <div className="mt-2 text-xs text-blue-600 font-medium">
            Alt Modül
          </div>
        )}
      </CardContent>
    </Card>
  );
}
