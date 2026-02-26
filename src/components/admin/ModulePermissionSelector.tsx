import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MODULES } from '@/data/modules';

interface ModulePermissionSelectorProps {
  selectedModules: string[];
  onChange: (modules: string[]) => void;
}

export function ModulePermissionSelector({
  selectedModules,
  onChange,
}: ModulePermissionSelectorProps) {
  const handleToggle = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      onChange(selectedModules.filter((id) => id !== moduleId));
    } else {
      onChange([...selectedModules, moduleId]);
    }
  };

  const handleToggleAll = () => {
    if (selectedModules.includes('all')) {
      onChange([]);
    } else {
      onChange(['all']);
    }
  };

  // Separate parent and child modules
  const parentModules = MODULES.filter((m) => m.parent === null);
  const childModules = MODULES.filter((m) => m.parent !== null);

  return (
    <div className="space-y-4">
      {/* Admin (All) Option */}
      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <Checkbox
          id="module-all"
          checked={selectedModules.includes('all')}
          onCheckedChange={handleToggleAll}
        />
        <Label htmlFor="module-all" className="font-medium text-blue-900 cursor-pointer">
          Tüm Yetkiler (Admin)
        </Label>
      </div>

      {!selectedModules.includes('all') && (
        <>
          {/* Parent Modules */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Ana Modüller</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {parentModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50"
                >
                  <Checkbox
                    id={`module-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={() => handleToggle(module.id)}
                  />
                  <Label
                    htmlFor={`module-${module.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {module.title}
                    <span className="text-xs text-gray-400 ml-1">({module.id})</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Child Modules */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Alt Modüller</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {childModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 border-l-4 border-l-blue-300"
                >
                  <Checkbox
                    id={`module-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={() => handleToggle(module.id)}
                  />
                  <Label
                    htmlFor={`module-${module.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {module.title}
                    <span className="text-xs text-gray-400 ml-1">({module.id})</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
