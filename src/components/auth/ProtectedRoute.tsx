
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'lojista' | 'cliente';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { authState } = useAuth();
  const { user, loading } = authState;

  if (loading) {
    // Tela de carregamento durante a verificação de autenticação
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arariboia-brown"></div>
      </div>
    );
  }

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se houver restrição de role e o usuário não tiver a role necessária
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Caso esteja tudo certo, exibe o conteúdo protegido
  return <>{children}</>;
};

export default ProtectedRoute;
