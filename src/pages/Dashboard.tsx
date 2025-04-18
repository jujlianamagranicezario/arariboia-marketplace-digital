
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, Store, ShoppingBag, TrendingUp } from "lucide-react";

const Dashboard = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-arariboia-brown mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
