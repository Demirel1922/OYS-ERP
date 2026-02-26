import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export function NotFound404() {
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
              <div className="bg-gray-100 rounded-full p-4">
                <FileQuestion className="w-12 h-12 text-gray-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-600">
              404
            </CardTitle>
            <p className="text-xl font-semibold text-gray-900 mt-2">
              Sayfa Bulunamadı
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
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
