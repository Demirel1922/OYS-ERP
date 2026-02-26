import { useState, useEffect } from 'react';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { UserFormDialog } from '@/components/admin/UserFormDialog';
import { useUserStore } from '@/store/userStore';
import type { User } from '@/types';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Power,
  PowerOff,
  Trash2,
  Shield,
} from 'lucide-react';

export function Admin() {
  const { users, loadUsers, addUser, updateUser, toggleUserActive, deleteUser } =
    useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSaveUser = (userData: {
    username: string;
    password: string;
    name: string;
    active: boolean;
    allowedModules: string[];
  }) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser(userData);
    }
  };

  const handleToggleActive = (user: User) => {
    toggleUserActive(user.id);
  };

  const handleDeleteUser = (user: User) => {
    if (user.username === 'admin') {
      alert('Admin kullanıcısı silinemez!');
      return;
    }
    if (confirm(`'${user.name}' kullanıcısını silmek istediğinize emin misiniz?`)) {
      deleteUser(user.id);
    }
  };

  const formatModules = (modules: string[]) => {
    if (modules.includes('all')) {
      return <Badge className="bg-blue-500">Tüm Yetkiler</Badge>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {modules.slice(0, 3).map((mod) => (
          <Badge key={mod} variant="outline" className="text-xs">
            {mod}
          </Badge>
        ))}
        {modules.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{modules.length - 3}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              Yönetim Paneli
            </h2>
            <p className="text-gray-600 mt-1">
              Kullanıcı yönetimi ve yetkilendirme
            </p>
          </div>
          <Button onClick={handleAddUser} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kullanıcı
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Yetkiler</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Kullanıcı bulunamadı.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {user.active ? (
                        <Badge className="bg-green-500">Aktif</Badge>
                      ) : (
                        <Badge variant="secondary">Pasif</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatModules(user.allowedModules)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(user)}>
                            {user.active ? (
                              <>
                                <PowerOff className="w-4 h-4 mr-2" />
                                Pasif Yap
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4 mr-2" />
                                Aktif Yap
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600"
                            disabled={user.username === 'admin'}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* User Count */}
        <div className="mt-4 text-sm text-gray-500">
          Toplam {filteredUsers.length} kullanıcı
          {searchTerm && ` (arama sonucu)`}
        </div>
      </main>

      {/* User Form Dialog */}
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
