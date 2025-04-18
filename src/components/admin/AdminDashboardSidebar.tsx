
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  ShoppingBag, 
  Tag, 
  Package, 
  CreditCard, 
  Bell, 
  Phone, 
  BarChart2, 
  Settings
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboardSidebar = () => {
  const { authState } = useAuth();
  const { user } = authState;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
    { icon: Users, label: 'Gestão de Lojistas', path: '/admin/lojistas' },
    { icon: ShoppingBag, label: 'Gestão de Pedidos', path: '/admin/pedidos' },
    { icon: Tag, label: 'Cupons e Promoções', path: '/admin/cupons' },
    { icon: Package, label: 'Gestão de Produtos', path: '/admin/produtos' },
    { icon: CreditCard, label: 'Pagamentos', path: '/admin/pagamentos' },
    { icon: Bell, label: 'Notificações', path: '/admin/notificacoes' },
    { icon: Phone, label: 'Gestão de WhatsApp', path: '/admin/whatsapp' },
    { icon: BarChart2, label: 'Relatórios', path: '/admin/relatorios' },
    { icon: Settings, label: 'Controles Master', path: '/admin/controles' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-arariboia-brown rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </span>
          </div>
          <div>
            <div className="font-bold text-arariboia-brown">
              {user?.name || 'Administrador'}
            </div>
            <div className="text-xs text-gray-500">
              {user?.email || 'admin@exemplo.com'}
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    isActive 
                      ? "text-arariboia-brown bg-arariboia-brown/10" 
                      : "text-gray-700 hover:text-arariboia-brown hover:bg-gray-100"
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminDashboardSidebar;
