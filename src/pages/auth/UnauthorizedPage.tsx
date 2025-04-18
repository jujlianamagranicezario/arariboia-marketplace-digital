
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md w-full space-y-8">
        <ShieldAlert className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Acesso não autorizado</h1>
        <p className="text-gray-600 mt-2">
          Você não possui permissão para acessar esta página.
        </p>
        <div className="mt-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-arariboia-brown hover:bg-arariboia-brown/90 mr-4"
          >
            Ir para o Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Voltar para a Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
