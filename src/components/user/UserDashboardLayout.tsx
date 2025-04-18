
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  LogOut,
  Wallet,
  Phone
} from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import UserDashboardSidebar from './UserDashboardSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const UserDashboardLayout = () => {
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
    toast({
      title: 'Logout realizado',
      description: 'Você saiu da sua conta com sucesso.',
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <UserDashboardSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-arariboia-brown">Dashboard do Cliente</h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboardLayout;
