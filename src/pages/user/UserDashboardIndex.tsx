
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Heart, Tag, Award } from 'lucide-react';

const UserDashboardIndex = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bem-vindo ao seu Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 em andamento, 1 entregue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Produtos salvos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cupons</CardTitle>
            <Tag className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Cupons disponíveis</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pontos de Fidelidade</CardTitle>
            <Award className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">Pontos acumulados</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Atividade Recente</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-4">
                  <div className="font-medium">Pedido #1234 realizado</div>
                  <div className="text-sm text-muted-foreground">Hoje, 14:30</div>
                </div>
                <div className="p-4">
                  <div className="font-medium">Produto adicionado aos favoritos</div>
                  <div className="text-sm text-muted-foreground">Ontem, 10:15</div>
                </div>
                <div className="p-4">
                  <div className="font-medium">Pedido #1230 entregue</div>
                  <div className="text-sm text-muted-foreground">15/04, 19:25</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardIndex;
