import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/common/Header';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { Module3ExpandPanel } from '@/components/dashboard/Module3ExpandPanel';
import { MODULES, getChildModules } from '@/data/modules';
import type { Module } from '@/types';

export function Dashboard() {
  const navigate = useNavigate();
  const { session, isAdmin } = useAuthStore();
  const [expandedModule3, setExpandedModule3] = useState(false);

  // Get user's allowed modules
  const allowedModules = session?.allowedModules || [];

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
    return allChildren.filter((child) => allowedModules.includes(child.id));
  }, [allowedModules, isAdmin]);

  const handleModuleClick = (module: Module) => {
    // If it's module 3 and has children, toggle expand
    if (module.id === '3' && module.hasChildren) {
      setExpandedModule3(!expandedModule3);
      return;
    }

    // Navigate to module route
    navigate(module.route);
  };

  // Separate parent and child modules for display
  const parentModules = visibleModules.filter((m) => m.parent === null);
  const standaloneChildModules = visibleModules.filter((m) => m.parent !== null && m.id !== '3');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Hoş Geldiniz, {session?.name}
          </h2>
          <p className="text-gray-600 mt-1">
            Erişiminiz olan modülleri aşağıdan seçebilirsiniz.
          </p>
        </div>

        {/* Parent Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {parentModules.map((module) => (
            <div key={module.id} className="space-y-4">
              <ModuleCard
                module={module}
                onClick={() => handleModuleClick(module)}
                isExpanded={module.id === '3' ? expandedModule3 : undefined}
                showExpandIcon={module.id === '3' && module.hasChildren}
              />

              {/* Module 3 Expand Panel - Inline */}
              {module.id === '3' && expandedModule3 && (
                <div className="lg:col-span-1">
                  <Module3ExpandPanel
                    childModules={accessibleChildModules}
                    onModuleClick={(childModule) => navigate(childModule.route)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Standalone Child Modules Section (3a, 3b shown separately) - NOT for admin */}
        {!isAdmin && standaloneChildModules.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Depo Modülleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {standaloneChildModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onClick={() => navigate(module.route)}
                  isChild={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {visibleModules.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Erişilebilir Modül Yok
            </h3>
            <p className="text-gray-500 mt-2">
              Henüz size atanmış bir modül bulunmamaktadır.
              <br />
              Lütfen yöneticinizle iletişime geçin.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
