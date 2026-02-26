import { ModuleCard } from './ModuleCard';
import type { Module } from '@/types';

interface Module3ExpandPanelProps {
  childModules: Module[];
  onModuleClick: (module: Module) => void;
}

export function Module3ExpandPanel({ childModules, onModuleClick }: Module3ExpandPanelProps) {
  if (childModules.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Alt modül yetkiniz bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {childModules.map((childModule) => (
        <ModuleCard
          key={childModule.id}
          module={childModule}
          onClick={() => onModuleClick(childModule)}
          isChild={true}
        />
      ))}
    </div>
  );
}
