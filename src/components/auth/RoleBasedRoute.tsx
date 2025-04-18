
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'lojista' | 'cliente')[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles 
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

  // Se o usuário não tiver o papel necessário
  if (!allowedRoles.includes(user.role as any)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Caso esteja tudo certo, exibe o conteúdo protegido
  return <>{children}</>;
};

export default RoleBasedRoute;
