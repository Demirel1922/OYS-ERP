import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Factory } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Kullanıcı adı ve şifre gereklidir.');
      setLoading(false);
      return;
    }

    const result = login(username, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Factory className="w-6 h-6 mr-2 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">ÇORAP ERP</h1>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Giriş Yap
            </CardTitle>
            <CardDescription className="text-center">
              ERP sistemine erişmek için kullanıcı bilgilerinizi girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            {/* Demo Users Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Demo Kullanıcıları
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><strong>admin</strong> / Admin1234! (Tüm yetkiler)</p>
                <p><strong>planlama</strong> / Test1234! (Sadece Planlama)</p>
                <p><strong>kalite</strong> / Test1234! (Sadece Kalite Kontrol)</p>
                <p><strong>iplikci</strong> / 1234 (Sadece İplik Depo)</p>
                <p><strong>aksesuar</strong> / 1234 (Sadece Aksesuar Depo)</p>
                <p><strong>depomudur</strong> / 1234 (Depo + İplik + Aksesuar)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          ÇORAP ERP - MVP 0
        </div>
      </div>
    </div>
  );
}
