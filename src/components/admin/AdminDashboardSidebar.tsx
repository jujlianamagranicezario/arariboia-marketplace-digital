
import { 
  Users, 
  ShoppingBag, 
  Tag, 
  Package, 
  CreditCard, 
  Bell, 
  Phone, 
  BarChart, 
  Settings,
  PanelsTopLeft,
  ImageIcon
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

const AdminDashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar>
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/admin" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-md bg-arariboia-brown flex items-center justify-center text-white">A</div>
          <span className="text-arariboia-brown">Admin</span>
        </Link>
        <SidebarTrigger className="ml-auto md:hidden" />
      </div>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin') && !isActive('/admin/') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin">
                <PanelsTopLeft className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/lojistas') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/lojistas">
                <Users className="w-5 h-5" />
                <span>Lojistas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/banners') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/banners">
                <ImageIcon className="w-5 h-5" />
                <span>Banners</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/pedidos') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/pedidos">
                <ShoppingBag className="w-5 h-5" />
                <span>Pedidos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/cupons') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/cupons">
                <Tag className="w-5 h-5" />
                <span>Cupons</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/produtos') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/produtos">
                <Package className="w-5 h-5" />
                <span>Produtos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/pagamentos') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/pagamentos">
                <CreditCard className="w-5 h-5" />
                <span>Pagamentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/notificacoes') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/notificacoes">
                <Bell className="w-5 h-5" />
                <span>Notificações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/whatsapp') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/whatsapp">
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/relatorios') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/relatorios">
                <BarChart className="w-5 h-5" />
                <span>Relatórios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/admin/controles') ? 'bg-arariboia-brown/10' : ''}>
              <Link to="/admin/controles">
                <Settings className="w-5 h-5" />
                <span>Controles Master</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminDashboardSidebar;
