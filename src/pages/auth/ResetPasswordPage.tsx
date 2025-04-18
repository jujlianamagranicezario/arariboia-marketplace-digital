
import React from 'react';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-arariboia-green mb-2">
            AquiTem<span className="text-arariboia-brown">Arariboia</span>
          </h1>
          <p className="text-gray-600">
            Recupere o acesso à sua conta
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
