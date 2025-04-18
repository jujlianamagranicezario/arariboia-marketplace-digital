
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
}

const NotificationCenter = () => {
  // Exemplos de notificações
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Novo Pedido',
      message: 'Você recebeu um novo pedido (#P-10240)',
      time: '5 minutos atrás',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'Aviso de Estoque',
      message: 'O produto "Headphone Bluetooth" está com estoque baixo (5 unidades)',
      time: '30 minutos atrás',
      read: false,
      type: 'warning',
    },
    {
      id: '3',
      title: 'Cancelamento',
      message: 'Um pedido foi cancelado (#P-10237)',
      time: '2 horas atrás',
      read: true,
      type: 'error',
    },
    {
      id: '4',
      title: 'Nova Loja',
      message: 'Uma nova loja foi cadastrada: "Café Aroma"',
      time: '8 horas atrás',
      read: true,
      type: 'info',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getNotificationStyles = (type: string, read: boolean) => {
    const baseClasses = "px-4 py-3 border-b last:border-0 hover:bg-gray-50 transition-colors";
    
    if (read) return `${baseClasses} opacity-60`;
    
    switch (type) {
      case 'success':
        return `${baseClasses} border-l-4 border-l-green-500`;
      case 'warning':
        return `${baseClasses} border-l-4 border-l-yellow-500`;
      case 'error':
        return `${baseClasses} border-l-4 border-l-red-500`;
      case 'info':
        return `${baseClasses} border-l-4 border-l-blue-500`;
      default:
        return baseClasses;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-arariboia-brown text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">Notificações</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={getNotificationStyles(notification.type, notification.read)}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-sm">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          )}
        </div>
        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
