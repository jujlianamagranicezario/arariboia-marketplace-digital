
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sun, Moon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardSidebar from './DashboardSidebar';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const DashboardLayout = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const { user } = authState;

  // Carregar preferência de tema do usuário se estiver disponível
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user) {
        const { data } = await supabase
          .from('preferences')
          .select('theme')
          .eq('user_id', user.id)
          .single();
        
        if (data && data.theme) {
          setTheme(data.theme);
          if (data.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
    };

    loadUserPreferences();
  }, [user]);

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
  };

  return (
    <SidebarProvider>
      <div className={`flex min-h-screen w-full bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <DashboardBreadcrumb />
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <NotificationCenter />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Sair"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
