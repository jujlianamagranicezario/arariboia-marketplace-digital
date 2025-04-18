
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MessageCircle, 
  ShoppingBag, 
  Tag, 
  Heart, 
  CreditCard, 
  Award, 
  HelpCircle, 
  User, 
  Shield,
  Wallet,
  Phone
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

const UserDashboardSidebar = () => {
  const { authState } = useAuth();
  const { user } = authState;

  const menuItems = [
    { icon: MessageCircle, label: 'Chat', path: '/user/chat' },
    { icon: ShoppingBag, label: 'Meus Pedidos', path: '/user/pedidos' },
    { icon: Tag, label: 'Meus Cupons', path: '/user/cupons' },
    { icon: Heart, label: 'Favoritos', path: '/user/favoritos' },
    { icon: CreditCard, label: 'Pagamento', path: '/user/pagamento' },
    { icon: Award, label: 'Fidelidade', path: '/user/fidelidade' },
    { icon: HelpCircle, label: 'Ajuda', path: '/user/ajuda' },
    { icon: User, label: 'Meus Dados', path: '/user/meus-dados' },
    { icon: Shield, label: 'Segurança', path: '/user/seguranca' },
    { icon: Wallet, label: 'Cartão Arariboia', path: '/user/cartao' },
    { icon: Phone, label: 'Meu WhatsApp', path: '/user/whatsapp' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-arariboia-green rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <div className="font-bold text-arariboia-brown">
              {user?.name || 'Usuário'}
            </div>
            <div className="text-xs text-gray-500">
              {user?.email || 'usuário@exemplo.com'}
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

export default UserDashboardSidebar;
