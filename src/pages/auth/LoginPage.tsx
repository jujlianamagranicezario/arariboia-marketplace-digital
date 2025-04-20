
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-arariboia-green mb-2">
            AquiTem<span className="text-arariboia-brown">Arariboia</span>
          </h1>
          <p className="text-gray-600">
            Entre na sua conta para acessar o marketplace
          </p>
        </div>
        <LoginForm />
        
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Ao entrar, você concorda com nossos {' '}
            <Link to="#" className="text-arariboia-green hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link to="#" className="text-arariboia-green hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
