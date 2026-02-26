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
    title: 'Üretim',
    description: 'Üretim süreçleri yönetimi',
    route: '/module/6',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '7',
    title: 'Kalite',
    description: 'Kalite kontrol ve yönetimi',
    route: '/module/7',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '8',
    title: 'Sevkiyat',
    description: 'Sevkiyat ve lojistik yönetimi',
    route: '/module/8',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '9',
    title: 'Raporlar',
    description: 'Raporlama ve analiz',
    route: '/module/9',
    parent: null,
    hasChildren: false,
    adminOnly: false,
  },
  {
    id: '10',
    title: 'Yönetim',
    description: 'Yönetim ve ayarlar',
    route: '/module/10',
    parent: null,
    hasChildren: false,
    adminOnly: true,
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getChildModules(parentId: string): Module[] {
  return MODULES.filter((m) => m.parent === parentId);
}

export function getParentModule(childId: string): Module | undefined {
  const child = MODULES.find((m) => m.id === childId);
  if (child?.parent) {
    return MODULES.find((m) => m.id === child.parent);
  }
  return undefined;
}
