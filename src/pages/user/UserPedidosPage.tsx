
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserPedidosPage = () => {
  const pedidos = [
    {
      id: '1234',
      data: '18/04/2023',
      loja: 'Restaurante Sabor do Mar',
      valor: 75.90,
      status: 'Em preparo',
      statusClass: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: '1230',
      data: '15/04/2023',
      loja: 'Mercado Central',
      valor: 127.80,
      status: 'Entregue',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '1225',
      data: '10/04/2023',
      loja: 'Padaria Delícia',
      valor: 32.50,
      status: 'Entregue',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '1220',
      data: '05/04/2023',
      loja: 'Farmácia Bem Estar',
      valor: 45.60,
      status: 'Entregue',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '1215',
      data: '01/04/2023',
      loja: 'Mercado Central',
      valor: 89.30,
      status: 'Entregue',
      statusClass: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Meus Pedidos</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">#{pedido.id}</TableCell>
                  <TableCell>{pedido.data}</TableCell>
                  <TableCell>{pedido.loja}</TableCell>
                  <TableCell>R$ {pedido.valor.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${pedido.statusClass}`}>
                      {pedido.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPedidosPage;
