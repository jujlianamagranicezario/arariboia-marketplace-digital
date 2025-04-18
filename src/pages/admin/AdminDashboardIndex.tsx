
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, Store, CreditCard } from 'lucide-react';

const AdminDashboardIndex = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Visão Geral do Sistema</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lojistas</CardTitle>
            <Users className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">5 aguardando aprovação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">24 hoje</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lojas</CardTitle>
            <Store className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">3 novas esta semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <CreditCard className="h-4 w-4 text-arariboia-brown" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.420</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #12345</p>
                  <p className="text-sm text-muted-foreground">Restaurante Sabor do Mar</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 75,90</p>
                  <p className="text-sm text-muted-foreground">Hoje, 14:30</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #12344</p>
                  <p className="text-sm text-muted-foreground">Padaria Delícia</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 32,50</p>
                  <p className="text-sm text-muted-foreground">Hoje, 12:45</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #12343</p>
                  <p className="text-sm text-muted-foreground">Mercado Central</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 127,80</p>
                  <p className="text-sm text-muted-foreground">Hoje, 10:15</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lojistas Aguardando Aprovação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Restaurante Novo Sabor</p>
                  <p className="text-sm text-muted-foreground">Categoria: Restaurante</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Aprovar</button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Recusar</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Loja de Roupas Fashion</p>
                  <p className="text-sm text-muted-foreground">Categoria: Vestuário</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Aprovar</button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Recusar</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Farmácia Bem Estar</p>
                  <p className="text-sm text-muted-foreground">Categoria: Saúde</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Aprovar</button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Recusar</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardIndex;
