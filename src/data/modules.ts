import type { Module } from '@/types';

export const MODULES: Module[] = [
  {
    id: '1',
    title: 'Bilgiler ve Tanımlar',
    description: 'Temel veri tanımları ve bilgi yönetimi',
    route: '/module/1',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '2',
    title: 'Numune Yönetimi',
    description: 'Numune takibi ve yönetimi',
    route: '/module/2',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '3',
    title: 'Hammadde / Malzeme Depo',
    description: 'Hammadde ve malzeme depo yönetimi',
    route: '/module/3',
    parent: null,
    hasChildren: true,
    adminOnly: false,
  },
  {
    id: '3a',
    title: 'İplik Depo',
    description: 'İplik stok ve depo yönetimi',
    route: '/module/3a',
    parent: '3',
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '3b',
    title: 'Aksesuar Depo',
    description: 'Aksesuar stok ve depo yönetimi',
    route: '/module/3b',
    parent: '3',
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '4',
    title: 'Sipariş–Satış–Sevkiyat',
    description: 'Sipariş, satış ve sevkiyat yönetimi',
    route: '/module/4',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '5',
    title: 'Satın Alma',
    description: 'Satın alma süreçleri yönetimi',
    route: '/module/5',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '6',
    title: 'Planlama',
    description: 'Üretim planlama yönetimi',
    route: '/module/6',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '7',
    title: 'Üretim',
    description: 'Üretim süreçleri yönetimi',
    route: '/module/7',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '8',
    title: 'Ara/Bekleme Deposu',
    description: 'Ara bekleme depo yönetimi',
    route: '/module/8',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '9',
    title: 'Yarı Mamul Depo',
    description: 'Yarı mamul depo yönetimi',
    route: '/module/9',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '10',
    title: 'Ütü & Paket',
    description: 'Ütü ve paketleme yönetimi',
    route: '/module/10',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '11',
    title: 'Kalite Kontrol',
    description: 'Kalite kontrol süreçleri',
    route: '/module/11',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '12',
    title: 'Mamul Depo',
    description: 'Mamul depo yönetimi',
    route: '/module/12',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '13',
    title: 'Sertifikalar',
    description: 'Sertifika yönetimi',
    route: '/module/13',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '14',
    title: 'Bakım Onarım',
    description: 'Bakım ve onarım yönetimi',
    route: '/module/14',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '15',
    title: 'Raporlar',
    description: 'Raporlama ve analiz',
    route: '/module/15',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '16',
    title: 'Yönetim Paneli',
    description: 'Sistem yönetimi ve kullanıcı yönetimi',
    route: '/admin',
    parent: null,
    hasChildren: false,
    adminOnly: true,
  },
];

// Get all parent modules (excluding children like 3a, 3b)
export function getParentModules(): Module[] {
  return MODULES.filter((m) => m.parent === null);
}

// Get child modules of a parent
export function getChildModules(parentId: string): Module[] {
  return MODULES.filter((m) => m.parent === parentId);
}

// Get module by id
export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

// Get all module IDs for permission selector
export function getAllModuleIds(): string[] {
  return MODULES.map((m) => m.id);
}

// Check if module is a child module
export function isChildModule(id: string): boolean {
  const module = getModuleById(id);
  return module ? module.parent !== null : false;
}

// Get module title by id
export function getModuleTitle(id: string): string {
  const module = getModuleById(id);
  return module ? module.title : id;
}
