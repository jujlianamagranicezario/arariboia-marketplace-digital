
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Store, 
  Users, 
  Settings,
  LogOut
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

const DashboardSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Produtos', path: '/dashboard/produtos' },
    { icon: FileText, label: 'Pedidos', path: '/dashboard/pedidos' },
    { icon: Store, label: 'Lojas', path: '/dashboard/lojas' },
    { icon: Users, label: 'Clientes', path: '/dashboard/clientes' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/configuracoes' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-arariboia-brown rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="font-bold text-lg text-arariboia-brown">AquiTemArariboia</div>
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
                    isActive ? "text-arariboia-brown bg-arariboia-brown/10" : ""
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
      
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" className="text-red-500 hover:text-red-700">
                <LogOut size={20} />
                <span>Sair</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
