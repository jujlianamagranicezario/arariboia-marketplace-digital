
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, Store, ShoppingBag, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState("7d");
  
  const stats = [
    {
      title: "Vendas Totais",
      value: "R$ 45.231,89",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      title: "Clientes Ativos",
      value: "2,345",
      change: "+5.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Lojas Parceiras",
      value: "126",
      change: "+3.1%",
      trend: "up",
      icon: Store,
    },
    {
      title: "Taxa de Crescimento",
      value: "15.2%",
      change: "-2.3%",
      trend: "down",
      icon: TrendingUp,
    },
  ];

  // Dados de exemplo para os gráficos
  const salesData = [
    { name: 'Jan', vendas: 4000 },
    { name: 'Fev', vendas: 3000 },
    { name: 'Mar', vendas: 5000 },
    { name: 'Abr', vendas: 2780 },
    { name: 'Mai', vendas: 1890 },
    { name: 'Jun', vendas: 2390 },
    { name: 'Jul', vendas: 3490 },
  ];

  const categoryData = [
    { name: 'Comida', valor: 4000 },
    { name: 'Bebidas', valor: 3000 },
    { name: 'Eletrônicos', valor: 2000 },
    { name: 'Roupas', valor: 2780 },
    { name: 'Serviços', valor: 1890 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-arariboia-brown">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant={dateFilter === "7d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setDateFilter("7d")}
            className={dateFilter === "7d" ? "bg-arariboia-brown hover:bg-arariboia-brown/90" : ""}
          >
            7 dias
          </Button>
          <Button 
            variant={dateFilter === "30d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setDateFilter("30d")}
            className={dateFilter === "30d" ? "bg-arariboia-brown hover:bg-arariboia-brown/90" : ""}
          >
            30 dias
          </Button>
          <Button 
            variant={dateFilter === "90d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setDateFilter("90d")}
            className={dateFilter === "90d" ? "bg-arariboia-brown hover:bg-arariboia-brown/90" : ""}
          >
            90 dias
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Personalizado
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-sm ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="visaoGeral" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="visaoGeral">Visão Geral</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visaoGeral">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    vendas: { label: "Vendas" },
                  }}
                >
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#338a4f" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#338a4f" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="vendas" 
                      stroke="#338a4f" 
                      fillOpacity={1} 
                      fill="url(#colorUv)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendas">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    vendas: { label: "Vendas" },
                  }}
                >
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#432c22" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#432c22" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="vendas" 
                      stroke="#432c22" 
                      fillOpacity={1} 
                      fill="url(#colorUv2)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    valor: { label: "Valor" },
                  }}
                >
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="valor" fill="#338a4f" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">ID</th>
                    <th className="text-left py-3 font-medium">Cliente</th>
                    <th className="text-left py-3 font-medium">Valor</th>
                    <th className="text-left py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-3">#00{i}234</td>
                      <td className="py-3">Cliente {i}</td>
                      <td className="py-3">R$ {(Math.random() * 1000).toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          i % 3 === 0 ? "bg-yellow-100 text-yellow-800" : 
                          i % 3 === 1 ? "bg-green-100 text-green-800" : 
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {i % 3 === 0 ? "Pendente" : 
                           i % 3 === 1 ? "Entregue" : 
                           "Em preparo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">Ver todos os pedidos</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Produto</th>
                    <th className="text-left py-3 font-medium">Categoria</th>
                    <th className="text-left py-3 font-medium">Vendas</th>
                    <th className="text-left py-3 font-medium">Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-3">Produto {i}</td>
                      <td className="py-3">{["Comida", "Bebidas", "Eletrônicos", "Roupas", "Serviços"][i-1]}</td>
                      <td className="py-3">{Math.floor(Math.random() * 1000)}</td>
                      <td className="py-3">R$ {(Math.random() * 10000).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">Ver todos os produtos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
