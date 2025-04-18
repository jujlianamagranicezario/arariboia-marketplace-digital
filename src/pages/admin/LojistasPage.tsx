
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle, Edit } from 'lucide-react';

const LojistasPage = () => {
  const [lojistas, setLojistas] = useState([
    {
      id: '1',
      nome: 'Restaurante Sabor do Mar',
      email: 'contato@sabordomar.com',
      categoria: 'Restaurante',
      status: 'Aprovado',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '2',
      nome: 'Padaria Delícia',
      email: 'padaria@delicia.com',
      categoria: 'Alimentação',
      status: 'Aprovado',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '3',
      nome: 'Mercado Central',
      email: 'contato@mercadocentral.com',
      categoria: 'Mercado',
      status: 'Aprovado',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: '4',
      nome: 'Farmácia Bem Estar',
      email: 'contato@bemestar.com',
      categoria: 'Saúde',
      status: 'Pendente',
      statusClass: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: '5',
      nome: 'Loja de Roupas Fashion',
      email: 'fashion@lojaroupas.com',
      categoria: 'Vestuário',
      status: 'Pendente',
      statusClass: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: '6',
      nome: 'Restaurante Novo Sabor',
      email: 'contato@novosabor.com',
      categoria: 'Restaurante',
      status: 'Pendente',
      statusClass: 'bg-yellow-100 text-yellow-800'
    }
  ]);

  const aprovarLojista = (id: string) => {
    setLojistas(lojistas.map(lojista => 
      lojista.id === id 
        ? { ...lojista, status: 'Aprovado', statusClass: 'bg-green-100 text-green-800' } 
        : lojista
    ));
  };

  const recusarLojista = (id: string) => {
    setLojistas(lojistas.map(lojista => 
      lojista.id === id 
        ? { ...lojista, status: 'Recusado', statusClass: 'bg-red-100 text-red-800' } 
        : lojista
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Gestão de Lojistas</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lojistas Aguardando Aprovação</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lojista</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lojistas.filter(lojista => lojista.status === 'Pendente').map((lojista) => (
                <TableRow key={lojista.id}>
                  <TableCell className="font-medium">{lojista.nome}</TableCell>
                  <TableCell>{lojista.email}</TableCell>
                  <TableCell>{lojista.categoria}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${lojista.statusClass}`}>
                      {lojista.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => aprovarLojista(lojista.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => recusarLojista(lojista.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Recusar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Todos os Lojistas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lojista</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lojistas.map((lojista) => (
                <TableRow key={lojista.id}>
                  <TableCell className="font-medium">{lojista.nome}</TableCell>
                  <TableCell>{lojista.email}</TableCell>
                  <TableCell>{lojista.categoria}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${lojista.statusClass}`}>
                      {lojista.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
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

export default LojistasPage;
