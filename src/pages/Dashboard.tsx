import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/common/Header';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { Module3ExpandPanel } from '@/components/dashboard/Module3ExpandPanel';
import { MODULES, getChildModules } from '@/data/modules';
import type { Module } from '@/types';

export function Dashboard() {
  const { user, allowedModules, isAdmin } = useAuthStore();
  const [expandedModule3, setExpandedModule3] = useState(false);

  // Determine visible modules based on permissions
  const visibleModules = useMemo(() => {
    // Admin sees all parent modules (child modules shown via expand)
    if (isAdmin || allowedModules.includes('all')) {
      return MODULES.filter((m) => m.parent === null);
    }

    const visible: Module[] = [];

    // Check each parent module
    MODULES.filter((m) => m.parent === null).forEach((module) => {
      // For module 3, show it if user has "3" permission
      if (module.id === '3') {
        if (allowedModules.includes('3')) {
          visible.push(module);
        }
      } else {
        // For other modules, show if user has permission
        if (allowedModules.includes(module.id)) {
          visible.push(module);
        }
      }
    });

    // For child modules (3a, 3b), show them as separate cards if user has permission
    // This is the KEY behavior: 3a/3b can be visible independently of "3"
    // But NOT for admin (admin sees them via expand)
    MODULES.filter((m) => m.parent !== null).forEach((childModule) => {
      if (allowedModules.includes(childModule.id)) {
        visible.push(childModule);
      }
    });

    return visible;
  }, [allowedModules, isAdmin]);

  // Get child modules of module 3 that user has access to
  const accessibleChildModules = useMemo(() => {
    const allChildren = getChildModules('3');
    // Admin sees all child modules
    if (isAdmin || allowedModules.includes('all')) {
      return allChildren;
    }
    // Regular users see only allowed child modules
    return allChildren.filter((m) => allowedModules.includes(m.id));
  }, [allowedModules, isAdmin]);

  // Separate parent and child modules for display
  const parentModules = visibleModules.filter((m) => m.parent === null);
  const standaloneChildModules = visibleModules.filter((m) => m.parent !== null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Hoş geldiniz, {user?.fullName}. Erişiminiz olan modüller aşağıda listelenmiştir.
          </p>
        </div>

        {/* Parent Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parentModules.map((module) => (
            <div key={module.id}>
              <ModuleCard module={module} />
              {/* Show expand panel for module 3 if user has access to child modules */}
              {module.id === '3' && accessibleChildModules.length > 0 && (
                <Module3ExpandPanel
                  expanded={expandedModule3}
                  onToggle={() => setExpandedModule3(!expandedModule3)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Standalone Child Modules Section */}
        {standaloneChildModules.length > 0 && !isAdmin && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alt Modüller</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standaloneChildModules.map((module) => (
                <ModuleCard key={module.id} module={module} isChild />
              ))}
            </div>
          </div>
        )}

        {/* No modules message */}
        {visibleModules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Erişiminiz olan modül bulunmamaktadır.</p>
            <p className="text-gray-400 text-sm mt-2">
              Lütfen yöneticinizle iletişime geçin.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
