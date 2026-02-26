import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ModulePermissionSelector } from './ModulePermissionSelector';
import type { User } from '@/types';

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSave: (userData: {
    username: string;
    password: string;
    name: string;
    active: boolean;
    allowedModules: string[];
  }) => void;
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSave,
}: UserFormDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [active, setActive] = useState(true);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!user;

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPassword(''); // Don't show password when editing
      setName(user.name);
      setActive(user.active);
      setAllowedModules(user.allowedModules);
    } else {
      // Reset form for new user
      setUsername('');
      setPassword('');
      setName('');
      setActive(true);
      setAllowedModules([]);
    }
    setErrors({});
  }, [user, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Kullanıcı adı gereklidir';
    }

    if (!isEditing && !password.trim()) {
      newErrors.password = 'Şifre gereklidir';
    }

    if (!name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir';
    }

    if (allowedModules.length === 0) {
      newErrors.modules = 'En az bir modül yetkisi seçmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      username: username.trim(),
      password: password.trim() || (user ? user.password : ''),
      name: name.trim(),
      active,
      allowedModules,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Kullanıcı bilgilerini güncelleyin.'
              : 'Yeni bir kullanıcı oluşturun.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adı girin"
              disabled={isEditing} // Cannot change username when editing
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Şifre {isEditing && '(Boş bırakırsanız değişmez)'}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEditing ? 'Yeni şifre (isteğe bağlı)' : 'Şifre girin'}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ad ve soyad girin"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={active}
              onCheckedChange={(checked) => setActive(checked as boolean)}
            />
            <Label htmlFor="active" className="cursor-pointer">
              Aktif Kullanıcı
            </Label>
          </div>

          {/* Module Permissions */}
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-base font-medium">Modül Yetkileri</Label>
            <ModulePermissionSelector
              selectedModules={allowedModules}
              onChange={setAllowedModules}
            />
            {errors.modules && (
              <p className="text-sm text-red-500">{errors.modules}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
