
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const DashboardBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeamento de caminhos para nomes legíveis
  const getReadableName = (path: string) => {
    const pathMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'produtos': 'Produtos',
      'pedidos': 'Pedidos',
      'lojas': 'Lojas',
      'clientes': 'Clientes',
      'configuracoes': 'Configurações'
    };
    return pathMap[path] || path;
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Link to="/dashboard" className="flex items-center hover:text-arariboia-brown">
        <Home size={14} className="mr-1" />
        <span>Home</span>
      </Link>
      
      {pathnames.length > 0 && pathnames[0] === 'dashboard' && (
        <>
          {pathnames.slice(1).map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
            const isLast = index === pathnames.slice(1).length - 1;
            
            return (
              <React.Fragment key={routeTo}>
                <ChevronRight size={14} />
                {isLast ? (
                  <span className="font-medium text-foreground">
                    {getReadableName(name)}
                  </span>
                ) : (
                  <Link 
                    to={routeTo}
                    className="hover:text-arariboia-brown"
                  >
                    {getReadableName(name)}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </nav>
  );
};

export default DashboardBreadcrumb;
