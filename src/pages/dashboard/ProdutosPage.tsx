
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
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Download, 
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProdutosPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados de exemplo para os produtos
  const produtos = [
    { 
      id: 1, 
      nome: 'Pizza Margherita', 
      categoria: 'Comida', 
      preco: 'R$ 45,90', 
      estoque: 12, 
      status: 'Ativo' 
    },
    { 
      id: 2, 
      nome: 'Refrigerante Cola 2L', 
      categoria: 'Bebidas', 
      preco: 'R$ 9,90', 
      estoque: 30, 
      status: 'Ativo' 
    },
    { 
      id: 3, 
      nome: 'Headphone Bluetooth', 
      categoria: 'Eletrônicos', 
      preco: 'R$ 189,90', 
      estoque: 5, 
      status: 'Ativo' 
    },
    { 
      id: 4, 
      nome: 'Camiseta Estampada', 
      categoria: 'Roupas', 
      preco: 'R$ 59,90', 
      estoque: 15, 
      status: 'Ativo' 
    },
    { 
      id: 5, 
      nome: 'Corte de Cabelo', 
      categoria: 'Serviços', 
      preco: 'R$ 35,00', 
      estoque: 'N/A', 
      status: 'Ativo' 
    },
    { 
      id: 6, 
      nome: 'Mouse Wireless', 
      categoria: 'Eletrônicos', 
      preco: 'R$ 69,90', 
      estoque: 8, 
      status: 'Inativo' 
    },
  ];

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados para CSV",
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Produto removido",
      description: `O produto #${id} foi removido com sucesso`,
      variant: "destructive",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-arariboia-brown">Produtos</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="default" 
            className="bg-arariboia-brown hover:bg-arariboia-brown/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gerenciar Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center w-full md:w-1/2 relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produtos..." 
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
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos
                  .filter(produto => 
                    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>#{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.categoria}</TableCell>
                    <TableCell>{produto.preco}</TableCell>
                    <TableCell>{produto.estoque}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        produto.status === 'Ativo' 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {produto.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => handleDelete(produto.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

export default ProdutosPage;
