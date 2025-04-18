
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Bell, Sun, Moon } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const AdminDashboardLayout = () => {
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user } = authState;
  
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');

    // Salvar preferência de tema para o usuário logado
    if (user) {
      const { data } = await supabase
        .from('preferences')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        // Atualizar preferência existente
        await supabase
          .from('preferences')
          .update({ theme: newTheme })
          .eq('user_id', user.id);
      } else {
        // Criar nova preferência
        await supabase
          .from('preferences')
          .insert({ user_id: user.id, theme: newTheme });
      }
    }
  };

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
      <div className={`flex min-h-screen w-full bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
        <AdminDashboardSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-arariboia-brown">Dashboard do Administrador</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
