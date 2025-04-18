
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
  MapPin 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LojasPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados de exemplo para as lojas
  const lojas = [
    { 
      id: 1, 
      nome: 'Pizzaria Bella Napoli', 
      categoria: 'Restaurante', 
      endereco: 'Rua das Flores, 123', 
      cidade: 'Arariboia', 
      status: 'Ativo' 
    },
    { 
      id: 2, 
      nome: 'Mercado Central', 
      categoria: 'Supermercado', 
      endereco: 'Av. Principal, 500', 
      cidade: 'Arariboia', 
      status: 'Ativo' 
    },
    { 
      id: 3, 
      nome: 'Tech Store', 
      categoria: 'Eletrônicos', 
      endereco: 'Shopping Centro, Loja 42', 
      cidade: 'Arariboia', 
      status: 'Ativo' 
    },
    { 
      id: 4, 
      nome: 'Modas Elegance', 
      categoria: 'Vestuário', 
      endereco: 'Rua das Modas, 78', 
      cidade: 'Arariboia', 
      status: 'Ativo' 
    },
    { 
      id: 5, 
      nome: 'Salão Beleza Total', 
      categoria: 'Serviços', 
      endereco: 'Av. das Palmeiras, 210', 
      cidade: 'Arariboia', 
      status: 'Inativo' 
    },
    { 
      id: 6, 
      nome: 'Farmácia Saúde', 
      categoria: 'Farmácia', 
      endereco: 'Rua dos Remédios, 90', 
      cidade: 'Arariboia', 
      status: 'Ativo' 
    },
  ];

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados das lojas estão sendo exportados para CSV",
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Loja removida",
      description: `A loja #${id} foi removida com sucesso`,
      variant: "destructive",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-arariboia-brown">Lojas</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="default" 
            className="bg-arariboia-brown hover:bg-arariboia-brown/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Loja
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gerenciar Lojas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center w-full md:w-1/2 relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar lojas..." 
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lojas
                  .filter(loja => 
                    loja.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    loja.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    loja.cidade.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((loja) => (
                  <TableRow key={loja.id}>
                    <TableCell>#{loja.id}</TableCell>
                    <TableCell>{loja.nome}</TableCell>
                    <TableCell>{loja.categoria}</TableCell>
                    <TableCell>{loja.endereco}</TableCell>
                    <TableCell>{loja.cidade}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        loja.status === 'Ativo' 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {loja.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => handleDelete(loja.id)}
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

export default LojasPage;
