
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardSidebar from './DashboardSidebar';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import NotificationCenter from './NotificationCenter';

const DashboardLayout = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
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
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
