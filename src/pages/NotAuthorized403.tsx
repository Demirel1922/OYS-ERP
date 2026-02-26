import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export function NotAuthorized403() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto mt-12">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <ShieldAlert className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-red-600">
              403
            </CardTitle>
            <p className="text-xl font-semibold text-gray-900 mt-2">
              Erişim Reddedildi
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Bu sayfaya erişim yetkiniz bulunmamaktadır.
            </p>
            <p className="text-gray-500 text-sm">
              Eğer bu sayfaya erişmeniz gerektiğini düşünüyorsanız,
              lütfen yöneticinizle iletişime geçin.
            </p>
            <Button
              onClick={handleBack}
              className="mt-6 flex items-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard'a Dön
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
