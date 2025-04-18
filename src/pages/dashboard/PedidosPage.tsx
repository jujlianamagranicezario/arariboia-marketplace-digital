
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  Printer, 
  MoreHorizontal, 
  Download, 
  Calendar 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PedidosPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados de exemplo para os pedidos
  const pedidos = [
    { 
      id: 'P-10234', 
      cliente: 'João Silva', 
      data: '10/04/2025', 
      valor: 'R$ 145,90', 
      itens: 3, 
      status: 'Entregue' 
    },
    { 
      id: 'P-10235', 
      cliente: 'Maria Souza', 
      data: '11/04/2025', 
      valor: 'R$ 79,80', 
      itens: 2, 
      status: 'Em preparo' 
    },
    { 
      id: 'P-10236', 
      cliente: 'Carlos Oliveira', 
      data: '11/04/2025', 
      valor: 'R$ 225,40', 
      itens: 4, 
      status: 'Pendente' 
    },
    { 
      id: 'P-10237', 
      cliente: 'Ana Costa', 
      data: '12/04/2025', 
      valor: 'R$ 59,90', 
      itens: 1, 
      status: 'Cancelado' 
    },
    { 
      id: 'P-10238', 
      cliente: 'Paulo Mendes', 
      data: '12/04/2025', 
      valor: 'R$ 189,70', 
      itens: 3, 
      status: 'Entregue' 
    },
    { 
      id: 'P-10239', 
      cliente: 'Fernanda Lima', 
      data: '13/04/2025', 
      valor: 'R$ 312,50', 
      itens: 5, 
      status: 'Em preparo' 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue':
        return "bg-green-100 text-green-800";
      case 'Em preparo':
        return "bg-blue-100 text-blue-800";
      case 'Pendente':
        return "bg-yellow-100 text-yellow-800";
      case 'Cancelado':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os pedidos estão sendo exportados para CSV",
    });
  };

  const handleViewOrder = (id: string) => {
    toast({
      title: "Visualizando pedido",
      description: `Detalhes do pedido ${id} estão sendo carregados`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-arariboia-brown">Pedidos</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Filtrar por data
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gerenciar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center w-full md:w-1/2 relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar pedidos..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos
                  .filter(pedido => 
                    pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pedido.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{pedido.id}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell>{pedido.data}</TableCell>
                    <TableCell>{pedido.valor}</TableCell>
                    <TableCell>{pedido.itens}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pedido.status)}`}>
                        {pedido.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewOrder(pedido.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidosPage;
